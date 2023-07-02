import { T } from "@/types";
import { createContext } from "react";

const RequirementContext = createContext<T.Stretch.Requirement>({
    id: "",
    label: "",
    priority: null, // 1-3, 1 being most important
    isEssential: false,// if true, then event can be postponed due to lack of commitment. Organizer can toggle on/off at any time.
    numberRequired: 1, // the number of people who commit to complete the requirement. Ex: Need 3 people to volunteer to bring 2 chairs each.
    options: [], //TodoOption[]; // we don’t care what dessert you bring, we just care you bring a dessert of type “vegan” | “vegetarian” | “has_meat”, selected from dropdown "baseball supplies" | "basketball" | "frisbee" | "soccer ball"
    commitments: [],
    offersAllowed: false
});