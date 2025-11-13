'use client'
import { useState } from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Shift } from '@/app/lib/data';

export default function ShiftRemover({
    adder,
    params
}: {
    adder : (data:FormData) => void,
    params: Shift[],
}) {
    'use client'
    const [date, setDate] = useState("");
    const userEvents = params;
    let dayUserEvents=[];
    for(var i of userEvents) {
        const startDateCheck = i.start.slice(0, 10);
        let dateCompare = startDateCheck.localeCompare(date);
        if(dateCompare == 0){
            dayUserEvents.push(i);
        }
    }

    let shiftData: { [key: string]: Object }[] = [];
    for(var i of dayUserEvents) {
        let shiftid = i.id;
        let shiftname = i.start.slice(11, 16);
        shiftData.push({ Id: shiftid, Name: shiftname});
    }
    const fieldSettings: object = { text: 'Name', value: 'Id'};

    if(date=="") {
        return(
            <div>
                <input aria-label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
            </div>
        )
    } else{
        return(
            <form action={adder}>
                <DropDownListComponent 
                    id="shiftselect"
                    dataSource={shiftData}
                    fields={fieldSettings}
                    placeholder="Select a shift"
                />
                <p><button type="submit">Unassign Shift</button></p>
            </form>
        )
    }
}