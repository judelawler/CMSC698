'use client'

import React, { useEffect, useState} from "react";
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import { Shift, fetchShifts, addShifts } from '@/app/lib/data'
//import { redirect } from 'next/navigation';

type ViewType = "Day" | "Week" | "Month";

export default function Calendar(eventlist: Shift[]) {
    const eventArray = Object.values(eventlist);
    //const [calendar, setCalendar] = useState<DayPilot.Calendar>();
    const [view, setView] = useState<ViewType>("Week");
    type AnyCalendar = DayPilot.Calendar | DayPilot.Month;
    const [startDate, setStartDate] = useState<DayPilot.Date>(DayPilot.Date.today());
    const [events, setEvents] = useState<DayPilot.EventData[]>([]);

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
        ];
    }

    /*useEffect(() => {
        if (!calendar || calendar?.disposed()) {
            return;
        }
        setEvents(eventArray);
        //const events: DayPilot.EventData[] = eventArray;
        // vvv this is old stuff, checking the shift data.
        console.log(events);    //this is to check that the site is receiving the correct data
        console.log(events[0]);
        console.log(events[1]);

        calendar.update({startDate, events});
    }, [calendar]);*/

    useEffect(() => {
        setEvents(eventArray);
    }, []);



    return (
        <div>
            <div className={"navigator"}>
                <DayPilotNavigator
                    selectMode={view}
                    onTimeRangeSelected={args => setStartDate(args.day)}
                    events={events}
                />
            </div>
            <div className={"content"}>
                <DayPilotCalendar
                    viewType={"Week"}
                    startDate={startDate}
                    events={events}
                    visible={view === "Week"}
                    durationBarVisible={false}
                    onBeforeEventRender={onBeforeEventRendersDayWeek}
                />
            </div>
        </div>
    )
}