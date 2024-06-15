"use client";
import { FormEvent, useEffect, useState } from "react"
import Idea from "../services/models/Idea"
import IdeaService from "../services/IdeaService"
import Link from "next/link";

const ViewIdeas = () => {
    const [data,setData] = useState<Idea[]>([]);
    const [page,setPage] = useState<number>(0);
    const [buttons,setButtons]=useState<JSX.Element[]>([])
    const service:IdeaService = IdeaService.getInstance();
    const [title,setTitle] = useState<string>("")
    const view = (e:FormEvent)=>{
        e.preventDefault();
        if(!window){
            return;
        }
        const token = localStorage.getItem("token");
        if(!token){
            return;
        }

        const currentButtons:JSX.Element[] = []
        service.readAllByTitle(title,page,10,token)
        .then(resp => 
            {
                setData(resp.dtos);
                setButtons([])
                for(let i=0;i<=resp.pages;i++){
                    currentButtons.push(
                        <button key={i} onClick={()=>{setPage(i);}}>{i+1}</button>
                    )
                }
                setButtons(currentButtons)
            }
        )

    }

    return (
        <div className="idea-content">
            <div id="pages">
                {buttons}
            </div> 
            <div>
            <div>
                <form method="post" onSubmit={view}>
                    <input type="text" placeholder="search by idea title" onChange={(e) => setTitle(e.target.value)} />
                    <button type="submit">search</button>
                </form>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Owner</th>
                </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr>
                            <td>
                                <Link href={"/idea/"+item.id}>{item.title}</Link>
                            </td>
                            <td> {item.user} </td>    
                        </tr>
                    )
                        
                        )}
                </tbody>
            </table>
            </div>
        </div>
    )
}
export default ViewIdeas;