import Calendar from '@/app/ui/calendar';
import Loading from '@/app/ui/loading';
import { Suspense } from 'react';
import {DayPilot} from '@daypilot/daypilot-lite-react';
import { Shift, fetchShifts, fetchShiftsById, getUser, fetchAvailableShifts } from '@/app/lib/data'
import Link from 'next/link';
import { cookies } from 'next/headers';
import styles from '../styles/Design.module.css';


export default async function Page() {
    const userId = (await cookies()).get('userId')?.value?? "";
    console.log(userId);
    const events = await fetchShiftsById(userId);
    const availableEvents = await fetchAvailableShifts();
    
    return (
        <div>
            <Suspense fallback={<Loading/>}>
                <Calendar 
                    {...events}
                />
            </Suspense>
            <div>
                <div className={styles.choosedatediv}>
                    <p>Test Text - Date Choice: </p>
                    <input aria-label="Date" type="date" />
                </div>
                <div>
                    <p>This time selector will only be on admin page.</p>
                    <input aria-label="Time" type="time" />
                </div>
            </div>
        </div>
    )
}
/*  Idea is to have a blank select option (dropdown list) next to the date picker
    User can select a date, then list will contain all available shifts that day
    Time picker is only here for reference - will be in use in admin page.
    May have two selectors - one for available shifts, one for user's shifts so that they can 
    mark them as needing a sub (making them available) */