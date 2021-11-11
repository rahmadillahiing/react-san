import { createContext } from "react";

//credentialcontext
export const CredentialsContext = createContext({storedCredentials: {}, setStoredCredentials: () => {}})