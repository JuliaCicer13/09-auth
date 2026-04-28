'use client';

import { getMe } from "@/lib/api/clientApi";

import { useAuthStore } from "@/lib/store/authStore";

import { useEffect, useState } from "react";

import Spinner from "../Loader/loader";

type Props = {

  children: React.ReactNode;

};

const AuthProvider = ({ children }: Props) => {

  const [loading, setLoading] = useState(true);

  const setUser = useAuthStore((state) => state.setUser);

  const clearIsAuthenticated = useAuthStore(

    (state) => state.clearIsAuthenticated

  );

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const user = await getMe(); // 👈 сразу берём юзера

        if (user) {

          setUser(user);

        } else {

          clearIsAuthenticated();

        }

      } catch {

        clearIsAuthenticated();

      } finally {

        setLoading(false);

      }

    };

    fetchUser();

  }, [setUser, clearIsAuthenticated]);

  if (loading) return <Spinner />;

  return children;

};

export default AuthProvider;