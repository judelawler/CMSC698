import Login from '@/app/ui/login';
import { redirect } from 'next/navigation';

export default async function Page() {
    async function handleLogin(formData: FormData){
        'use server'
        const userName = formData.get('username') as string;
        const password = formData.get('password') as string;
        


        redirect('/calendardisplay/');
    }

    return (
        <div>
            <Login adder={handleLogin} />
        </div>
    )
    
}