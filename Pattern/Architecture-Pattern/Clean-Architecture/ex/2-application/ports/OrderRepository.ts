// 2. 业务逻辑

import { Order } from "../../1-domain/Order";

export interface OrderRepository {
  save(order: Order): Promise<void>;
  findById(id: string): Promise<Order | null>;
}
