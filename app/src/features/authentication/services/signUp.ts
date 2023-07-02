import { Endpoints } from "../../../../lib/Endpoints";

const signUp = async (payload: { email: string
    password: string
    firstName: string
    lastName: string}) => {
   //  console.log("sending signUp request to directus", payload);
   const roleId = process.env.NEXT_PUBLIC_DIRECTUS_AUTHENTICATED_ROLE_ID;
   const newUser = await fetch(`${Endpoints.baseURL}/users`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({
         email: payload.email,
         password: payload.password,
         first_name: "Test",
         last_name: "User",
         role: roleId
      })
   })
      .then((res) => res)
      .catch((error) => error);

   return newUser;
};

export default signUp;
