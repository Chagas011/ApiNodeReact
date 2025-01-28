import { z } from "zod";

export const schemaForm = z
  .object({
    id: z.string().optional(),
    name: z.string().min(3, "Informe um nome valido"),
    email: z.string().email("Informe um email valido"),
  })
  .transform((field) => ({
    id: field.id,
    name: field.name,
    email: field.email,
  }));
