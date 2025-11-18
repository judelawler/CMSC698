'use client'
import { useState, use } from 'react';
import { DropDownListComponent, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { Shift, User } from '@/app/lib/data'

export default function ShiftEditor({
    adder,
    params,
    users,
    isadmin
}: {
    adder : (data:FormData) => void,
    params: Shift[],
    users: User[],
    isadmin: boolean
}) {
    'use client' 
    const [date, setDate] = useState("");
    const availEvents = params;
    const allUsers = users;
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
        let shiftname = i.start.slice(11, 16);
        
        shiftData.push({ Id: shiftid, Name: shiftname});
    }
    const fieldSettings: object = { text: 'Name', value: 'Id'};

    let userData: { [key: string]: Object }[] = [];
    for(var thing of users) {
        let userid = thing.idusers;
        let name = thing.name;

        userData.push({ Id: userid, Name: name});
    }
    const userFieldSettings: object = { text: 'Name', value: 'Id'};

    
    if(date=="") {
        return(
            <div>
                <input aria-label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
            </div>
        )
    } else if(isadmin) {
        return(
            <form action={adder}>
                <DropDownListComponent 
                    id="userselect"
                    dataSource={userData}
                    fields={userFieldSettings}
                    placeholder="Select a user"
                />
                <br></br>
                <MultiSelectComponent 
                    id="shiftselect"
                    dataSource={shiftData}
                    fields={fieldSettings}
                    placeholder="Select a shift"
                />
                <p><button type="submit">Assign Shift</button></p>
            </form>
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
                <p><button type="submit">Take Shift</button></p>
            </form>
        )
    }
}