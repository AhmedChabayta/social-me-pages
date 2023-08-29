"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
export default Providers;
