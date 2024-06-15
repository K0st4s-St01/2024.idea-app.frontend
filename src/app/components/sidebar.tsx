import Link from "next/link"

const Sidebar = () => {
    return(
        <div className="Sidebar">
            <img src="aristotle.jpeg" alt="" width="195vw"/>
            <div>
                <Link href="/home"> Home </Link>
            </div>
            <div>
                <Link href="/create"> Idea++ </Link>
            </div>
            <div>
                <Link href="/search"> Search </Link>
            </div>
            <div>
                <Link href="/about"> About </Link>
            </div>
            
        </div>
    )
}
export default Sidebar;