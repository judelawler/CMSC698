import Calendar from '@/app/ui/calendar';
import Loading from '@/app/ui/loading';
import ShiftAdder from '@/app/ui/shiftadder';
import ShiftEditor from '@/app/ui/shifteditor';
import { Suspense } from 'react';
import { fetchShiftsById, fetchAvailableShifts, addShift } from '@/app/lib/data'
import { cookies } from 'next/headers';
import { useRouter, redirect } from 'next/navigation';
import styles from '../styles/Design.module.css';

export default async function Page() {

    const times = [
        "08:00:00","09:00:00","10:30:00","12:00:00","13:30:00",
        "15:00:00","16:30:00","17:30:00","19:00:00","20:30:00","22:00:00"
    ];

    const userId = (await cookies()).get('userId')?.value?? "";
    console.log(userId);
    const events = await fetchShiftsById(userId);
    const availableEvents = await fetchAvailableShifts();
    const availEventArray = Object.values(availableEvents);
    
    

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
    }


    return (
        <div>
            <h1>ADMIN PAGE</h1>
            <Suspense fallback={<Loading/>}>
                <Calendar 
                    {...events}
                />
            </Suspense>
            <div className={styles.editshiftdiv}>
                <h3>Select Shifts</h3>
                
                <ShiftEditor adder={handleEdit} params={availEventArray}/>
            </div>
            <div className={styles.addshiftdiv}>
                <h3>Add Shifts</h3>
                <p>Leave both times blank to fill a day with shifts automatically.</p>
                <br></br>
                <ShiftAdder adder={handleAdd}/>
            </div>
        </div>
    )
}