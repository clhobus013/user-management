import { Profile } from "./profile";
import { Status } from "./status";

export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    access_profile: Profile[];
    language: string;
    preferred_contact: string;
    status: Status;
    creation_date: string;
    last_access_date: string;
    last_access_time: string;
}