import { Customer } from './types';
import * as fs from 'fs';
import * as path from 'path';

export class StorageService {
  private readonly dataFile = 'customers.json';
  private customers: Map<string, Customer> = new Map();

  constructor() {
    this.loadData();
  }

  /**
   * Get a customer by ID
   */
  public getCustomer(customerId: string): Customer | undefined {
    return this.customers.get(customerId);
  }

  /**
   * Save a customer
   */
  public saveCustomer(customer: Customer): void {
    this.customers.set(customer.id, customer);
    this.saveData();
  }

  /**
   * Get all customers
   */
  public getAllCustomers(): Customer[] {
    return Array.from(this.customers.values());
  }

  /**
   * Load data from file
   */
  private loadData(): void {
    try {
      if (fs.existsSync(this.dataFile)) {
        const data = fs.readFileSync(this.dataFile, 'utf8');
        const customersArray: Customer[] = JSON.parse(data);
        this.customers = new Map(customersArray.map(c => [c.id, c]));
      }
    } catch (error) {
      console.warn('Warning: Could not load existing data, starting with empty storage');
      this.customers = new Map();
    }
  }

  /**
   * Save data to file
   */
  private saveData(): void {
    try {
      const customersArray = Array.from(this.customers.values());
      fs.writeFileSync(this.dataFile, JSON.stringify(customersArray, null, 2));
    } catch (error) {
      console.error('Error: Could not save data to file:', error);
    }
  }
} 