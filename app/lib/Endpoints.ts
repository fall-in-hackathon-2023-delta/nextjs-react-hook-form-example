

export class Endpoints {
   static baseURL = process.env.NEXT_PUBLIC_API_URL;
   static Auth = {
      authLogin: `/auth/login`,
      authRefresh: `/auth/refresh`,
      userMe: `/users/me`,
      passwordRequest: `/auth/password/request`,
      passwordReset: `/auth/password/reset`
   };
   static Items = {
      assets: `/assets`,
      files: `/files`,
   };
   static Flows = {

   };
}
