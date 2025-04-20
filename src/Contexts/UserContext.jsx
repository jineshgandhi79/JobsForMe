import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export default function UserProvider({children}) {
    const [userData, setUserData] = useState(null);

    // Initialize userData from localStorage when the provider mounts
    useEffect(() => {
        const savedData = localStorage.getItem('userProfile');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            console.log("Loading user data:", parsedData);
            setUserData(parsedData);
        }
    }, []);

    return(
        <UserContext.Provider value={{userData,setUserData}}>
            {children}
        </UserContext.Provider>
    );
}