import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { JWT } from "next-auth/jwt";
import { DirectusUser } from "./Directus/User";

declare module "next-auth" {
   /**
    * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
    */
   interface Session {
      user: User;
      access_token: string;
      refresh_token: string;
      expires: number;
      error?: string;
      buildId?: string;
      reloadRequired?: boolean;
   }
   interface User extends DirectusUser, DefaultSession["user"] {
      access_token?: string;
      refresh_token?: string;
      expires?: number;
   }
}

declare module "next-auth/jwt" {
   /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
   interface JWT {
      user: User & DefaultJWT["token"];
      access_token: string;
      refresh_token: string;
      expires: number;
      error?: string;
      buildId?: string;
      reloadRequired?: boolean;
   }
}


export type SignUpFormData = {
   email: string
   password: string
   passwordConfirm: string | null
   firstName: string
   lastName: string
   terms: true
   privacy: true
}