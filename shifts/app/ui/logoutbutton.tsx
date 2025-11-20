'use client'
import { redirect } from 'next/navigation';

export default function LogOutButton() {
    
    return (
        <button onClick={()=>redirect("/login/")}>Log Out</button>
    );
}