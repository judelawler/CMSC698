import Login from '@/app/ui/login';
import { redirect } from 'next/navigation';
import { User, userLogin } from '@/app/lib/data';
import { cookies } from 'next/headers';

export default async function Page() {
    async function handleLogin(formData: FormData){
        'use server'
        const userName = formData.get('username') as string;
        const password = formData.get('password') as string;
        const user = await userLogin(userName,password);
        const userId = user.idusers;
        console.log("User ID is: "+userId);
        (await cookies()).set('userId',userId);
        redirect('/calendardisplay/');
    }

    return (
        <div>
            <Login adder={handleLogin} />
        </div>
    )
    
}