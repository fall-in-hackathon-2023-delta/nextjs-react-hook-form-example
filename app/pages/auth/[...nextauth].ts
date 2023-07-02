import NextAuth, { Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt_decode from "jwt-decode";

import { DateTime } from "luxon";
import { DefaultJWT, JWT } from "next-auth/jwt";
import { PublicVariables } from "../../lib/PublicVariables";
import { Endpoints } from "../../lib/Endpoints";
import axios from "axios";
import { DirectusUser } from "@/types/Directus";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        const credential = {
          email: credentials?.username,
          password: credentials?.password,
        };
        try {
          const auth = await axios.post<Session>(Endpoints.Auth.userMe, credential);
          const profile = await axios.get<DirectusUser>(`${Endpoints.Auth.userMe}?fields=*`, {
            headers: {
              Authorization: `Bearer ${auth.data.access_token}`,
            },
          });
          const expires = DateTime.now()
            .plus({ seconds: auth?.data?.expires as number })
            .toMillis();
          const finalAuth = {
            ...auth?.data,
            expires: expires,
            reloadRequired: false,
          };
          const finalProfile = {
            ...profile?.data,
            expires: expires,
          };

          let session = {
            ...finalAuth,
            ...finalProfile,
          };

          if (session) {
            return session;
          } else {
    
          }
          return null;
        } catch (error) {

          return null;
          // const errorMessage = error.response.errors.message;
          // Note that you must throw error to redirect to error page
          // throw new Error("nextAuth error", error);
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },

  callbacks: {
    /* jwt: async ({ token: localToken, user, account, trigger }) => {


      // First time token is created
      if (account && user?.access_token && user?.refresh_token) {
        localToken.access_token = user.access_token;
        localToken.refresh_token = user.refresh_token;
        localToken.expires = DateTime.fromSeconds(jwt_decode<{ exp: number }>(user.access_token)[`exp`]).toMillis();
        localToken.user = user;

        return localToken;
      }
    }, */
    session: async ({ session, token, user }) => {
      const expiring =
        DateTime.fromMillis(token.expires as number)
          .diffNow()
          .as("milliseconds") <
        Number(process.env.ACCESS_TOKEN_TTL_MS) * 0.5;

      if (token) {
        session.user = token.user;
        session.access_token = token.access_token;
        session.refresh_token = token.refresh_token;
        session.expires = token.expires;
      }
      if (expiring) {
        return refreshAccessToken(token);
      } else {
        return session;
      }
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
    newUser: "/sign-up",
  },
  events: {
    async signOut(message) {},
  },
});
async function refreshAccessToken(localToken: JWT) {
  //  console.log("refreshingAccessToken");
  try {
    const auth = await axios.post<Session>(Endpoints.Auth.userMe, { refresh_token: localToken.refresh_token });
    const profile = await axios.get<DirectusUser>(`${Endpoints.Auth.userMe}?fields=*`, {
      headers: {
        Authorization: `Bearer ${auth.data.access_token}`,
      },
    });

    //  console.log("refreshAccessToken > Response auth", auth);
    const expires = DateTime.now()
      .plus({ milliseconds: auth?.data.expires as number })
      .toMillis();
    const finalAuth = {
      ...auth?.data,
      expires: expires,
    };
    const finalProfile = {
      ...profile?.data,
      expires: expires,
    };
    //  console.log("refresh finalAuth", finalAuth);
    let newSession: Session = {
      ...finalAuth,
      user: { ...finalProfile },
    };

    return newSession;
  } catch (error) {
    console.log("nextAuth error refreshing token", error);
    return {
      ...localToken,
      error: "RefreshAccessTokenError",
    };
  }
}
