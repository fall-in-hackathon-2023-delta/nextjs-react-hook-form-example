import { T } from "@/types";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

export default function useCategoryContext(type: string, fields: T.Stretch.Requirement[]) {
  const {
    status,
    data: session,
    update,
  } = useSession({
    required: false,
  });

  const { renderFields, header } = useMemo(() => {
    if (type === "myTodos" && status === "authenticated") {
      const myRequirements = fields.filter((field) => {
        return field.commitments?.find((commit) => commit?.contributor?.id === session?.user?.id);
      });

      return {
        renderFields: myRequirements,
        header: myRequirements?.length ? "My Todos" : undefined,
      };
    } else if (type === "pendingTodos") {
      const pendingRequirements = fields.filter((field) => {
        return field.commitments?.find((commit) => commit?.status === "proposed" || commit?.status === "in_progress");
      });

      return {
        renderFields: pendingRequirements,
        header: pendingRequirements?.length ? "Pending Todos" : undefined,
      };
    } else if (type === "completedTodos") {
      const completedRequirements = fields.filter((field) => {
        return field.commitments?.find((commit) => commit?.status === "completed");
      });

      return {
        renderFields: completedRequirements,
        header: completedRequirements?.length ? "Completed Todos" : undefined,
      };
    } else if (type === "todos") {
      const requirements = fields.filter((field) => {
        return field.commitments?.find((commit) => commit?.status === "open");
      });

      return {
        renderFields: requirements,
        header: "Todos"
      };
    }
    return {
      renderFields: [],
      header: undefined,
    };
  }, [type, fields]);
  return { renderFields, header };
}
