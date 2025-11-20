import Calendar from '@/app/ui/calendar';
import Loading from '@/app/ui/loading';
import ShiftEditor from '@/app/ui/shifteditor';
import ShiftRemover from '@/app/ui/shiftremover';
import LogOutButton from '@/app/ui/logoutbutton';
import { Suspense } from 'react';
import { Shift, fetchShiftsById, getUser, fetchAvailableShifts, assignShift } from '@/app/lib/data'
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
    const eventsArray = Object.values(events);
    let usersArray = [user];
    let usersEvents=[];
    for(var i of eventsArray){
        if(i.userid == userId){
            usersEvents.push(i);
        }
    }
    
    async function handleEdit(formData: FormData) {
        'use server'
        const chosenShiftId = formData.get('shiftselect') as string;
        const userName = user.name;
        assignShift(chosenShiftId,userName,userId);
        redirect('/calendardisplay/');
    }

    async function handleRemove(formData: FormData) {
        'use server'
        const chosenShiftId = formData.get('shiftselect') as string;
        assignShift(chosenShiftId,"UNASSIGNED","null");
        redirect('/calendardisplay/');
    }

    return (
        <div>
            <h1 className={styles.center}>Shift Calendar</h1>
            <Suspense fallback={<Loading/>}>
                <Calendar 
                    {...events}
                />
            </Suspense>
            <div className={styles.leftcontainerdiv}>
                <div className={styles.editshiftdiv}>
                    <h3>Assign Shifts</h3>
                    <p>Select a date, then choose from the available shifts. </p>
                    <br></br>
                    <ShiftEditor adder={handleEdit} params={availEventArray} users={usersArray} isadmin={false}/>
                </div>
                                <div className={styles.box}> Log Out </div>

                <LogOutButton/>
            </div>
            <div className={styles.rightcontainerdiv}>
                <div className={styles.removeshiftdiv}>
                    <h3>Unassign Shifts</h3>
                    <p>Select a date, then choose one of your shifts to unassign. </p>
                    <br></br>
                    <ShiftRemover adder={handleRemove} params={usersEvents} />
                </div>
            </div>
        </div>
    )
}