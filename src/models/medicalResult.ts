/* Angular */
import { DateTime } from "ionic-angular";
import { DecimalPipe } from "@angular/common";

/* Models */
import { Patient } from '../models/patient'

export class MedicalResult {
      Id : number;
      PatientId : number;
      RepeatDays : number;    
      MediumGlycogen : any;
      PercentGlycogen : any;
      ResultDate : DateTime
}