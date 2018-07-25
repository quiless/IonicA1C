/* Angular */
import { DateTime } from "ionic-angular";

/* Models */ 
import { Patient } from "../models/patient"

export class UserInfo {
    Id : number;
    Name : string;
    Email :	string;
    Gender : number;
    RG: string;
    Password : string;
    ConfirmPassword : string;
	PhoneNumber	: string;
	IsDeleted :	boolean;
    UpdateDate : DateTime;
    Token : string;
    Patient : Patient;
}