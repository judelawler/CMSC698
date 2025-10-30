'use client'

import React, { useEffect, useState} from "react";
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import { Shift, fetchShifts, addShifts } from '@/app/lib/data'
import { redirect } from 'next/navigation';
import "./calendar.css"
import styles from '../styles/Design.module.css';

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
        heightSpec: "BusinessHours",
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

    /*const editEvent = async (e: DayPilot.Event) => {
        redirect(`/edit/${e.id}`);
    }*/

    useEffect(() => {
        setEvents(eventArray);
        console.log(events[0]);
    }, []);

    return (
        <div className={styles.largerdiv}>
            <div className={styles.navigatordiv}>
                <DayPilotNavigator
                    selectMode={view}
                    onTimeRangeSelected={args => setStartDate(args.day)}
                    events={events}
                />
            </div>
            <div className={styles.calendardiv}>
                <DayPilotCalendar
                    {...config}
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