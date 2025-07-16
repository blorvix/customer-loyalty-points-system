export interface Customer {
  id: string;
  points: number;
}

export type CommandType = 'earn' | 'redeem';

export interface Command {
  type: CommandType;
  customerId: string;
  points: number;
}

export interface CommandResult {
  success: boolean;
  message: string;
  customer?: Customer;
} 