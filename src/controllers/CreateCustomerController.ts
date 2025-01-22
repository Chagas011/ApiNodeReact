import { FastifyRequest, FastifyReply } from "fastify";
import CreateCustomerService from "../services/CreateCustomerService";
import { IController } from "./protocolsController";

export default class CreateCustomerController implements IController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, email } = request.body as { name: string; email: string };

    const customerService = new CreateCustomerService();
    const customer = await customerService.handle({ name, email });
    reply.send(customer);
  }
}
