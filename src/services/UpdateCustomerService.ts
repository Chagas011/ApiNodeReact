import prismaClient from "../prisma";

export interface UpdateCustomerParams {
  name: string;
  email: string;
}

export default class UpdateCustomerService {
  async handle(id: string, { name, email }: UpdateCustomerParams) {
    if (!id) {
      throw new Error("ID não informado");
    }

    const findCustomer = await prismaClient.customer.findFirst({
      where: {
        id: id,
      },
    });

    if (!findCustomer) {
      throw new Error("Usuario invalido");
    }

    const updateCustomer = await prismaClient.customer.update({
      where: {
        id: findCustomer.id,
      },
      data: {
        name: name,
        email: email,
      },
    });

    return updateCustomer;
  }
}
