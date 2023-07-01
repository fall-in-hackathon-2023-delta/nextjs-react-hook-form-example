import { DateTime } from 'luxon';


/*
Use case: Adventure therapy

Core requirements:
    

*/
// namespaces support autocompletion and can be invoked like this: T.Event or T.Requirement.
export namespace T {
  export type Event = {
    id: string;
    title?: string;
    description?: string;
    requirements: Requirement[];
    duration: number; // in minutes
    location: Location;
    scheduleOptions: DateOption[];
    confirmedDateTime: DateOption;
  };
  export type DateOption = {
    id: string;
    dateProps: DateTime;
    votes: DateVote[]; // probably a fake type, because it'll be accounted for in db/redux
  };
  export type DateVote = {
    id: string;
    dateOptionId: string;
    voter: Person;
    vote: "yes" | "no" | "if_need_be";
  }
  export type Location = {
    id: string;
    name: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    lat: number;
    long: number;
  }
  export type Requirement = {
    id: string;
    description: string;
    isHardRequirement: boolean; // if true, then event can be postponed due to lack of commitment. Organizer can toggle on/off at any time.
    commitmentsRequired: number; // the number of people who commit to complete the todo. Ex: Need 3 people to volunteer to bring 2 chairs each.
    options?: Todo[]; // we don’t care what dessert you bring, we just care you bring a dessert of type “vegan” | “vegetarian” | “has_meat”, selected from dropdown  "baseball supplies" | "basketball" | "frisbee"
    commitments: Commitment[];
  };
  export type Commitment = {
    id: string;
    status: "proposed" | "accepted" | "in_progress" | "declined" | "completed" | "cancelled" | "expired";
    contributor: Person;
    todoID: string; // Could potentially remain ID instead of entire object, due to normalized redux store
    chat: Chat;
  };
  export type Todo = {
    id: string;
    description: string;

  };
  export type Person = {
    id: string;
    firstName: string;
    lastName: string;
    reputation: number; // 0-100, function of percentage of commitments completed vs expired?
  };
}
