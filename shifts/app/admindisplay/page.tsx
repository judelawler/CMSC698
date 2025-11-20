import Calendar from '@/app/ui/calendar';
import Loading from '@/app/ui/loading';
import ShiftAdder from '@/app/ui/shiftadder';
import ShiftEditor from '@/app/ui/shifteditor';
import ShiftRemover from '@/app/ui/shiftremover';
import ShiftDeleter from '@/app/ui/shiftdeleter';
import AddUserButton from '@/app/ui/adduserbutton';
import LogOutButton from '@/app/ui/logoutbutton';
import { Suspense } from 'react';
import { fetchShiftsById, getUser, fetchAvailableShifts, addShift, assignShift, deleteShift, getAllUsers } from '@/app/lib/data'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import styles from '../styles/Design.module.css';

export default async function Page() {
    const times = [
        "08:00:00","09:00:00","10:30:00","12:00:00","13:30:00",
        "15:00:00","16:30:00","17:30:00","19:00:00","20:30:00","22:00:00"
    ];

    const userId = (await cookies()).get('userId')?.value?? "";
    console.log(userId);
    const user = await getUser(userId);
    const events = await fetchShiftsById(userId);
    const users = await getAllUsers();
    const availableEvents = await fetchAvailableShifts();
    const availEventArray = Object.values(availableEvents);
    const eventsArray = Object.values(events);
    const usersArray = Object.values(users);
    let assignedEvents=[];
    for(var i of eventsArray){
        if(i.userid != null){
            assignedEvents.push(i);
        }
    }

    async function handleAdd(formData: FormData){
        'use server'
        const date = formData.get('date') as string;
        const startTime = formData.get('starttime') as string;
        const endTime = formData.get('endtime') as string;
    
        if(startTime == "" && endTime == ""){
            for(let i = 0; i<10; i++){
                let otherStart = date + "T" + times[i];
                let otherEnd = date + "T" + times[i+1];

                addShift("UNASSIGNED",otherStart,otherEnd);
            }
        } else {
            const start = date + "T" + startTime + ":00";
            const end = date + "T" + endTime + ":00";
            addShift("UNASSIGNED",start,end);
        }
        redirect('/admindisplay/');
    }

    async function handleEdit(formData: FormData) {
        'use server'
        const chosenShiftId = formData.getAll('shiftselect') as string[];
        const chosenUserId = formData.get('userselect') as string;
        const chosenUser = await getUser(chosenUserId);
        const chosenUserName = chosenUser.name;
        //console.log("Chosen ID is: " + chosenShiftId[0]); for testing the multi-list
        for(var x of chosenShiftId){
            assignShift(x,chosenUserName,chosenUserId);
        }
        redirect('/admindisplay');
    }

    async function handleRemove(formData: FormData) {
        'use server'
        const chosenShiftId = formData.get('shiftselect') as string;
        assignShift(chosenShiftId,"UNASSIGNED","null");
        redirect('/admindisplay/');
    }

    async function handleDelete(formData: FormData) {
        'use server'
        const chosenShiftId = formData.get('shiftselect') as string;
        deleteShift(chosenShiftId);
        redirect('/admindisplay/');
    }

    return (
        <div>
            <h1 className={styles.center}>Shift Calendar Admin Page</h1>
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
                    <ShiftEditor adder={handleEdit} params={availEventArray} users={usersArray} isadmin={true}/>
                </div>
                
                <div className={styles.box}> Editing Shifts </div>

                <div className={styles.removeshiftdiv}>
                    <h3>Unassign Shifts</h3>
                    <p>Select a date, then choose one of the shifts to unassign. </p>
                    <br></br>
                    <ShiftRemover adder={handleRemove} params={assignedEvents} />
                </div>

                <div className={styles.box}> Add User </div>

                <AddUserButton/>

                <div className={styles.box}> Log Out </div>

                <LogOutButton/>
            </div>

            <div className={styles.rightcontainerdiv}>
                <div className={styles.addshiftdiv}>
                    <h3>Add Shifts</h3>
                    <p>Leave both times blank to fill a day with shifts automatically.</p>
                    <ShiftAdder adder={handleAdd}/>
                </div>

                <div className={styles.box}> Adding / Removing Shifts </div>

                <div className={styles.deleteshiftdiv}>
                    <h3>Delete Shifts</h3>
                    <p>Choose a shift to delete. </p>
                    <ShiftDeleter adder={handleDelete} params={eventsArray}/>
                </div>
            </div>
        </div>
    )
}