import Calendar from '@/app/ui/calendar';
import Loading from '@/app/ui/loading';
import ShiftEditor from '@/app/ui/shifteditor';
import { Suspense } from 'react';
import { Shift, fetchShifts, fetchShiftsById, getUser, fetchAvailableShifts, assignShift } from '@/app/lib/data'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import styles from '../styles/Design.module.css';


export default async function Page() {
    const userId = (await cookies()).get('userId')?.value?? "";
    console.log(userId);
    const user = await getUser(userId);
    const events = await fetchShiftsById(userId);
    const availableEvents = await fetchAvailableShifts();
    const availEventArray = Object.values(availableEvents);
    
    async function handleEdit(formData: FormData) {
        'use server'
        const chosenShiftId = formData.get('shiftselect') as string;
        const userName = user.name;
        assignShift(chosenShiftId,userName,userId);
        redirect('/calendardisplay/');
    }

    return (
        <div>
            <Suspense fallback={<Loading/>}>
                <Calendar 
                    {...events}
                />
            </Suspense>
            <div className={styles.editshiftdiv}>
                <h3>Select Shifts</h3>
                <ShiftEditor adder={handleEdit} params={availEventArray}/>
            </div>
        </div>
    )
}
/*  Idea is to have a blank select option (dropdown list) next to the date picker
    User can select a date, then list will contain all available shifts that day
    Time picker is only here for reference - will be in use in admin page.
    May have two selectors - one for available shifts, one for user's shifts so that they can 
    mark them as needing a sub (making them available) */