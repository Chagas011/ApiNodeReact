import { FormEvent } from "react";

export interface FormProps {
  isUpdating: boolean;
  nameAtual: string | null;
  emailAtual: string | null;
  setNameValue: React.Dispatch<React.SetStateAction<string>>;
  setEmailValue: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: FormEvent) => void;
  handleUpdate: (e: FormEvent) => void;
}

export default function Form(props: FormProps) {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setNameValue(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setEmailValue(e.target.value);
  };

  return (
    <form
      className="flex flex-col my-6"
      onSubmit={props.isUpdating ? props.handleUpdate : props.handleSubmit}
    >
      <label className="font-medium text-white">Nome:</label>
      <input
        type="text"
        placeholder="Digite seu nome completo"
        value={props.nameAtual ? props.nameAtual : ""}
        onChange={handleNameChange}
        className="w-full mb-5 p-2 rounded"
      />
      <label className="font-medium text-white">Email:</label>
      <input
        type="email"
        placeholder="Digite seu Email"
        value={props.emailAtual ? props.emailAtual : ""}
        onChange={handleEmailChange}
        className="w-full mb-5 p-2 rounded"
      />

      {props.isUpdating ? (
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
