import { T } from "@/types";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

export default function useRequirementContext(requirement: T.Stretch.Requirement) {
  const {
    status,
    data: session,
    update,
  } = useSession({
    required: false,
  });

  const { props } = useMemo(() => {
    
    return {
      props: undefined
    };
  }, [requirement]);
  return { props };
}
