import { FastifyRequest, FastifyReply } from "fastify";
import ListCustomerService from "../services/ListCustomersService";
import { IController } from "./protocolsController";

export default class ListCustomerController implements IController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const listCustomerService = new ListCustomerService();
    const customers = await listCustomerService.handle();

    reply.send(customers);
  }
}
