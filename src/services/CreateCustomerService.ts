import prismaClient from "../prisma";

export interface CreateCustomerParams {
  name: string;
  email: string;
}

export default class CreateCustomerService {
  async handle({ name, email }: CreateCustomerParams) {
    if (!name || !email) {
      throw new Error("Campos obrigatorios");
    }

    const customer = await prismaClient.customer.create({
      data: {
        name,
        email,
        status: true,
      },
    });
    return customer;
  }
}
