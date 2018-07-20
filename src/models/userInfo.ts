/* Angular */
import { DateTime } from "ionic-angular";

/* Models */ 
import { Patient } from "../models/patient"

export class UserInfo {
    Id : number;
    Name : string;
    Email :	string;
    RG: string;
    Password : string;
    ConfirmPassword : string;
	PhoneNumber	: string;
	IsDeleted :	boolean;
    UpdateDate : DateTime;
    Token : string;
    Patient : Patient;
}