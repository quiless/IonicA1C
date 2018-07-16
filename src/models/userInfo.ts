/* Angular */
import { DateTime } from "ionic-angular";

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
}