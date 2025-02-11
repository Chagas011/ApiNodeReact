"use client";

import { useEffect } from "react";

import { useCustomerForm, useCustomerStore } from "../store/customers";

export default function Form() {
  const {
    state: { customerSelect, isUpdating },
    actions: { handleUpdate, handleFormSubmit },
  } = useCustomerStore();
  const { handleSubmit, register, errors, reset } = useCustomerForm();

  useEffect(() => {
    if (customerSelect && isUpdating) {
      reset({
        name: customerSelect.name,
        email: customerSelect.email,
        id: customerSelect.id,
      });
    }
  }, [customerSelect, isUpdating, reset]);
  return (
    <form
      className="flex flex-col my-6"
      onSubmit={
        isUpdating ? handleSubmit(handleUpdate) : handleSubmit(handleFormSubmit)
      }
    >
      <input type="hidden" {...register("id")} />
      <label className="font-medium text-white">Nome:</label>
      <input
        {...register("name")}
        type="text"
        placeholder="Digite seu nome completo"
        className="w-full mb-5 p-2 rounded"
      />

      {errors.name?.message && (
        <p className="text-red-500 mb-2">{errors.name.message}</p>
      )}
      <label className="font-medium text-white">Email:</label>
      <input
        {...register("email")}
        type="email"
        placeholder="Digite seu Email"
        className="w-full mb-5 p-2 rounded"
      />
      {errors.email?.message && (
        <p className="text-red-500 mb-2">{errors.email.message}</p>
      )}

      {isUpdating ? (
        <button
          type="submit"
          className="w-full mb-5 p-2 rounded text-white font-medium bg-blue-500 hover:bg-blue-700"
        >
          Atualizar
        </button>
      ) : (
        <button
          type="submit"
          className="w-full mb-5 p-2 rounded text-white font-medium bg-green-500 hover:bg-green-700"
        >
          Cadastrar
        </button>
      )}
    </form>
  );
}
