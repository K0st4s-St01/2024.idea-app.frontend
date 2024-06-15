"use client"

import { ChangeEvent, FormEvent, useState } from "react";
import Idea from "../services/models/Idea";
import IdeaService from "../services/IdeaService";


const IdeaForm = () => {
    if(!window){
        return;
    }
    const user = localStorage.getItem("user");
    if(!user){
        return;
    }
    const [data,setData] = useState<Idea>({
        title:"",
        text:"",
        id: null,
        user:user,
        comments: []

    })
    const handleChange = (e : ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>{
        const {name,value} = e.target;
        setData({
            ...data,
            [name]:value
        })
    }
    const service:IdeaService = IdeaService.getInstance();
    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if(!token){
            return
        }
        service.create(data,token).then(
            resp => {
                const log = document.getElementById("log");
                if(!log){
                    return;
                }
                console.log(resp)
                log.innerHTML = resp.result;
        }
        )
        .catch(err => console.log(err))
    }
    return(
        <div className="idea-content" onSubmit={handleSubmit}>
            <form action="" method="post" className="idea-form">
                <div>
                    <input onChange={handleChange} 
                    type="text" name="title" id="title" value={data.title}
                    placeholder="title"/>
                    <pre id="log"></pre>
                </div>
                <div>
                    <textarea onChange={handleChange}
                    name="text" id="text" value={data.text}
                    placeholder="text"
                    >

                    </textarea>
                </div>
                <div>
                    <button type="submit">Submit Idea</button>
                </div>
            </form>
        </div>
    )
}
export default IdeaForm;