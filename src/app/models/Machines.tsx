import { Machine } from "./Machine";

export class Machines{
    public machines:Machine[];

    constructor(){
        this.machines = [];
    }

    getMachines = () =>{
        return this.machines;
    }

    setMachines = (machines:Machine[]) =>{
        this.machines = machines;
    }

    addMachine = (machines:string[])=>{
        machines.forEach((machine)=>{
            this.machines.push(new Machine(machine))
        })
    } 

    isAvailable = (find:string) =>{
        this.machines.forEach((machine)=>{
            if(find == machine.getId() && machine.getAvailable()){
                return true;
            }
        })
        return false;
    }

    getMachineId = (id:string) => {
       
        for(let e in this.machines){
            if(this.machines[e].getId() == id){
                return this.machines[e]
            }
        }
       
        return null;
    }
    
    toString = () => {
        let output = `Machines: \n[\n`;
        this.machines.forEach((machine) => {
          output += " " + machine.toString() + "\n";
        });
        return output + `]`;
      };
}