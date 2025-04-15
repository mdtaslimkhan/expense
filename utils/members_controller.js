
import * as SQLite from 'expo-sqlite';
import { getCurrentDate } from '../constants/helper';
import { database, date } from '../components/constants';

export async function insertMember(param){
    console.log(param.account);
    console.log(param.name);
    const db = await SQLite.openDatabaseAsync(database);
    const promise = new Promise( async (resolve, reject) => {
        try{
            const reslt = await db.runAsync(`INSERT INTO member (name, account, date) VALUES (?, ?, ?)`,
            [param.name, param.account, date]);
            resolve(reslt);
        }catch(err){
            reject(err);
        }
    });
    return promise;
}


export async function fetchMember(){
    const db = await SQLite.openDatabaseAsync(database);
    const promise = new Promise(async(resolve, reject) => {
        try{
            const result = await db.getAllAsync('SELECT * FROM member ORDER BY id DESC');
            resolve(result);
        }catch(err){
            reject(err);
        }
    });
    return promise;
}

export async function editMember(item){
    const db = await SQLite.openDatabaseAsync(database);
    const promise = new Promise( async (resolve, reject) => {
        try{
            const reslt = await db.runAsync('UPDATE member SET value = ?, intValue = ? WHERE id = ?', [item.text, item.desc, item.id]);
            resolve(reslt);
        }catch(err){
            reject(err);
        }
    });
    return promise;
}


export async function deleteMember(id){
    const db = await SQLite.openDatabaseAsync(database);
    const promise = new Promise( async (resolve, reject) => {
        try{
            await db.runAsync('DELETE FROM member WHERE id = ?', [id]);
            resolve();
        }catch(err){
            reject(err);
        }
    });
    return promise;
}