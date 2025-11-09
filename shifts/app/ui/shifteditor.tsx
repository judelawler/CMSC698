import { useState } from 'react';



export default function ShiftEditor({
    adder
}: {
    adder : (data:FormData) => void
}) {
    'use client'
    const [date, setDate] = useState("");
    

    return(
        <div>
            <input aria-label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
        </div>
    )
}