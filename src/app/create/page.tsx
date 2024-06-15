import IdeaForm from "../components/createIdea";
import Sidebar from "../components/sidebar";

 
const HomePage = () =>{

    return(
        <div className="Home">
            <Sidebar />
            <IdeaForm/>
        </div>
    )
}
export default HomePage;