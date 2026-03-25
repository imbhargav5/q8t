use aes_gcm::{
    aead::{Aead, KeyInit, OsRng},
    Aes256Gcm, Nonce,
};
use base64::{engine::general_purpose::STANDARD as BASE64, Engine};
use rand::RngCore;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum CryptoError {
    #[error("Encryption failed: {0}")]
    EncryptionFailed(String),

    #[error("Decryption failed: {0}")]
    DecryptionFailed(String),

    #[error("Invalid key: {0}")]
    InvalidKey(String),

    #[error("IO error: {0}")]
    Io(#[from] std::io::Error),
}

/// Manages encryption/decryption of credentials using AES-256-GCM.
///
/// The key is loaded from `~/.q8t/.keyfile`. If the file doesn't exist,
/// a new random key is generated and saved.
pub struct CredentialCipher {
    cipher: Aes256Gcm,
}

const NONCE_SIZE: usize = 12;

impl CredentialCipher {
    /// Create a cipher from a 32-byte key.
    pub fn from_key(key: &[u8; 32]) -> Self {
        let cipher = Aes256Gcm::new_from_slice(key).expect("32-byte key is always valid for AES-256");
        Self { cipher }
    }

    /// Load or create the encryption key from `~/.q8t/.keyfile`.
    pub fn load_or_create() -> Result<Self, CryptoError> {
        let q8t_dir = dirs_home().join(".q8t");
        let keyfile = q8t_dir.join(".keyfile");

        if keyfile.exists() {
            let encoded = std::fs::read_to_string(&keyfile)?;
            let key_bytes = BASE64
                .decode(encoded.trim())
                .map_err(|e| CryptoError::InvalidKey(e.to_string()))?;
            if key_bytes.len() != 32 {
                return Err(CryptoError::InvalidKey(format!(
                    "expected 32 bytes, got {}",
                    key_bytes.len()
                )));
            }
            let mut key = [0u8; 32];
            key.copy_from_slice(&key_bytes);
            Ok(Self::from_key(&key))
        } else {
            std::fs::create_dir_all(&q8t_dir)?;
            let mut key = [0u8; 32];
            OsRng.fill_bytes(&mut key);
            let encoded = BASE64.encode(key);
            std::fs::write(&keyfile, &encoded)?;
            // Restrict permissions on macOS/Linux
            #[cfg(unix)]
            {
                use std::os::unix::fs::PermissionsExt;
                std::fs::set_permissions(&keyfile, std::fs::Permissions::from_mode(0o600))?;
            }
            Ok(Self::from_key(&key))
        }
    }

    /// Encrypt plaintext bytes. Returns base64-encoded `nonce || ciphertext`.
    pub fn encrypt(&self, plaintext: &[u8]) -> Result<String, CryptoError> {
        let mut nonce_bytes = [0u8; NONCE_SIZE];
        OsRng.fill_bytes(&mut nonce_bytes);
        let nonce = Nonce::from_slice(&nonce_bytes);

        let ciphertext = self
            .cipher
            .encrypt(nonce, plaintext)
            .map_err(|e| CryptoError::EncryptionFailed(e.to_string()))?;

        let mut combined = Vec::with_capacity(NONCE_SIZE + ciphertext.len());
        combined.extend_from_slice(&nonce_bytes);
        combined.extend_from_slice(&ciphertext);

        Ok(BASE64.encode(&combined))
    }

    /// Decrypt a base64-encoded `nonce || ciphertext` string.
    pub fn decrypt(&self, encoded: &str) -> Result<Vec<u8>, CryptoError> {
        let combined = BASE64
            .decode(encoded.trim())
            .map_err(|e| CryptoError::DecryptionFailed(e.to_string()))?;

        if combined.len() < NONCE_SIZE {
            return Err(CryptoError::DecryptionFailed(
                "ciphertext too short".to_string(),
            ));
        }

        let (nonce_bytes, ciphertext) = combined.split_at(NONCE_SIZE);
        let nonce = Nonce::from_slice(nonce_bytes);

        self.cipher
            .decrypt(nonce, ciphertext)
            .map_err(|e| CryptoError::DecryptionFailed(e.to_string()))
    }

    /// Encrypt a string value.
    pub fn encrypt_string(&self, value: &str) -> Result<String, CryptoError> {
        self.encrypt(value.as_bytes())
    }

    /// Decrypt to a string value.
    pub fn decrypt_string(&self, encoded: &str) -> Result<String, CryptoError> {
        let bytes = self.decrypt(encoded)?;
        String::from_utf8(bytes).map_err(|e| CryptoError::DecryptionFailed(e.to_string()))
    }
}

fn dirs_home() -> std::path::PathBuf {
    dirs_home_inner()
}

fn dirs_home_inner() -> std::path::PathBuf {
    std::env::var("HOME")
        .map(std::path::PathBuf::from)
        .unwrap_or_else(|_| std::path::PathBuf::from("/tmp"))
}

/// Generate a random token string (for server.token).
pub fn generate_token() -> String {
    let mut bytes = [0u8; 32];
    OsRng.fill_bytes(&mut bytes);
    hex::encode(bytes)
}

// Re-export for convenience
mod hex {
    pub fn encode(bytes: [u8; 32]) -> String {
        bytes.iter().map(|b| format!("{:02x}", b)).collect()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_encrypt_decrypt_roundtrip() {
        let key = [42u8; 32];
        let cipher = CredentialCipher::from_key(&key);

        let plaintext = "my-secret-bearer-token-12345";
        let encrypted = cipher.encrypt_string(plaintext).unwrap();
        let decrypted = cipher.decrypt_string(&encrypted).unwrap();

        assert_eq!(plaintext, decrypted);
        assert_ne!(plaintext, encrypted);
    }

    #[test]
    fn test_different_encryptions_differ() {
        let key = [42u8; 32];
        let cipher = CredentialCipher::from_key(&key);

        let plaintext = "same-text";
        let enc1 = cipher.encrypt_string(plaintext).unwrap();
        let enc2 = cipher.encrypt_string(plaintext).unwrap();

        // Different nonces produce different ciphertexts
        assert_ne!(enc1, enc2);
        // Both decrypt to the same value
        assert_eq!(cipher.decrypt_string(&enc1).unwrap(), plaintext);
        assert_eq!(cipher.decrypt_string(&enc2).unwrap(), plaintext);
    }

    #[test]
    fn test_generate_token() {
        let token = generate_token();
        assert_eq!(token.len(), 64); // 32 bytes = 64 hex chars
    }
}
