import { createContext, useContext, useState } from "react";

const defaultProviderValues = {};

const AppContext = createContext(defaultProviderValues);

export const AppProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState("");

    return (
        <AppContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
