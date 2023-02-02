import { createContext, useContext, useState } from "react";

const defaultProviderValues = {};

const AppContext = createContext(defaultProviderValues);

export const AppProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState("");
    const [userData, setUserData] = useState({});

    return (
        <AppContext.Provider
            value={{ currentUser, setCurrentUser, userData, setUserData }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
