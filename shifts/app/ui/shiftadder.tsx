export default function ShiftAdder({
    adder
}: {
    adder : (data:FormData) => void
}) {
    return (
        <form action={adder}>
            <p>Date: <input aria-label="Date" type="date" name="date"/></p>
            <p>Start Time: <input aria-label="Time" type="time" name="starttime"/></p>
            <p>End Time: <input aria-label="Time" type="time" name="endtime"/></p>
            <p><button type="submit">Submit</button></p>
        </form>
    )
}