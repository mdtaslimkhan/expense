
import * as SQLite from 'expo-sqlite';
import { database, date } from '../components/constants';

export async function insertCollection(item){
    console.log(item.account);
    console.log(item.name);
    const db = await SQLite.openDatabaseAsync(database);
    const promise = new Promise( async (resolve, reject) => {
        try{
            const reslt = await db.runAsync(`INSERT INTO collection (title, amount, member_id, date) VALUES (?, ?, ?, ?)`,
            [item.title, item.amount, item.mid, date]);
            resolve(reslt);
        }catch(err){
            reject(err);
        }
    });
    return promise;
}


export async function fetchCollection(){
    const db = await SQLite.openDatabaseAsync(database);
    const promise = new Promise(async(resolve, reject) => {
        try{
            const result = await db.getAllAsync('SELECT * FROM collection ORDER BY id DESC');
            resolve(result);
        }catch(err){
            reject(err);
        }
    });
    return promise;
}

export async function editCollection(item){
    const db = await SQLite.openDatabaseAsync(database);
    const promise = new Promise( async (resolve, reject) => {
        try{
            const reslt = await db.runAsync('UPDATE collection SET title = ?, amount = ?, member_id = ?  WHERE id = ?', [item.title, item.amount, item.mid]);
            resolve(reslt);
        }catch(err){
            reject(err);
        }
    });
    return promise;
}


export async function deleteCollection(id){
    const db = await SQLite.openDatabaseAsync(database);
    const promise = new Promise( async (resolve, reject) => {
        try{
            await db.runAsync('DELETE FROM collection WHERE id = ?', [id]);
            resolve();
        }catch(err){
            reject(err);
        }
    });
    return promise;
}

