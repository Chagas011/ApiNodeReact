import { create } from "zustand";
import Customer from "../../data/model/Customer";
import { api } from "../../services/api";
import { FormProps } from "../../data/types/types";
import { toast } from "react-toastify";
import { useForm, UseFormReset } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaForm } from "../../data/schema/schemaForm";
import { useEffect } from "react";

type CustomerStore = {
  state: {
    customers: Customer[];
    isUpdating: boolean;
    customerSelect: Customer | null;
  };
  actions: {
    handleFetchCustomer: () => Promise<void>;
    handleUpdate: (data: FormProps) => Promise<void>;
    handleDelete: (id: string) => Promise<void>;
    handleSelect: (EditCustomer: Customer) => void;
    handleFormSubmit: (data: FormProps) => Promise<void>;
    handleDeleteConfirm: (id: string) => void;
  };
};

type FormStore = {
  reset: () => void;
  setReset: (resetFn: UseFormReset<FormProps>) => void;
};
const useFormStore = create<FormStore>((set) => ({
  reset: () => {},
  setReset: (resetFn) =>
    set({ reset: () => resetFn({ name: "", email: "", id: "" }) }),
}));

export const useCustomerStore = create<CustomerStore>()((set) => {
  return {
    state: {
      customers: [],
      isUpdating: false,
      customerSelect: null,
    },
    actions: {
      handleFetchCustomer: async () => {
        const res = await api.get("/customers");
        set((state) => ({
          state: { ...state.state, customers: res.data.customers },
        }));
      },

      handleFormSubmit: async (data: FormProps) => {
        try {
          await api.post("/customer", {
            name: data.name,
            email: data.email,
          });
          await useCustomerStore.getState().actions.handleFetchCustomer();
          useFormStore.getState().reset();
          toast.success("Cliente cadastrado com sucesso");
        } catch (error) {
          console.log(error);
        }
      },
      handleUpdate: async (data: FormProps) => {
        if (!data.id || !data.name || !data.email) return;
        try {
          const response = await api.patch(`/customer/${data.id}`, {
            name: data.name,
            email: data.email,
          });
          if (response.status === 200) {
            set((state) => ({
              state: {
                ...state.state,
                customers: state.state.customers.map((customer) =>
                  customer.id === data.id
                    ? { ...customer, name: data.name, email: data.email }
                    : customer
                ),
              },
            }));
          }
          useFormStore.getState().reset();
          useCustomerStore.getState().state.customerSelect = null;
          useCustomerStore.getState().state.isUpdating = false;
          toast.success("Cliente atualizado com sucesso");
        } catch (error) {
          console.log(error);
        }
      },
      handleDeleteConfirm: (id: string) => {
        toast.warn(
          <div>
            <p>Tem certeza que deseja deletar?</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => {
                  useCustomerStore.getState().actions.handleDelete(id);
                  toast.dismiss();
                }}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Sim
              </button>
              <button
                onClick={() => toast.dismiss()}
                className="bg-gray-500 text-white px-2 py-1 rounded"
              >
                Não
              </button>
            </div>
          </div>,
          {
            position: "top-center",
            autoClose: false,
            closeOnClick: false,
            draggable: false,
            closeButton: false,
          }
        );
      },
      handleDelete: async (id: string) => {
        try {
          await api.delete(`/customer/${id}`);
          const allCustomers = useCustomerStore
            .getState()
            .state.customers.filter((customer) => customer.id !== id);
          set((state) => ({
            state: { ...state.state, customers: allCustomers },
          }));
          toast.success("Cliente deletado com sucesso");
        } catch (error) {
          console.log(error);
        }
      },
      handleSelect: (EditCustomer: Customer) => {
        set((state) => ({
          state: {
            ...state.state,
            customerSelect: EditCustomer,
            isUpdating: true,
          },
        }));
      },
    },
  };
});

export const useCustomerForm = () => {
  const methods = useForm<FormProps>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(schemaForm),
    defaultValues: {
      id: "",
      name: "",
      email: "",
    },
  });
  useEffect(() => {
    useFormStore.getState().setReset(methods.reset);
  }, [methods.reset]);
  return {
    handleSubmit: methods.handleSubmit,
    register: methods.register,
    errors: methods.formState.errors,
    reset: methods.reset,
  };
};
