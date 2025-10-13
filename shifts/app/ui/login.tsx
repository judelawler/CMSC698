export default function Login({
    adder
}: {
    adder : (data:FormData) => void
}) {
    return (
        <form action={adder}>
            <p>Username: <input type="text" name="username" /></p>
            <p>Password: <input type="password" name="password" /></p>
            <p><button type="submit">Log in</button></p>
        </form>
    )
}