export default function UserAdder({
    adder
}: {
    adder : (data:FormData) => void
}) {
    return(
        <form action={adder}>
            <p>Username: <input type="text" name="username" /></p>
            <p>Password: <input type="password" name="password" /></p>
            <p>Name: <input type="text" name="name" /></p>
            <p>Email: <input type="text" name="email" /></p>
            <p>Admin: <input type="checkbox" name="isadmin" /></p>
            <p><button type="submit">Submit</button></p>
        </form>
    )
}