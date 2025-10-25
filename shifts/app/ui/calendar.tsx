'use client'

import React, { useEffect, useState} from "react";
import {DayPilot, DayPilotCalendar} from "@daypilot/daypilot-lite-react";
import { Shift, fetchShifts, addShifts } from '@/app/lib/data' //maybe can't be in use client file?
//import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


export default function Calendar(eventlist: Shift[]) {
    const eventArray = Object.values(eventlist);
    const [calendar, setCalendar] = useState<DayPilot.Calendar>();
    //const [shifts, setShifts] = useState<DayPilot.EventData[]>([]);
    
    

    const initialConfig: DayPilot.CalendarConfig = {
        viewType: "Week",
        locale: "en-us",
        eventMoveHandling: "Disabled",
        eventResizeHandling: "Disabled",
        eventDeleteHandling: "Disabled",
        timeFormat: "Clock12Hours",
    };

    const [config, setConfig] = useState(initialConfig);

    const onBeforeEventRendersDayWeek = (args: DayPilot.CalendarBeforeEventRenderArgs) => {
        const eventColor = args.data.tags?.color || '#a6cbe9';
        args.data.backColor = eventColor + "dd";
        args.data.borderColor = "darker";
        args.data.html = "";
        const assigned = args.data.tags;
        //const timeRange = args.data.start +""+args.data.end;
        
        if (assigned == 0) {
            args.data.backColor = '#da83ffdd';
            args.data.borderColor = "darker";
            args.data.html = "";
        }
        if (assigned == 1) {
            args.data.backColor = '#92fc6edd';
            args.data.borderColor = "darker";
            args.data.html = "";
        } 


        args.data.areas = [
            {
                id: "text",
                top: 15,
                left: 10,
                right: 10,
                height: 45,
                text: args.data.text,
                fontColor: "#000000",
                style: "font-weight: bold; font-size: 20px; white-space: nowrap; overflow: hidden; text-overflow: clip;"
            },
            /*{
                id: "assigned",
                bottom: 5,
                left: 10,
                right: 5,
                height: 20,
                borderRadius: "4px",
                backColor: DayPilot.ColorUtil.darker(eventColor),
                fontColor: "#000000",
                text: timeRange,
                style: "font-size: 12px; text-align: center; line-height: 16px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
            }*/
        ];
    }

    useEffect(() => {
        if (!calendar || calendar?.disposed()) {
            return;
        }

        

        const events: DayPilot.EventData[] = eventArray;
        // vvv this is old stuff, checking the shift data.
        console.log(events);    //this is to check that the site is receiving the correct data
        console.log(events[0]);
        console.log(events[1]);



        const startDate = "2025-10-01";

        calendar.update({startDate, events});
    }, [calendar]);

/*    const onTimeRangeSelected = async (args: DayPilot.CalendarTimeRangeSelectedArgs) => {
        const modal = await DayPilot.Modal.prompt("Create a new shift:", "Shift 1");
        calendar?.clearSelection();
        if (modal.canceled) {
            return;
        }
        console.log("modal.result", modal.result, calendar);
        const newShift = { // how do I add this to the SQL database?
            text: modal.result,
            start: args.start,
            end: args.end,
        }
        console.log(modal.result);
        console.log(args.start);
        console.log(args.end);
        //addShift(modal.result,args.start,args.end); This will not work
    };*/

    return ( // button is not functional atm
        <div>
            <button onClick={async () => {}}>Test</button>
            <DayPilotCalendar
                {...config}
                controlRef={setCalendar}
                onBeforeEventRender={onBeforeEventRendersDayWeek}
                />
        </div>
    )
}