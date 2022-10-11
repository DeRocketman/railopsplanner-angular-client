import {Measure} from "./measure";

export interface Agent {
    id?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    initials?: string;
    phone?: string;
    fax?: string;
    measures?: Measure[];
}
