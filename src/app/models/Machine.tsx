
export class Machine{
    
    public id:string;
    public available:boolean;
    public current_work:any;
    public count_down:number;

    constructor(id:string){
        this.id = id;
        this.available = true;
        this.current_work = null;
        this.count_down = 0
    }

    getId = () =>{
        return this.id;
    }

    getAvailable = () =>{
        return this.available;
    }
    getCurrentWork = () =>{
        return this.current_work;
    }
    getCountDown = () =>{
        return this.count_down;
    }

    setId = (id:string) =>{
        this.id = id
    }

    setAvailable = (available:boolean) =>{
        this.available = available;
    }
    setCurrentWork = (current_work:any) =>{
        this.current_work = current_work
    }
    setCountDown = (count_down:number) =>{
        this.count_down = count_down;
    }

    toString = () =>{
        return `machine: ${this.id},
        available: ${this.available},
        current work: ${this.current_work},
        count down: ${this.current_work}`
    }
}