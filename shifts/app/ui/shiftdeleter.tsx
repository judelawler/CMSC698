'use client'
import { useState } from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Shift } from '@/app/lib/data'

export default function ShiftDeleter({
    adder,
    params
}: {
    adder : (data:FormData) => void,
    params: Shift[],
}) {
    'use client'
    const [date, setDate] = useState("");
    const events = params;
    let dayEvents=[];
    for(var i of events) {
        const startDateCheck = i.start.slice(0, 10);
        let dateCompare = startDateCheck.localeCompare(date);
        if(dateCompare == 0) {
            dayEvents.push(i);
        }
    }

    let shiftData: { [key: string]: Object }[] = [];
    for(var i of dayEvents) {
        let shiftid = i.id;
        let shiftname = i.start.slice(11, 16);
        shiftData.push({ Id: shiftid, Name: shiftname });
    }
    const fieldSettings: object = { text: 'Name', value: 'Id' };

    if(date==""){
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
                <p><button type="submit">Delete Shift</button></p>
            </form>
        )
    }
}