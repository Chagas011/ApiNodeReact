import { schemaForm } from "../schema/schemaForm";
import { z } from "zod";
export type FormProps = z.infer<typeof schemaForm>;
