import Calendar from '@/app/ui/calendar';
import Loading from '@/app/ui/loading';
import { Suspense } from 'react';
import {DayPilot} from '@daypilot/daypilot-lite-react';
import { Shift, fetchShifts } from '@/app/lib/data'
import Link from 'next/link';


export default async function Page() {
    
    const events = await fetchShifts();

    return (
        <div>
            <h3>CALENDAR PAGE</h3>
            <Calendar
                {...events}
            />
        </div>
    )
}