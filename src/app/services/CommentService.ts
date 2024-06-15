import Comment from "./models/Comment";
export default class CommentService{
    private static instance:CommentService;

    public static getInstance(){
        if(!this.instance){
            this.instance = new CommentService();
            return this.instance;
        }else{
            return this.instance;
        }
    }
    public async create(dto:Comment,token:string){
        const resp = await fetch(process.env.NEXT_PUBLIC_API+"/comment",
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
        const resp = await fetch(process.env.NEXT_PUBLIC_API+"/comment/"+id,
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
        const resp = await fetch(process.env.NEXT_PUBLIC_API+"/comment/"+page+"/"+size,
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
    public async readAllByIdea(idea:number,page:number,size:number,token:string){
        const resp = await fetch(process.env.NEXT_PUBLIC_API+"/comment/idea/"+idea+"/"+page+"/"+size,
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
    public async update(dto:Comment,token:string){
        const resp = await fetch(process.env.NEXT_PUBLIC_API+"/comment",
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
        const resp = await fetch(process.env.NEXT_PUBLIC_API+"/comment/"+id,
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