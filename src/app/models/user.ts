import { Profile } from "./profile";
import { Status } from "./status";

export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    phone: string | undefined;
    email: string;
    access_profile: Profile[];
    language: string;
    preferred_contact: string;
    status: Status;
    creation_date: string;
    last_access_date: string | undefined;
    last_access_time: string | undefined;
}