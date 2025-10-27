import mysql, { ConnectionOptions, RowDataPacket } from 'mysql2/promise';
import { DayPilot } from '@daypilot/daypilot-lite-react';



const access: ConnectionOptions = {
    host: 'localhost',
    port: 3306,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
};

export interface Shift extends RowDataPacket {
    id: string;
    text: string;
    start: any;
    end: any;
    color: string;
    //user: string;
    tags: any;
    userid: string;
}

export interface User extends RowDataPacket {
    idusers: string;
    username: string;
    password: string;
    name: string;
    email: string;
}

const conn = await mysql.createConnection(access);

export async function fetchShifts() : Promise<Shift[]> {
    const query = 'SELECT * from shifts;';
    const [shifts] = await conn.query<Shift[]>(query);
    return shifts;
}

export async function fetchShiftsById(userid:string) : Promise<Shift[]> {
    const query = 'SELECT * from shifts;';
    const [shifts] = await conn.query<Shift[]>(query);

    for(const thing of shifts){
        if(thing.userid == userid) {
            thing.tags = 1;
        } if(thing.userid == null){
            thing.tags = 0;
        }
    }
    return shifts;
}

export async function fetchShift(id : string) : Promise<Shift> {
    const query = 'SELECT * from shifts WHERE id=?';
    const values = [id];
    const [shifts] = await conn.query<Shift[]>(query,values);
    if(shifts.length == 0)
        throw Error("Invalid shift id.");
    return shifts[0];
}

export async function addShift(text:string,start:any,end:any) {
    const sql = 'INSERT INTO shifts(text,start,end) VALUES (?,?,?)';
    const values = [text,start,end];

    await conn.execute(sql,values);
}

export async function addShifts(shifts:Shift[]) {
    for (var i of shifts) {
        await addShift(i.text,i.start,i.end);
    }
}

export async function userLogin(username:string,password:string) : Promise<User> {
    const query = 'SELECT * from users WHERE username=? and password=?';
    const values = [username,password];
    const [users] = await conn.query<User[]>(query,values);

    if(users.length == 0)
        throw Error("User not found.");
    return users[0];
}

export async function getUser(idusers: string) : Promise<User> {
    const query = 'SELECT * from users WHERE idusers=?';
    const values = [idusers];
    const [users] = await conn.query<User[]>(query,values);
    if(users.length == 0)
        throw Error("Invalid user id.");
    return users[0];
}