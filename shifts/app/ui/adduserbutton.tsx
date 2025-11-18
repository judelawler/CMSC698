'use client'
import { redirect } from 'next/navigation';

export default function AddUserButton() {
    return (
        <button onClick={()=>redirect("/adduser/")}>Add User</button>
    );
}