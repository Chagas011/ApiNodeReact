import { FiTrash, FiEdit } from "react-icons/fi";
import { useApi } from "../hooks/useApi";

export default function Content() {
  const { customers, handleDelete, handleSelect } = useApi();
  return (
    <section className="flex flex-col mt-24">
      <h1 className="text-4xl font-medium text-white">Clientes Cadastrados</h1>

      {customers.map((customer) => (
        <article
          className="w-full bg-white rounded p-2 mt-7 relative hover:scale-105 duration-200"
          key={customer.id}
        >
          <p>
            <span className="font-medium">Nome:</span> {customer.name}
          </p>
          <p>
            <span className="font-medium">Email:</span> {customer.email}
          </p>
          <p>
            <span className="font-medium">Status:</span>{" "}
            {customer.status ? "Ativo" : "Inativo"}
          </p>

          <div className="flex flex-col p-1 absolute right-0 top-0">
            <button
              className="mt-2 mb-3 hover:scale-125 duration-200"
              onClick={() => handleSelect(customer)}
            >
              <FiEdit className="text-blue-500 hover:text-blue-800" size={25} />
            </button>
            <button
              className="hover:scale-125 duration-200"
              onClick={() => handleDelete(customer.id)}
            >
              <FiTrash className="text-red-500 hover:text-red-800" size={25} />
            </button>
          </div>
        </article>
      ))}
    </section>
  );
}
