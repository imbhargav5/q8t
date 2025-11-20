// Example: Advanced Monday.com SDK usage

import { MondaySDK } from "../src";

async function advancedExample() {
  const monday = MondaySDK.createWithToken({
    token: process.env.MONDAY_API_TOKEN || "your-api-token",
  });

  try {
    // Create a new board
    console.log("Creating a new board...");
    const newBoard = await monday.boards.create({
      board_name: "SDK Test Board",
      board_kind: "public",
    });
    console.log(`Created board: ${newBoard.name} (ID: ${newBoard.id})`);

    const boardId = Number.parseInt(newBoard.id);

    // Add a status column
    console.log("\nAdding a status column...");
    const statusColumn = await monday.columns.createStatus(boardId, "Status", {
      labels: {
        0: "Not Started",
        1: "In Progress",
        2: "Done",
      },
    });
    console.log(`Created status column: ${statusColumn.title}`);

    // Add a text column
    console.log("\nAdding a text column...");
    const textColumn = await monday.columns.create({
      board_id: boardId,
      title: "Description",
      column_type: "text",
    });
    console.log(`Created text column: ${textColumn.title}`);

    // Create multiple items
    console.log("\nCreating multiple items...");
    const items = [];
    for (let i = 1; i <= 3; i++) {
      const item = await monday.items.create({
        board_id: boardId,
        item_name: `Task ${i}`,
        column_values: {
          [statusColumn.id]: { label: "Not Started" },
          [textColumn.id]: `Description for task ${i}`,
        },
      });
      items.push(item);
      console.log(`  Created item: ${item.name}`);
    }

    // Update column values on first item
    console.log("\nUpdating column values on first item...");
    await monday.items.updateColumns({
      board_id: boardId,
      item_id: Number.parseInt(items[0].id),
      column_values: {
        [statusColumn.id]: { label: "In Progress" },
      },
    });
    console.log("  Updated status to 'In Progress'");

    // Add updates to items
    console.log("\nAdding updates to items...");
    for (const item of items) {
      await monday.updates.create({
        item_id: Number.parseInt(item.id),
        body: `Working on ${item.name}`,
      });
    }
    console.log("  Added updates to all items");

    // Duplicate an item
    console.log("\nDuplicating first item...");
    const duplicatedItem = await monday.items.duplicate(
      boardId,
      Number.parseInt(items[0].id),
      true
    );
    console.log(`  Duplicated item: ${duplicatedItem.name}`);

    // Query items with filters
    console.log("\nQuerying all items on the board...");
    const allItems = await monday.items.query({
      limit: 100,
    });
    console.log(`  Found ${allItems.length} items across all boards`);

    // Create a webhook
    console.log("\nCreating a webhook...");
    const webhook = await monday.webhooks.create({
      board_id: boardId,
      url: "https://your-app.com/webhook",
      event: "create_item",
    });
    console.log(`  Created webhook: ${webhook.id}`);

    // List all webhooks
    console.log("\nListing webhooks...");
    const webhooks = await monday.webhooks.query({
      board_id: boardId,
    });
    console.log(`  Found ${webhooks.length} webhooks on this board`);

    // Archive the board
    console.log("\nArchiving the test board...");
    await monday.boards.archive(boardId);
    console.log("  Board archived successfully");

    // Complex GraphQL query example
    console.log("\nExecuting complex GraphQL query...");
    const complexResult = await monday.query(`
      query {
        boards(limit: 1) {
          id
          name
          columns {
            id
            title
            type
          }
          groups {
            id
            title
          }
          items_page(limit: 5) {
            cursor
            items {
              id
              name
              column_values {
                id
                text
              }
            }
          }
        }
      }
    `);
    console.log("  Complex query executed successfully");

  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the example if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  advancedExample();
}

export { advancedExample };
