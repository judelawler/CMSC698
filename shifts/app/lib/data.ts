import mysql, { ConnectionOptions, RowDataPacket } from 'mysql2/promise';



const access: ConnectionOptions = {
    host: 'localhost',
    port: 3306,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
};

export interface Shift extends RowDataPacket {
    id: string;
    name: string;
    start: string;
    end: string;
    color: string;
    user: string;
    text: string;
}

export interface User extends RowDataPacket {
    idusers: string;
    name: string;
    email: string;
    isadmin: string;
}

const conn = await mysql.createConnection(access);

export async function fetchShifts() : Promise<Shift[]> {
    const query = 'SELECT * from shifts;';
    const [shifts] = await conn.query<Shift[]>(query);
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