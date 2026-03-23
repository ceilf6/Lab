// 外层装配检测

import { CreateOrderUseCase } from "./2-application/CreateOrderUseCase";
import { InMemoryOrderRepository } from "./4-infrastructure/InMemoryOrderRepository";
import { CreateOrderController } from "./3-interface-adapters/CreateOrderController";

async function main(): Promise<void> {
  const orderRepository = new InMemoryOrderRepository();
  const createOrderUseCase = new CreateOrderUseCase(orderRepository);
  const createOrderController = new CreateOrderController(createOrderUseCase);

  const response = await createOrderController.handle({
    body: {
      customerId: "user_001",
      items: [
        { sku: "clean-architecture-book", quantity: 1, price: 99 },
        { sku: "typescript-course", quantity: 2, price: 199 },
      ],
    },
  });

  console.log("HTTP Response:", response);

  if ("orderId" in response.body) {
    const savedOrder = await orderRepository.findById(response.body.orderId);
    console.log("Saved Order:", savedOrder);
  }
}

void main();
