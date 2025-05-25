export class Transaction {
    constructor(
      public readonly id: string,
      public readonly amount: number,
      public readonly timestamp: Date,
    ) {}
  }
  