import { Customer, Command, CommandResult, CommandType } from './types';
import { StorageService } from './storage';

export class LoyaltyService {
  private storage: StorageService;

  constructor() {
    this.storage = new StorageService();
  }

  /**
   * Earn points for a customer
   */
  public earnPoints(customerId: string, points: number): CommandResult {
    if (points <= 0) {
      return {
        success: false,
        message: `Error: Points must be a positive number. Received: ${points}`
      };
    }

    const customer = this.getOrCreateCustomer(customerId);
    customer.points += points;
    this.storage.saveCustomer(customer);

    return {
      success: true,
      message: `Successfully earned ${points} points for customer ${customerId}. New balance: ${customer.points} points.`,
      customer: { ...customer }
    };
  }

  /**
   * Redeem points from a customer
   */
  public redeemPoints(customerId: string, points: number): CommandResult {
    if (points <= 0) {
      return {
        success: false,
        message: `Error: Points must be a positive number. Received: ${points}`
      };
    }

    const customer = this.getOrCreateCustomer(customerId);

    if (customer.points < points) {
      return {
        success: false,
        message: `Error: Customer ${customerId} has insufficient points. Balance: ${customer.points}, Requested: ${points}`
      };
    }

    customer.points -= points;
    this.storage.saveCustomer(customer);

    const result: CommandResult = {
      success: true,
      message: `Successfully redeemed ${points} points for customer ${customerId}. New balance: ${customer.points} points.`,
      customer: { ...customer }
    };

    // Check for low balance warning
    if (customer.points < 10) {
      result.message += `\nWarning: Customer ${customerId} has a low balance: ${customer.points} points.`;
    }

    return result;
  }

  /**
   * Get customer balance
   */
  public getCustomerBalance(customerId: string): number {
    const customer = this.storage.getCustomer(customerId);
    return customer ? customer.points : 0;
  }

  /**
   * Get all customers (for debugging/testing)
   */
  public getAllCustomers(): Customer[] {
    return this.storage.getAllCustomers();
  }

  /**
   * Process a command (earn or redeem)
   */
  public processCommand(command: Command): CommandResult {
    switch (command.type) {
      case 'earn':
        return this.earnPoints(command.customerId, command.points);
      case 'redeem':
        return this.redeemPoints(command.customerId, command.points);
      default:
        return {
          success: false,
          message: `Error: Unknown command type: ${command.type}`
        };
    }
  }

  /**
   * Get or create a customer
   */
  private getOrCreateCustomer(customerId: string): Customer {
    let customer = this.storage.getCustomer(customerId);
    
    if (!customer) {
      customer = {
        id: customerId,
        points: 0
      };
      this.storage.saveCustomer(customer);
    }

    return customer;
  }
} 