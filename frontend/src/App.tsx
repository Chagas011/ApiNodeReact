"use client";
import Content from "./pages/Content";
import Form from "./pages/Form";

function App() {
  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl font-medium text-white">
          Cadastro de Clientes
        </h1>
        <Form />
        <Content />
      </main>
    </div>
  );
}

export default App;
