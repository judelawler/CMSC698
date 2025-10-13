import Login from '@/app/ui/login';

export default async function Page() {
    async function handleLogin(formData: FormData){
        'use server'
        const userName = formData.get('username') as string;
        const password = formData.get('password') as string;
        





        return (
            <div>
                <Login adder={handleLogin} />
            </div>
        )
    }
}