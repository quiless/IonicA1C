/* Angular */
import { Injectable } from '@angular/core';

/* Ionic */
import { SQLiteObject } from '@ionic-native/sqlite';

/* Database */
import { SQLiteProvider } from '../database/SQLite';

/* Models */

import { MedicalResult } from '../models/medicalResult'

@Injectable()
export class MedicalResultProvider {

    constructor(private database: SQLiteProvider) { }

    public insertMedicalResult (medicalResult: MedicalResult) {
        return this.database.getDB()
            .then((db: SQLiteObject) => {
            let sql = 'insert into MedicalResult (PatientId, ResultDate, RepeatDays, MediumGlycogen, PercentGlycogen, SendEmailSMS, WasSync, Uid) values (?, ?, ?, ?, ?, ?, ?, ?)';
            let data = [medicalResult.PatientId, medicalResult.ResultDate, medicalResult.RepeatDays, medicalResult.MediumGlycogen, medicalResult.PercentGlycogen, medicalResult.SendEmailSMS, medicalResult.WasSync, medicalResult.Uid];
            
            return db.executeSql(sql, data)
                .catch((e) => console.error(e));
            })
            .catch((e) => console.error(e));
    }

    public updateMedicalResult (UniqueId : string) {
        return this.database.getDB()
          .then((db: SQLiteObject) => {
            let sql = 'update Patient set WasSync = 1 where Uid = ?';
            let data = [UniqueId];
     
            return db.executeSql(sql, data)
              .catch((e) => console.error(e));
          })
          .catch((e) => console.error(e));
      }



    

    public getMedicalResultByUniqueId (UniqueId: string) {
        return this.database.getDB()
            .then((db: SQLiteObject) => {
            let sql = 'select * from Incidence where Uid = ?';
            let data = [UniqueId];

            return db.executeSql(sql, data)
                .then((data: any) => {
                return data.rows.length;
                })
                .catch((e) => console.error(e));
            })
            .catch((e) => console.error(e));
    }
    
    public getMedicalResults() {
        return this.database.getDB()
            .then((db: SQLiteObject) => {
            let sql = 'select * from MedicalResults';

        return db.executeSql(sql, null)
            .then((data: any) => {
            if (data.rows.length > 0) {
                let Incidences: any[] = [];
                for (var i = 0; i < data.rows.length; i++) {
                var Incidence = data.rows.item(i);
                Incidences.push(Incidence);
                }
                return Incidences;
            } else {
                return [];
            }
            })
            .catch((e) => console.error(e));
        })
        .catch((e) => console.error(e));
    }   
}