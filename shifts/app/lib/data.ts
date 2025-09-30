import mysql, { ConnectionOptions, RowDataPacket } from 'mysql2/promise';



const access: ConnectionOptions = {
    host: 'localhost',
    port: 3306,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
};

export interface Shift extends RowDataPacket {
    idshifts: string;
    name: string;
    start: string;
    end: string;
    worker: string;
}

export interface User extends RowDataPacket {
    idusers: string;
    name: string;
    email: string;
    isadmin: string;
}