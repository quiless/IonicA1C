/* Angular */
import { Injectable } from '@angular/core';

/* Ionic */
import { SQLiteObject } from '@ionic-native/sqlite';

/* Database */
import { SQLiteProvider } from '../database/SQLite';

/* Models */

import { Patient } from '../models/patient'

import { NavController, LoadingController, AlertController } from 'ionic-angular';

@Injectable()
export class PatientProvider {

  constructor(private database: SQLiteProvider, alertController : AlertController) { }

  public insertPatient (patient: Patient) {
    return this.database.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into Patient (Email, Gender, Birthdate, Name, RG, PhoneNumber, UpdateDate, UniqueId, WasSync) values (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        let data = [patient.Email, patient.Gender, patient.Birthdate, patient.Name, patient.RG, patient.PhoneNumber, patient.UpdateDate, patient.WasSync];
        
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getPatientByRG (RG: string) {
    return this.database.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from Patient where RG = ?';
        let data = [RG];

        return db.executeSql(sql, data)
          .then((data: any) => {
            return data.rows.length;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public updatePatient (RG : string) {
    return this.database.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update Patient set WasSync = 1 where RG = ?';
        let data = [RG];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getPatients() {
    return this.database.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from Patient';

        return db.executeSql(sql, null)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let Patients: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var Patient = data.rows.item(i);
                Patients.push(Patient);
              }
              return Patients;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}
