'use client'

import React, { useEffect, useState} from "react";
import {DayPilot, DayPilotCalendar} from "@daypilot/daypilot-lite-react";
import { Shift, fetchShifts } from '@/app/lib/data' //maybe can't be in use client file?

export default function Calendar(eventlist: Shift[]) {
    const [shiftslist, setShiftslist] = useState([]);


    const colors = [
        {name: "Green", id: "#6aa84f"},
        {name: "Blue", id: "#3d85c6"},
        {name: "Turquoise", id: "#00aba9"},
        {name: "Light Blue", id: "#56c5ff"},
        {name: "Yellow", id: "#f1c232"},
        {name: "Orange", id: "#e69138"},
        {name: "Red", id: "#cc4125"},
        {name: "Light Red", id: "#ff0000"},
        {name: "Purple", id: "#af8ee5"},
        {name: "Light Grey", id: "#D3D3D3"}
    ];


    const [calendar, setCalendar] = useState<DayPilot.Calendar>();
    
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
        const eventColor = args.data.tags?.color || '#af8ee5';
        args.data.backColor = eventColor + "dd";
        args.data.borderColor = "darker";
        args.data.html = "";
        const assigned = args.data.tags?.assigned || "Unassigned";

        if (assigned == 0) {
            //This is where I can define shifts that need assignments
        }   // I could also make something similar with the user id?

        args.data.areas = [
            {
                id: "text",
                top: 5,
                left: 10,
                right: 50,
                height: 20,
                text: args.data.text,
                fontColor: "#000000",
                style: "font-weight: bold; font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
            },
            {
                id: "assigned",
                bottom: 5,
                left: 10,
                right: 5,
                height: 20,
                borderRadius: "4px",
                backColor: DayPilot.ColorUtil.darker(eventColor),
                fontColor: "#000000",
                text: assigned,
                style: "font-size: 12px; text-align: center; line-height: 16px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
            }
        ];
    }

    useEffect(() => {
        if (!calendar || calendar?.disposed()) {
            return;
        }
        
        


        const eventArray = Object.values(eventlist);



        const events: DayPilot.EventData[] = eventArray;

        console.log(events);    //this is to check that the site is receiving the correct data
        console.log(events[0]);

        const startDate = "2025-10-01";

        

        calendar.update({startDate, events});
    }, [calendar]);

    return (
        <div>
            <DayPilotCalendar
                {...config}
                controlRef={setCalendar}
                onBeforeEventRender={onBeforeEventRendersDayWeek}
                />
        </div>
    )
}