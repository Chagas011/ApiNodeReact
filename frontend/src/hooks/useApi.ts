import { useContext } from "react";
import { ApiContexts } from "../contexts/ApiContext";

export const useApi = () => useContext(ApiContexts);
