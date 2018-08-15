import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class SQLiteProvider {

  constructor(private sqlite: SQLite) { }

  /* Cria um banco caso não exista ou pega um by
  anco existente com o nome no parametro */

  public getDB() {
    return this.sqlite.create({
      name: 'a1c.db',
      location: 'default'
    });
  }

  /* Cria a estrutura inicial do banco de dados */

  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
        // Criando as tabelas
        this.createTables(db);
      })
      .catch(e => console.log(e));
  }

  /**
   * Criando as tabelas no banco de dados
   * @param db
   */
  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS Patient (Id INTEGER PRIMARY KEY AUTOINCREMENT, Email TEXT, Gender INTEGER, Birthdate DATETIME, RG TEXT, PhoneNumber TEXT,  Name TEXT, WasSync INTEGER)'],
      ['CREATE TABLE IF NOT EXISTS MedicalResult (Id INTEGER PRIMARY KEY AUTOINCREMENT, PatientId INTEGER, ResultDate DATETIME, RepeatDays INTEGER, MediumGlycogen DECIMAL(10,2), PercentGlycogen DECIMAL(10,2), SendEmailSMS INTEGER, Uid TEXT, WasSync INTEGER, Uid INTEGER)'],
      ['CREATE TABLE IF NOT EXISTS UserInfoTextConfig (Id INTEGER PRIMARY KEY AUTOINCREMENT, UserInfoId INTEGER, TextConfig TEXT, TextType INTEGER, WasReset INTEGER, WasSync INTEGER)']
    ])
    .then(() => console.log('Tabelas criadas'))
    .catch(e => console.error('Erro ao criar as tabelas', e));
  }
}