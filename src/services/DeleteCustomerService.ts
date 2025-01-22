import prismaClient from "../prisma";

export default class DeleteCustomerService {
  async handle(id: string) {
    if (!id) {
      throw new Error("Id Ivalido");
    }
    const findCustomer = await prismaClient.customer.findFirst({
      where: {
        id: id,
      },
    });

    if (!findCustomer) {
      throw new Error("Id não encontrado");
    }

    await prismaClient.customer.delete({
      where: {
        id: findCustomer.id,
      },
    });
    return findCustomer;
  }
}
