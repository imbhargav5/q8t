// Example: OAuth 2.0 authentication flow

import { generateAuthUrl, exchangeCodeForToken, MondaySDK } from "../src";

async function oauthExample() {
  // Step 1: Generate authorization URL
  console.log("Step 1: Generate OAuth authorization URL");
  const { url, state } = generateAuthUrl({
    clientId: process.env.MONDAY_CLIENT_ID || "your-client-id",
    redirectUri: "https://your-app.com/callback",
    scopes: ["boards:read", "boards:write", "users:read"],
  });

  console.log(`Authorization URL: ${url}`);
  console.log(`State (save this for validation): ${state}`);
  console.log("\nDirect user to this URL to authorize your app.");
  console.log("After authorization, Monday.com will redirect to your callback URL with a code.");

  // Step 2: Exchange authorization code for access token
  // (This would happen in your callback handler)
  async function handleCallback(code: string, receivedState: string) {
    // Validate state to prevent CSRF attacks
    if (receivedState !== state) {
      throw new Error("State mismatch - possible CSRF attack");
    }

    console.log("\nStep 2: Exchange authorization code for access token");
    const tokens = await exchangeCodeForToken({
      clientId: process.env.MONDAY_CLIENT_ID || "your-client-id",
      clientSecret: process.env.MONDAY_CLIENT_SECRET || "your-client-secret",
      code,
      redirectUri: "https://your-app.com/callback",
    });

    console.log("Access token received!");
    console.log(`Token type: ${tokens.token_type}`);
    console.log(`Scope: ${tokens.scope}`);

    // Step 3: Use the access token to create SDK instance
    console.log("\nStep 3: Create SDK instance with OAuth token");
    const monday = MondaySDK.createWithOAuth({
      accessToken: tokens.access_token,
      onTokenRefresh: (newToken) => {
        console.log("Token refreshed:", newToken);
        // Save the new token to your database
      },
    });

    // Now you can use the SDK
    console.log("\nStep 4: Use the SDK to query boards");
    const boards = await monday.boards.query({ limit: 5 });
    console.log(`Found ${boards.length} boards`);
    boards.forEach((board) => {
      console.log(`  - ${board.name}`);
    });

    return monday;
  }

  // Example callback handler
  // In a real app, this would be called by your web server when Monday.com redirects back
  // handleCallback('authorization-code-from-monday', state);
}

// Run the example if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  oauthExample();
}

export { oauthExample };
