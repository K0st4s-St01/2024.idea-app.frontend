import Sidebar from "../components/sidebar";
import ViewIdeasByTitle from "../components/viewIdeasByTitle";

 
const HomePage = () =>{

    return(
        <div className="Home">
            <Sidebar />
            <ViewIdeasByTitle/>
        </div>
    )
}
export default HomePage;