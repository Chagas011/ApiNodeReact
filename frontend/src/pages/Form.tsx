"use client";
import { useApi } from "../hooks/useApi";

export default function Form() {
  const {
    errors,
    handleSubmit,
    register,
    handleFormSubmit,
    isUpdating,
    handleUpdate,
  } = useApi();
  return (
    <form
      className="flex flex-col my-6"
      onSubmit={
        isUpdating ? handleSubmit(handleUpdate) : handleSubmit(handleFormSubmit)
      }
    >
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
