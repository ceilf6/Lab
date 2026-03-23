// 1. 核心业务规则

export interface OrderItem {
  sku: string;
  quantity: number;
  price: number;
}

export class Order {
  readonly totalAmount: number;

  constructor(
    public readonly id: string,
    public readonly customerId: string,
    public readonly items: OrderItem[],
  ) {
    if (!customerId.trim()) {
      throw new Error("customerId is required");
    }

    if (items.length === 0) {
      throw new Error("order must contain at least one item");
    }

    this.totalAmount = items.reduce((sum, item) => {
      if (item.quantity <= 0) {
        throw new Error("quantity must be greater than 0");
      }

      if (item.price < 0) {
        throw new Error("price cannot be negative");
      }

      return sum + item.quantity * item.price;
    }, 0);
  }
}
