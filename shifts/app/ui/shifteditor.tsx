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
    //console.log(availEvents);     for checking that it is receiving
    let shiftData: { [key: string]: Object }[] = [];
    for(var i of availEvents) {
        let shiftid = i.id;
        let shiftname = i.start.slice(11);
        shiftData.push({ Id: shiftid, Name: shiftname});
    }
    
    console.log(shiftData);
    /* Needs to be done: NEEDS a filter by selected date for available shifts array
    also NEEDS NEEDS NEEDS some CSS work on the dropdown list because it is ugly rn*/
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