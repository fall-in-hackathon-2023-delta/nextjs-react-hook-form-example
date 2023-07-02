import { DateTime } from 'luxon';


/*
Use case: Adventure therapy

Core requirements:


*/
// namespaces support autocompletion and can be invoked like this: T.Event or T.Requirement.
export namespace T {

    export namespace Base {
        
          export type Event = {
            id: string;
            title?: string;
            description?: string;
            todos?: Todo[];
            duration: number; // in minutes
            location: Location;
            dateTime: DateTime;
            offersAllowed: boolean;
          };
          export type Todo = {
            id: string;
            status: "proposed" | "in_progress" | "declined" | "completed" | "cancelled" | "abandoned" | "open";
            label: string;
            options: { label: string;}[];
            selectedOption: string | null;
            priority: number | null; // 1-3, 1 being most important
            isEssential: boolean; // if true, then event can be postponed due to lack of commitment. Organizer can toggle on/off at any time.
            contributor: Person | null;
          }
          export type Person = {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            reputation: number; // 0-100, function of percentage of commitments completed vs abandoned?
          };
    }

    export namespace Stretch {
        export type Event = {
            id: string;
            title?: string;
            description?: string;
            requirements?: Requirement[];
            categories?: Category;
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
          export type Category = {
            id: string;
            description: string;
            requirements: Requirement[];
          }
          export type Requirement = {
            id: string;
            label: string;
            priority: number | null; // 1-3, 1 being most important
            isEssential: boolean; // if true, then event can be postponed due to lack of commitment. Organizer can toggle on/off at any time.
            numberRequired: number; // the number of people who commit to complete the requirement. Ex: Need 3 people to volunteer to bring 2 chairs each.
            options: string[]; //TodoOption[]; // we don’t care what dessert you bring, we just care you bring a dessert of type “vegan” | “vegetarian” | “has_meat”, selected from dropdown "baseball supplies" | "basketball" | "frisbee" | "soccer ball"
            commitments: Commitment[];
            offersAllowed: boolean;
          };
          export type Commitment = {
            id: string;
            status: "proposed" | "in_progress" | "declined" | "completed" | "cancelled" | "abandoned" | "open";
            contributor: Person;
            description: string;
            chat: Chat;
          };
    }
  
}
