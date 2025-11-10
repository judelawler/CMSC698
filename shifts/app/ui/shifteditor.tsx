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
    'use client' // I don't know if this one is necessary but it works
    const [date, setDate] = useState("");
    const availEvents = params;
    console.log(availEvents);
    let shiftData: { [key: string]: Object }[] = [];
    let counter = 0;
    for(var i of availEvents) {
        let shiftid = i.id;
        let shiftname = i.start.slice(11);
        shiftData[counter] = { Id: {shiftid}, Name: {shiftname}}
    }
    /* Needs to be done: maybe make shiftData a separate array, then put it all into 
    an array for dataSource at once? Maybe use an if statement to see if it matches the
    selected date? So, also need to work with date string and match it to the start
    date for the shifts*/
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
                <p><button type="submit">Submit</button></p>
            </form>
        )
    }
}