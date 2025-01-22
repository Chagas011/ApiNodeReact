import Customer from "./data/model/Customer";
import Content from "./pages/Content";
import Form from "./pages/Form";
import { api } from "./services/api";
import { FormEvent, useEffect, useState } from "react";

function App() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [idValue, setIdValue] = useState<string>("");
  const [nameValue, setNameValue] = useState<string>("");
  const [emailValue, setEmailValue] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState(false);
  console.log(nameValue);
  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    const response = await api.get("/customers");
    setCustomers(response.data.customers);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!nameValue || !emailValue) return;
    const response = await api.post("/customer", {
      name: nameValue,
      email: emailValue,
    });
    setCustomers((allCustomers) => [...allCustomers, response.data]);
    setNameValue("");
    setEmailValue("");
  }

  async function handleUpdate() {
    if (!idValue || !nameValue || !emailValue) return;
    try {
      const response = await api.patch(`/customer/${idValue}`, {
        name: nameValue,
        email: emailValue,
      });

      if (response.status === 200) {
        console.log("Cliente atualizado com sucesso:", response.data);
        setCustomers((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer.id === idValue
              ? { ...customer, name: nameValue, email: emailValue }
              : customer
          )
        );
      } else {
        console.error("Erro ao atualizar cliente", response);
      }
    } catch (error) {
      console.error("Erro ao enviar a requisição:", error);
    }
  }

  async function handleDelete(id: string) {
    try {
      await api.delete(`/customer/${id}`);

      alert(`Usuario ${id} Deletado`);
      const allCustomers = customers.filter((customer) => customer.id !== id);
      setCustomers(allCustomers);
    } catch (e) {
      console.log(e);
    }
  }

  function handleSelect(EditCustomer: Customer) {
    setNameValue(EditCustomer.name);
    setEmailValue(EditCustomer.email);
    setIdValue(EditCustomer.id);
    setIsUpdating(true);
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl font-medium text-white">
          Cadastro de Clientes
        </h1>
        <Form
          isUpdating={isUpdating}
          handleUpdate={handleUpdate}
          nameAtual={nameValue}
          emailAtual={emailValue}
          setNameValue={setNameValue}
          setEmailValue={setEmailValue}
          handleSubmit={handleSubmit}
        />
        <Content
          customers={customers}
          handleDelete={handleDelete}
          handleSelect={handleSelect}
        />
      </main>
    </div>
  );
}

export default App;
