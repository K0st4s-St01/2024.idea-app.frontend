"use client";

import Link from "next/link";
import User from "../services/models/User";
import { ChangeEvent, FormEvent, useState } from "react";
import UserService from "../services/UserService";

const LoginForm = () =>{
    
    const [data,setData] = useState<User>({
        username: "",
        password: "",
        email: "",
        comments: [],
        ideas: [],
    });
    const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
        const {name,value} = event.target;
        setData({
            ...data,
            [name]:value,
        })
    }
    const service:UserService = UserService.getInstance();
    const handleSubmit = (event:FormEvent) =>{
        event.preventDefault();
        const log = document.getElementById("log");
        if(!log){
            return;
        }
        service.login(data)
        .then(
            resp => {
                log.innerHTML=resp.result;
                if(!window){
                    return;
                }
                localStorage.setItem("token",resp.token);
                localStorage.setItem("user",data.username);
                if(resp.result == "successful"){
                    window.location.href="/home";
                }
            }
        ).catch(err=> console.log(err))
        
    }
    return(
        <form action="POST" onSubmit={handleSubmit}>
            <pre id="log"></pre>
            <img src="socrates.jpg" alt="" width={"40%"} />
            <div>
                <input onChange={handleChange} type="text" name="username" id="username" placeholder="username" required/>
            </div>
            <div>
                <input onChange={handleChange} type="password" name="password" id="password" placeholder="password" required/>
            </div>
            <div>
                <button type="submit">login</button>
            </div>
            <div>
                <Link href="/register"> register </Link>
            </div>
            
        </form>
    );
}
export default LoginForm;