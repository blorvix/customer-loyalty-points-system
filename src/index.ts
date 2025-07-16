#!/usr/bin/env node

import { LoyaltyService } from './loyaltyService';
import { CommandParser } from './commandParser';

/**
 * Main application entry point
 */
function main(): void {
  // Get command line arguments (skip first two: node path and script path)
  const args = process.argv.slice(2);

  // Parse the command
  const command = CommandParser.parse(args);

  if (!command) {
    console.error('Error: Invalid command format');
    console.log(CommandParser.getUsage());
    process.exit(1);
  }

  // Create loyalty service instance
  const loyaltyService = new LoyaltyService();

  try {
    // Process the command
    const result = loyaltyService.processCommand(command);

    // Output the result
    if (result.success) {
      console.log(result.message);
    } else {
      console.error(result.message);
      process.exit(1);
    }
  } catch (error) {
    console.error('Error: An unexpected error occurred:', error);
    process.exit(1);
  }
}

// Run the application if this file is executed directly
if (require.main === module) {
  main();
}

export { main }; 