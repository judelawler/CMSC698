'use client'
import { useState, use } from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Shift } from '@/app/lib/data'

export default function ShiftEditor({
    adder,
    params
}: {
    adder : (data:FormData) => void,
    params: Shift[],
}) {
    'use client' 
    const [date, setDate] = useState("");
    const availEvents = params;
    let dayAvailEvents=[];
    for(var i of availEvents) {
        const startDateCheck = i.start.slice(0, 10);
        let dateCompare = startDateCheck.localeCompare(date);
        if(dateCompare == 0){
            dayAvailEvents.push(i);
        }
    }

    let shiftData: { [key: string]: Object }[] = [];
    for(var i of dayAvailEvents) {
        let shiftid = i.id;
        let shiftname = i.start.slice(11);
        shiftData.push({ Id: shiftid, Name: shiftname});
    }
    
    const fieldSettings: object = { text: 'Name', value: 'Id'};
    /* 
    NEEDS NEEDS NEEDS CSS ON THE DROPDOWN 
    */

    
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
                <p><button type="submit">Submit</button></p>
            </form>
        )
    }
}