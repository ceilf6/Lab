// 3. 接口适配层

import { Order, type OrderItem } from "../1-domain/Order";
import type { OrderRepository } from "./ports/OrderRepository";

export interface CreateOrderCommand {
  customerId: string;
  items: OrderItem[];
}

export interface CreateOrderResult {
  orderId: string;
  totalAmount: number;
}

export class CreateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) { }

  async execute(command: CreateOrderCommand): Promise<CreateOrderResult> {
    const order = new Order(this.generateOrderId(), command.customerId, command.items);

    await this.orderRepository.save(order);

    return {
      orderId: order.id,
      totalAmount: order.totalAmount,
    };
  }

  private generateOrderId(): string {
    return `order_${Date.now()}`;
  }
}
