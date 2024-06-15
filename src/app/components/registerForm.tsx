"use client";
import bcrypt from 'bcryptjs'
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import User from "../services/models/User";
import UserService from "../services/UserService";

const RegisterForm = () =>{
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
        const pass = data.password;
        data.password = bcrypt.hashSync(pass, 10);
        service.create(data)
        .then(
            resp => {
                log.innerHTML=resp.result;
            }
        ).catch(err=> console.log(err))
        data.password = pass;
        
    }
    return(
        <form action="POST" onSubmit={handleSubmit}>
            <pre id="log">

            </pre>
            <img src="plato.jpg" alt="" width={"40%"} />
            <div>
                <input onChange={handleChange} value={data.username} type="text" name="username" id="username" placeholder="username" required/>
            </div>
            <div>
                <input onChange={handleChange} value={data.password} type="password" name="password" id="password" placeholder="password" required/>
            </div>
           <div>
                <input onChange={handleChange} value={data.email} type="email" name="email" id="email" placeholder="email" required/>
            </div> 
            <div>
                <button type="submit">register</button>
            </div>
            <div>
                <Link href="/"> log in </Link>
            </div>
            
        </form>
    );
}
export default RegisterForm;