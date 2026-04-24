'use client';

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect , useState} from "react";
import Spinner from "../Loader/loader";

type Props = {
    children: React.ReactNode;
};

const AuthProvider = ({children}: Props) => {
    const [loading, setLoading] = useState(true);

    const setUser = useAuthStore((state) => state.setUser);
    const clearIsAuthenticated = useAuthStore((state) => 
  state.clearIsAuthenticated);

    useEffect(() => {
     const fetchUser = async () => {
        try{
        const isAuthenticated = await checkSession();
        if (isAuthenticated) {
             const user = await getMe();
            if (user) setUser(user);
        } else {
            clearIsAuthenticated();
        }
     } finally {
        setLoading(false)
     }
   };
     fetchUser();
    },  [setUser, clearIsAuthenticated]);

    if (loading) return <Spinner/>

    return children;
};

export default AuthProvider;