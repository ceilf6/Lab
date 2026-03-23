// 4. 实现细节

import type { Order } from "../1-domain/Order";
import type { OrderRepository } from "../2-application/ports/OrderRepository";

export class InMemoryOrderRepository implements OrderRepository {
  private readonly orders = new Map<string, Order>();

  async save(order: Order): Promise<void> {
    this.orders.set(order.id, order);
  }

  async findById(id: string): Promise<Order | null> {
    return this.orders.get(id) ?? null;
  }
}
