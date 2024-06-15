import Idea from "./models/Idea";

export default class IdeaService{
    private static instance:IdeaService;

    public static getInstance(){
        if(!this.instance){
            this.instance = new IdeaService();
            return this.instance;
        }else{
            return this.instance;
        }
    }
    public async create(dto:Idea,token:string){
        const resp = await fetch(process.env.NEXT_PUBLIC_API+"/idea",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+token
                },
                body:JSON.stringify(dto)
            }
        )
        return await resp.json();
    }
    public async read(id:number,token:string){
        const resp = await fetch(process.env.NEXT_PUBLIC_API+"/idea/"+id,
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
        const resp = await fetch(process.env.NEXT_PUBLIC_API+"/idea/"+page+"/"+size,
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
    public async readAllByTitle(title:string,page:number,size:number,token:string){
        const resp = await fetch(process.env.NEXT_PUBLIC_API+"/idea/title/"+title+"/"+page+"/"+size,
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
    public async update(dto:Idea,token:string){
        const resp = await fetch(process.env.NEXT_PUBLIC_API+"/idea",
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
        const resp = await fetch(process.env.NEXT_PUBLIC_API+"/idea/"+id,
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