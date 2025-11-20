// Example: Basic usage of Monday.com SDK

import { MondaySDK } from "../src";

async function basicExample() {
  // Create SDK instance with personal token
  const monday = MondaySDK.createWithToken({
    token: process.env.MONDAY_API_TOKEN || "your-api-token",
  });

  try {
    // Query boards
    console.log("Querying boards...");
    const boards = await monday.boards.query({
      limit: 5,
    });
    console.log(`Found ${boards.length} boards:`);
    boards.forEach((board) => {
      console.log(`  - ${board.name} (ID: ${board.id})`);
    });

    // Create a new item
    if (boards.length > 0) {
      const boardId = Number.parseInt(boards[0].id);
      console.log(`\nCreating a new item on board ${boards[0].name}...`);

      const newItem = await monday.items.create({
        board_id: boardId,
        item_name: "Test Item from SDK",
        column_values: {
          status: "Working on it",
        },
      });
      console.log(`Created item: ${newItem.name} (ID: ${newItem.id})`);

      // Query the item we just created
      console.log("\nQuerying the newly created item...");
      const items = await monday.items.query({
        ids: [Number.parseInt(newItem.id)],
      });
      console.log(`Found item: ${items[0].name}`);

      // Create an update on the item
      console.log("\nAdding an update to the item...");
      const update = await monday.updates.create({
        item_id: Number.parseInt(newItem.id),
        body: "This is a test update from the Monday.com SDK!",
      });
      console.log(`Created update: ${update.body}`);
    }

    // Query users
    console.log("\nQuerying users...");
    const users = await monday.users.query({
      limit: 3,
    });
    console.log(`Found ${users.length} users:`);
    users.forEach((user) => {
      console.log(`  - ${user.name} (${user.email})`);
    });

    // Query workspaces
    console.log("\nQuerying workspaces...");
    const workspaces = await monday.workspaces.query({
      limit: 3,
    });
    console.log(`Found ${workspaces.length} workspaces:`);
    workspaces.forEach((workspace) => {
      console.log(`  - ${workspace.name} (ID: ${workspace.id})`);
    });

    // Raw GraphQL query example
    console.log("\nExecuting raw GraphQL query...");
    const customResult = await monday.query<{ me: { name: string; email: string } }>(`
      query {
        me {
          name
          email
        }
      }
    `);
    console.log(`Current user: ${customResult.me.name} (${customResult.me.email})`);

  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the example if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  basicExample();
}

export { basicExample };
