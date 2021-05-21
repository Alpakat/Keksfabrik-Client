import { createContext } from "react";

import { QueryClient } from 'react-query'

export interface PassInterface {
    pass: string;
    setPass: any;
    queryClient: QueryClient | null;
}

export const pass: PassInterface = {
    pass: "",
    setPass: (t: any) => { },
    queryClient: null
};

export const PassContext = createContext(
    pass
);