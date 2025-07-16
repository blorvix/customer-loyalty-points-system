import { Command, CommandType } from './types';

export class CommandParser {
  /**
   * Parse command line arguments into a Command object
   */
  public static parse(args: string[]): Command | null {
    if (args.length < 3) {
      return null;
    }

    const [commandType, customerId, pointsStr] = args;

    // Validate command type
    if (!this.isValidCommandType(commandType)) {
      return null;
    }

    // Validate customer ID
    if (!customerId || customerId.trim() === '') {
      return null;
    }

    // Validate points
    const points = parseInt(pointsStr, 10);
    if (isNaN(points)) {
      return null;
    }

    return {
      type: commandType as CommandType,
      customerId: customerId.trim(),
      points
    };
  }

  /**
   * Check if the command type is valid
   */
  private static isValidCommandType(commandType: string): boolean {
    return commandType === 'earn' || commandType === 'redeem';
  }

  /**
   * Get usage instructions
   */
  public static getUsage(): string {
    return `
Customer Loyalty Points System

Usage:
  node index.js earn <customerId> <points>    - Add points to customer balance
  node index.js redeem <customerId> <points>  - Redeem points from customer balance

Examples:
  node index.js earn "user123" 100
  node index.js redeem "user123" 50

Notes:
  - Customer IDs are case-sensitive strings
  - Points must be positive integers
  - Customers cannot redeem more points than they have
  - A warning is shown when balance drops below 10 points
`;
  }
} 