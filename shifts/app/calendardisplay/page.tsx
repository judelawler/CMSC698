import Calendar from '@/app/ui/calendar';
import Loading from '@/app/ui/loading';
import { Suspense } from 'react';
import {DayPilot} from '@daypilot/daypilot-lite-react';
import { Shift, fetchShifts, fetchShiftsById, getUser } from '@/app/lib/data'
import Link from 'next/link';
import { cookies } from 'next/headers';


export default async function Page() {
    const userId = (await cookies()).get('userId')?.value?? "";
    console.log(userId);
    const events = await fetchShiftsById(userId);
    
    return (
        <div>
            <h3>CALENDAR PAGE</h3>
            <Suspense fallback={<Loading/>}>
                <Calendar 
                    {...events}
                />
            </Suspense>
            <input aria-label="Time" type="time" />
            <input aria-label="Date" type="date" />
        </div>
    )
} // the time chooser is just for reference for later usage in admin version