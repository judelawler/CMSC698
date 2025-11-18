import UserAdder from '@/app/ui/useradder';
import { addUser } from '@/app/lib/data';
import { redirect } from 'next/navigation';
import styles from '../styles/Design.module.css';


export default async function Page() {
    
    async function handleAdd(formData: FormData){
        'use server'
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const isAdminCheck = formData.get('isadmin') as string;
        let isAdmin = 0;
        if(isAdminCheck == "on"){
            isAdmin = 1;
        }
        if(username == "" || password == "" || name == "" || email == ""){
            redirect('/adduser/');
        } else{
            addUser(username,password,name,email,isAdmin);
            redirect('/admindisplay/');
        }
    }

    return(
        <div>
            <h1 className={styles.center}>Add a User</h1>
            <div className={styles.centereddiv}>
                <UserAdder adder={handleAdd}/>
            </div>
        </div>
    )

}