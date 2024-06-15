import User from "./models/User";

export default class UserService{
    private static instance:UserService;

    public static getInstance(){
        if(!this.instance){
            this.instance = new UserService();
            return this.instance;
        }else{
            return this.instance;
        }
    }
    public async login(dto:User){
        const resp = await await fetch(process.env.NEXT_PUBLIC_API+"/user/login",
            {   
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(dto)
            }
        )
        return await resp.json();
    }
    public async create(dto:User){
        const resp = await fetch(process.env.NEXT_PUBLIC_API+"/user",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(dto)
            }
        )
        console.log(resp);
        return await resp.json();
    }
    public async read(id:number,token:string){
        const resp = await fetch(process.env.NEXT_PUBLIC_API+"/user/"+id,
            {
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+token
                }
            }
        )
        return await resp.json();
    }
    public async readAll(page:number,size:number,token:string){
        const resp = await fetch(process.env.NEXT_PUBLIC_API+"/user/"+page+"/"+size,
            {
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+token
                }
            }
        )
        return await resp.json();
    }
    public async update(dto:User,token:string){
        const resp = await fetch(process.env.NEXT_PUBLIC_API+"/user",
            {
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+token
                },
                body:JSON.stringify(dto)
            }
        )
        return await resp.json();
    }
    public async delete(id:number,token:string){
        const resp = await fetch(process.env.NEXT_PUBLIC_API+"/user/"+id,
            {
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+token
                }
            }
        )
        return await resp.json();
    }
    
}