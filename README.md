# Customer Loyalty Points System

A command-line application built in TypeScript to manage customer loyalty points with support for earning and redeeming points.

## Features

- **Earn Points**: Add points to a customer's balance
- **Redeem Points**: Redeem points from a customer's balance
- **Business Rules**: 
  - Customers cannot redeem more points than they have
  - Low balance warnings when balance drops below 10 points
- **In-Memory Storage**: Data persists for the duration of the application runtime
- **Input Validation**: Comprehensive validation of command-line arguments

## Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Building the Application

```bash
npm run build
```

### Running the Application

The application supports two main commands:

#### Earn Points
```bash
node dist/index.js earn <customerId> <points>
```

#### Redeem Points
```bash
node dist/index.js redeem <customerId> <points>
```

### Examples

```bash
# Earn 100 points for customer "user123"
node dist/index.js earn "user123" 100

# Redeem 50 points from customer "user123"
node dist/index.js redeem "user123" 50

# Try to redeem more points than available (will fail)
node dist/index.js redeem "user123" 200

# Redeem points that will drop balance below 10 (will show warning)
node dist/index.js redeem "user123" 95
```

### Development Mode

For development, you can use ts-node to run the TypeScript code directly:

```bash
npm run dev earn "user123" 100
```

## Business Rules

1. **Customer Identification**: Customers are identified by string IDs (case-sensitive)
2. **Point Validation**: Points must be positive integers
3. **Insufficient Balance**: Customers cannot redeem more points than they have
4. **Low Balance Warning**: A warning is displayed when balance drops below 10 points
5. **Data Persistence**: Data is stored in-memory and persists only during application runtime

## Project Structure

```
src/
├── index.ts           # Main application entry point
├── types.ts           # TypeScript type definitions
├── loyaltyService.ts  # Core business logic for loyalty operations
└── commandParser.ts   # Command-line argument parsing and validation
```

## Error Handling

The application provides clear error messages for:
- Invalid command format
- Invalid point values (non-positive numbers)
- Insufficient balance for redemption
- Missing or invalid customer IDs

## Testing

To run tests (when implemented):
```bash
npm test
```

## Technical Details

- **Language**: TypeScript
- **Runtime**: Node.js
- **Module System**: CommonJS
- **Storage**: In-memory Map data structure
- **Error Handling**: Comprehensive validation and error reporting 