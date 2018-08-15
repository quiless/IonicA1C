/* Angular */
import { Injectable } from '@angular/core';

/* Ionic */
import { SQLiteObject } from '@ionic-native/sqlite';

/* Database */
import { SQLiteProvider } from '../database/SQLite';

/* Models */

import { UserInfoTextConfig } from '../models/userInfoTextConfig'

import { NavController, LoadingController, AlertController } from 'ionic-angular';

@Injectable()
export class UserInfoTextConfigProvider {

  constructor(private database: SQLiteProvider, alertController : AlertController) { }

  public insertUserInfoTextConfig (userInfoTextConfig: UserInfoTextConfig) {
    return this.database.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into UserInfoTextConfig (UserInfoId, TextConfig, TextType, WasReset, WasSync) values (?,?,?,?,?)';
        let data = [userInfoTextConfig.UserInfoId, 
                    userInfoTextConfig.TextConfig, 
                    userInfoTextConfig.TextType, 
                    userInfoTextConfig.WasReset, 
                    userInfoTextConfig.WasSync];
        
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public updateUserInfoTextConfig () {
    return this.database.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update UserInfoTextConfig set WasSync = 1';
 
        return db.executeSql(sql, null)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }


  public getUserInfoTextConfig(UserInfoId : number) {
    return this.database.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from UserInfoTextConfig where UserInfoId = ?';
        let data = [UserInfoId];
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let UserInfoTextConfigs: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var UserInfoTextConfig = data.rows.item(i);
                UserInfoTextConfigs.push(UserInfoTextConfig);
              }
              return UserInfoTextConfigs;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}
