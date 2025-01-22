import { FastifyRequest, FastifyReply } from "fastify";
import DeleteCustomerService from "../services/DeleteCustomerService";
import { IController } from "./protocolsController";

export default class DeleteCustomerController implements IController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    const deleteCustomerService = new DeleteCustomerService();
    const customerDelete = await deleteCustomerService.handle(id);

    reply.send(customerDelete);
  }
}
