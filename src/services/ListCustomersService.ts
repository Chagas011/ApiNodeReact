import prismaClient from "../prisma";

export default class ListCustomerService {
  async handle() {
    const customers = await prismaClient.customer.findMany();

    return {
      customers,
    };
  }
}
