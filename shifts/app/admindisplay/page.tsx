import Calendar from '@/app/ui/calendar';
import Loading from '@/app/ui/loading';
import { Suspense } from 'react';
import { fetchShiftsById, fetchAvailableShifts } from '@/app/lib/data'
import { cookies } from 'next/headers';
import styles from '../styles/Design.module.css';

export default async function Page() {
    const userId = (await cookies()).get('userId')?.value?? "";
    console.log(userId);
    const events = await fetchShiftsById(userId);
    const availableEvents = await fetchAvailableShifts();

    return (
        <div>
            <h1>ADMIN PAGE</h1>
            <Suspense fallback={<Loading/>}>
                <Calendar 
                    {...events}
                />
            </Suspense>
            <div>
                <div className={styles.choosedatediv}>
                    <p> Test Text - Date Choice: </p>
                    <input aria-label="Date" type="date" />
                </div>
                <div className={styles.choosetimediv}>
                    <p> Test Text - Time Choice: </p>
                    <input aria-label="Date" type="date" />
                </div>
            </div>
        </div>
    )
}