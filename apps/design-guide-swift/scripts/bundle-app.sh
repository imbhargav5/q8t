#!/bin/bash
set -e

# Navigate to project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_DIR"

# Configuration
APP_NAME="Design Guide"
EXECUTABLE_NAME="DesignGuideMac"
BUNDLE_ID="com.chatsian.design-guide"
BUILD_CONFIG="${1:-release}"
SIGNING_IDENTITY="${SIGNING_IDENTITY:-28EC5B6C38C2746AC8A6C1A74EC1F223F1A5B5CB}"  # Certificate hash

echo "Building ${APP_NAME} (${BUILD_CONFIG})..."

# Build the Swift package
swift build -c "$BUILD_CONFIG"

# Determine build directory
if [ "$BUILD_CONFIG" = "release" ]; then
    BUILD_DIR=".build/release"
else
    BUILD_DIR=".build/debug"
fi

# Create .app bundle structure
APP_DIR="${BUILD_DIR}/${APP_NAME}.app"
echo "Creating app bundle at: ${APP_DIR}"

rm -rf "$APP_DIR"
mkdir -p "${APP_DIR}/Contents/MacOS"
mkdir -p "${APP_DIR}/Contents/Resources"

# Copy executable
cp "${BUILD_DIR}/${EXECUTABLE_NAME}" "${APP_DIR}/Contents/MacOS/"

# Copy Info.plist
cp "macOS/DesignGuideMac/Info.plist" "${APP_DIR}/Contents/"

# Create PkgInfo file
echo -n "APPL????" > "${APP_DIR}/Contents/PkgInfo"

# Code sign - use self-signed certificate if available, otherwise ad-hoc
echo "Code signing app bundle..."
if security find-identity -v -p codesigning | grep -q "$SIGNING_IDENTITY"; then
    echo "Using certificate: $SIGNING_IDENTITY"
    codesign --force --deep --sign "$SIGNING_IDENTITY" "$APP_DIR"
else
    echo "Certificate '$SIGNING_IDENTITY' not found, using ad-hoc signing"
    echo "To create a certificate: Keychain Access → Certificate Assistant → Create a Certificate"
    echo "  Name: $SIGNING_IDENTITY"
    echo "  Type: Self Signed Root, Code Signing"
    codesign --force --deep --sign - "$APP_DIR"
fi

echo ""
echo "Build complete!"
echo "App bundle: ${APP_DIR}"
echo ""
echo "To run the app:"
echo "  open \"${APP_DIR}\""
