
import * as SQLite from 'expo-sqlite';
import { database, date } from '../components/constants';


const test = `PRAGMA journal_mode = WAL; CREATE TABLE IF NOT EXISTS test (
                id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER, date TEXT)`;

const member = `CREATE TABLE IF NOT EXISTS member (
                id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, account INTEGER, date TEXT)`;

const category = `CREATE TABLE IF NOT EXISTS category (
                id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, date TEXT)`;

const collection = `CREATE TABLE IF NOT EXISTS collection (
                id INTEGER PRIMARY KEY NOT NULL, title TEXT, amount INTEGER NOT NULL, member_id INTEGER, date TEXT)`;

const item = `CREATE TABLE IF NOT EXISTS item (
                id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, price INTEGER, date TEXT)`;

                
export async function init () {
    const db = await SQLite.openDatabaseAsync(database);
    const promise = new Promise( async(resolve, reject) => {
        try{
            await db.execAsync(test);
            await db.execAsync(member);
            await db.execAsync(category);
            await db.execAsync(collection);
            await db.execAsync(item);
                console.log("db connected");
                resolve();
        }catch(err){
            console.log(err);
            reject(err);
        }
    })
    return promise;
}

export async function insertExpense(expense){
    const db = await SQLite.openDatabaseAsync(database);
    const promise = new Promise( async (resolve, reject) => {
        try{
            const reslt = await db.runAsync(`INSERT INTO test (value, intValue, date) VALUES (?, ?, ?)`,
            [expense.text, expense.desc, date]);
            resolve(reslt);
        }catch(err){
            reject(err);
        }
    });
    return promise;
}


export async function fetchData(){
    const db = await SQLite.openDatabaseAsync(database);
    const promise = new Promise(async(resolve, reject) => {
        try{
            const result = await db.getAllAsync('SELECT * FROM test ORDER BY id DESC');
            resolve(result);
        }catch(err){
            reject(err);
        }
    });
    return promise;
}

export async function editExpense(item){
    const db = await SQLite.openDatabaseAsync(database);
    const promise = new Promise( async (resolve, reject) => {
        try{
            const reslt = await db.runAsync('UPDATE test SET value = ?, intValue = ? WHERE id = ?', [item.text, item.desc, item.id]);
            resolve(reslt);
        }catch(err){
            reject(err);
        }
    });
    return promise;
}


export async function deleteExpense(id){
    const db = await SQLite.openDatabaseAsync(database);
    const promise = new Promise( async (resolve, reject) => {
        try{
            await db.runAsync('DELETE FROM test WHERE id = ?', [id]);
            resolve();
        }catch(err){
            reject(err);
        }
    });
    return promise;
}