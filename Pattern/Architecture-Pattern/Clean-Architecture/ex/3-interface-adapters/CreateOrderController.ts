// 2. 业务逻辑

import type {
  CreateOrderCommand,
  CreateOrderResult,
  CreateOrderUseCase,
} from "../2-application/CreateOrderUseCase";

export interface CreateOrderHttpRequest {
  body: CreateOrderCommand;
}

export interface CreateOrderHttpResponse {
  statusCode: number;
  body: CreateOrderResult | { message: string };
}

export class CreateOrderController {
  constructor(private readonly useCase: CreateOrderUseCase) { }

  async handle(request: CreateOrderHttpRequest): Promise<CreateOrderHttpResponse> {
    try {
      const result = await this.useCase.execute(request.body);
      return {
        statusCode: 201,
        body: result,
      };
    } catch (error) {
      return {
        statusCode: 400,
        body: {
          message: error instanceof Error ? error.message : "unknown error",
        },
      };
    }
  }
}
