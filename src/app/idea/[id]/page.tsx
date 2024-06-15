"use client";
import Sidebar from "@/app/components/sidebar";
import IdeaService from "@/app/services/IdeaService";
import Idea from "@/app/services/models/Idea";
import Comment from "@/app/services/models/Comment";
import { FormEvent, useEffect, useState } from "react";
import CommentService from "@/app/services/CommentService";

const HomePage = ({params}:{params:{id:number}}) =>{
    const service:IdeaService = IdeaService.getInstance()
    const commentService:CommentService = CommentService.getInstance();

    const [data,setData] = useState<Idea>();
    const user=localStorage.getItem("user");
    const [visible,setVisible] = useState<boolean>(false);
    const [title_new,setTitle] = useState<string>("");
    const [text_new,setText] = useState<string>("");
    const [result,setResult] = useState<String>("");
    const [comments,setComments] = useState<Comment[]>([])
    const [buttons,setButtons] = useState<JSX.Element[]>([])
    const [page,setPage] = useState<number>(0)
    
    if(!user){
        return;
    }
    const [comment,setComment] = useState<Comment>({
        id:null,
        idea:-1,
        text: "",
        user: user, 
        
    })
    

    useEffect(()=>{
        if(!window){
            return;
        }
        const token=localStorage.getItem("token");
        if(!token){
            return;
        }
        service.read(params.id,token)
        .then(resp => {
            setData(resp.dtos);
        })
        const updateComments = (x:number) =>{
        commentService.readAllByIdea(params.id,x,10,token).then(resp=>{
            setComments(resp.dtos)
            const b:JSX.Element[] = []
            for(let i = 0;i<=resp.pages;i++){
                b.push(<button key={i} onClick={(e) => {setPage(i);updateComments(i);}}>{i+1}</button>)
            }
            setButtons(b)
        })
    }
    updateComments(0)
    },[])
    if(!data){
        return(
        <div className="Home">
            <Sidebar />
            <div className="idea-content">
                Loading...
            </div>
        </div>
        );
    }
    const handleUpdate = (e:FormEvent) => {
        e.preventDefault();
        const data2:Idea={
            id:data.id,
            title:title_new,
            text:text_new,
            comments:data.comments,
            user: data.user
        }
        const token=localStorage.getItem("token");
        if(!token){
            return;
        }
        service.update(data2,token).then(resp=>{
            setResult(resp.result);
        });
        setData(data2)

    }
    const handleComment = (e:FormEvent) => {
        e.preventDefault();
       if(!data.id){
        return;
       }
        const token=localStorage.getItem("token");
        if(!token){
            return;
        }
        comment.idea=data.id;
        console.log(comment)
        commentService.create(comment,token).then(resp=>{
            console.log(resp)
        }).catch(err=>console.log(err))

        const updateComments = (x:number) =>{
            if(data.id)
        commentService.readAllByIdea(params.id,x,10,token).then(resp=>{
            setComments(resp.dtos)
            const b:JSX.Element[] = []
            for(let i = 0;i<=resp.pages;i++){
                b.push(<button key={i} onClick={(e) => {setPage(i);updateComments(i);}}>{i+1}</button>)
            }

            setButtons(b)
        })
    }
    updateComments(0);
    }
    return(
        <div className="Home">
            <Sidebar />
            <div className="idea-content">
                <pre id="log">{result}</pre>
            {user==data.user?(<div>
                <button>Delete</button>
                <button onClick={()=>{setVisible(!visible);}}>Edit</button>
                </div>):<></>}
                <form method="POST" onSubmit={handleUpdate}>
                    <div>
                        <h3>{data.user+"."+data.title}</h3>
                        <div id="hidden1" className={!visible?"hidden":""}>
                            <input type="text" name="title" id="title"  value={title_new} onChange={(e) => {setTitle(e.target.value)}}/>
                        </div>
                    </div>
                    <div>
                        <pre>{data.text}</pre>
                        <div id="hidden2" className={!visible?"hidden":""}>
                            <textarea name="text" id="text" value={text_new} onChange={(e) => {setText(e.target.value)}}></textarea>
                        </div>
                    </div>
                        <div id="hidden3" className={!visible?"hidden":""}>
                        <button type="submit">Change</button>
                        </div>

                </form>
                <div className="comment">
                    <form method="POST" onSubmit={handleComment}>
                        <div>
                            <textarea placeholder="comment" onChange={(e) => {setComment({...comment,text:e.target.value})}} name="comment" id="comment"></textarea>
                        </div>
                        <div>
                            <button type="submit">Publish Comment</button>
                        </div>
                    </form>
                </div>
                <div id="comments">
                    <div>
                        {buttons}
                    </div>
                    <div>
                       {comments.map((item) => (
                        <div>
                            <div>{item.user}</div>
                            <div><pre>{item.text}</pre></div>
                        </div>
                       ))}     
                    </div>
                </div>
            </div>
            
        </div>
    )
}
export default HomePage;