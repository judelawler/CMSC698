import Calendar from '@/app/ui/calendar';
import Loading from '@/app/ui/loading';
import { Suspense } from 'react';
import {DayPilot} from '@daypilot/daypilot-lite-react';
import { Shift, fetchShifts } from '@/app/lib/data'

export default async function Page() {
    
    
    return (
        <div>
            <h3>CALENDAR PAGE</h3>
            <Calendar
                
            />
        </div>
    )
}