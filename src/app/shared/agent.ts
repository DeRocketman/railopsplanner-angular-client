import {Measure} from "./measure";

export interface Agent {
    id?: String;
    email?: String;
    firstName?: String;
    lastName?: String;
    initials?: String;
    phone?: String;
    fax?: String;
    measures?: Measure[];
}
