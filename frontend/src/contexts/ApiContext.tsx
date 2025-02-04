import { createContext, useEffect, useState } from "react";
import Customer from "../data/model/Customer";
import { FormProps } from "../data/types/types";
import {
  FieldErrors,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaForm } from "../data/schema/schemaForm";
import { api } from "../services/api";

type ApiContextType = {
  customers: Customer[];
  isUpdating: boolean;
  customerSelect: Customer | null;
  handleSubmit: UseFormHandleSubmit<FormProps>;
  register: UseFormRegister<FormProps>;
  errors: FieldErrors<FormProps>;
  reset: UseFormReset<FormProps>;
  handleUpdate: (data: FormProps) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  handleSelect: (EditCustomer: Customer) => void;
  handleFormSubmit: (data: FormProps) => Promise<void>;
};

const ApiContexts = createContext<ApiContextType>({} as ApiContextType);

const ApiProvider = ({ children }: { children: React.ReactNode }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [customerSelect, setCustomerSelect] = useState<Customer | null>(null);

  const {
    handleSubmit,
    register,
    reset,

    formState: { errors },
  } = useForm<FormProps>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(schemaForm),
    defaultValues: {
      id: "",
      name: "",
      email: "",
    },
  });
  const handleFetchCustomer = async () => {
    const response = await api.get("/customers");
    setCustomers(response.data.customers);
  };
  const handleUpdate = async (data: FormProps) => {
    if (!data.id || !data.name || !data.email) return;
    try {
      const response = await api.patch(`/customer/${data.id}`, {
        name: data.name,
        email: data.email,
      });

      if (response.status === 200) {
        console.log("Cliente atualizado com sucesso:", response.data);
        setCustomers((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer.id === data.id
              ? { ...customer, name: data.name, email: data.email }
              : customer
          )
        );
        reset({
          name: "",
          email: "",
          id: "",
        });
        setIsUpdating(false);
        setCustomerSelect(null);
      } else {
        console.error("Erro ao atualizar cliente", response);
      }
    } catch (error) {
      console.error("Erro ao enviar a requisição:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/customer/${id}`);

      alert(`Usuario ${id} Deletado`);
      const allCustomers = customers.filter((customer) => customer.id !== id);
      setCustomers(allCustomers);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSelect = (EditCustomer: Customer) => {
    console.log("Cliente selecionado para edição:", EditCustomer);
    setIsUpdating(true);
    setCustomerSelect(EditCustomer);
  };

  const handleFormSubmit = async (data: FormProps) => {
    try {
      await api.post("/customer", {
        name: data.name,
        email: data.email,
      });

      await handleFetchCustomer();

      // Limpa o formulário
      reset({
        name: "",
        email: "",
        id: "",
      });
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
    }
  };

  useEffect(() => {
    handleFetchCustomer();
  }, []);

  return (
    <ApiContexts.Provider
      value={{
        customers,
        isUpdating,
        customerSelect,
        handleSubmit,
        register,

        errors,
        reset,
        handleUpdate,
        handleDelete,
        handleSelect,
        handleFormSubmit,
      }}
    >
      {children}
    </ApiContexts.Provider>
  );
};

export { ApiContexts, ApiProvider };
