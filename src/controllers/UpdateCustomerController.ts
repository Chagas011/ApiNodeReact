import { FastifyRequest, FastifyReply } from "fastify";
import UpdateCustomerService from "../services/UpdateCustomerService";
import { IController } from "./protocolsController";

export default class UpdateCustomerController implements IController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const { name, email } = request.body as { name: string; email: string };

    const updateCustomerService = new UpdateCustomerService();
    const customer = await updateCustomerService.handle(id, { name, email });

    reply.send(customer);
  }
}
