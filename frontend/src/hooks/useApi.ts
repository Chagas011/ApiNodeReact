"use client";
import { useForm } from "react-hook-form";
import { FormProps } from "../data/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaForm } from "../data/schema/schemaForm";
import { useEffect, useState } from "react";
import { api } from "../services/api";

import Customer from "../data/model/Customer";

export const useApi = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormProps>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(schemaForm),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const handleFetchCustomer = async () => {
    const response = await api.get("/customers");
    setCustomers(response.data.customers);
  };

  async function handleUpdate(data: FormProps) {
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

  const handleSelect = (EditCustomer: Customer) => {
    setValue("name", EditCustomer.name);
    setValue("email", EditCustomer.email);
    console.log(EditCustomer.id);
    setIsUpdating(true);
  };

  const handleFormSubmit = async (data: FormProps) => {
    if (!data.name || !data.email) return;
    const response = await api.post("/customer", {
      name: data.name,
      email: data.email,
    });
    setValue("name", "");
    setValue("email", "");
    setCustomers((allCustomers) => [...allCustomers, response.data.customers]);
  };

  useEffect(() => {
    handleFetchCustomer();
  }, []);

  return {
    handleSubmit,
    register,
    errors,
    handleFormSubmit,
    customers,
    handleSelect,
    handleDelete,
    handleUpdate,
    isUpdating,
  };
};
