import { FastifyRequest, FastifyReply } from "fastify";

export interface IController {
  handle(request: FastifyRequest, reply: FastifyReply): Promise<void>;
}
