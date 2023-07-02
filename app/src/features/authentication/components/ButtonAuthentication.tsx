import { useSession, signIn, signOut } from "next-auth/react";
import { PublicVariables } from "../../../../lib/PublicVariables";

export default function ButtonAuthentication() {
  const {
    status,
    data: session,
    update,
  } = useSession({
    required: false,
  });

  return (
    <div>
      {status !== "authenticated" ? (
        <button
        className="bg-steelBlue rounded-md p-4 hover:cursor-pointer"
          style={{
         
            marginRight: "10px",
          }}
          onClick={() =>
            signIn(undefined, {
              callbackUrl: `${PublicVariables.applicationBaseURL}/events`,
            })
          }
        >
          Login / Sign Up
        </button>
      ) : (
        <button
        className="bg-steelBlue rounded-md p-4 hover:cursor-pointer"
          style={{
          
            marginRight: "10px",
          }}
          onClick={() =>
            signOut({
              callbackUrl: `${PublicVariables.applicationBaseURL}/events`,
            })
          }
        >
          Sign Out
        </button>
      )}
    </div>
  );
}
