import Calendar from '@/app/ui/calendar';
import Loading from '@/app/ui/loading';
import { Suspense } from 'react';
import {DayPilot} from '@daypilot/daypilot-lite-react';
import { Shift, fetchShifts, getUser } from '@/app/lib/data'
import Link from 'next/link';
import { cookies } from 'next/headers';


export default async function Page() {
    const userId = (await cookies()).get('userId')?.value?? "";
    const currentUser = getUser(userId);
    const events = await fetchShifts();

    // possibility: May have to make calendar un-interactable, just visual; all database interactions outside it?
    return (
        <div>
            <h3>CALENDAR PAGE</h3>
            <Suspense fallback={<Loading/>}>
            <Calendar 
                {...events}
              
            />
            </Suspense>
        </div>
    )
}