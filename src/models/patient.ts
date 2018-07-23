/* Angular */
import { DateTime } from "ionic-angular";

export class Patient {
    Id : number;
    Email : string;
    Gender : number;
    Birthdate: DateTime;
    Name: string;
    RG : string;
	PhoneNumber	: string;
	IsDeleted :	boolean;
    UpdateDate : DateTime;
}