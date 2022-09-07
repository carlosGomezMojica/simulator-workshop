import { Machine } from "./Machine";
import { Task } from "./Task";

export class Tasks {
  public tasks: Task[];

  constructor() {
    this.tasks = [];
  }


  getTasks = () => {
    return this.tasks;
  };

  setTasks = (tasks: Task[]) => {
    this.tasks= tasks;
  };

  addTask = (machine:Machine|null,time:number) =>{
    machine != null ? this.tasks.push(new Task(machine,time)):console.log('valor null');
  }

  findTaskDontEnd = () => {
    for (const key in this.tasks) {
      if(!this.tasks[key].completed){
        return this.tasks[key];
      }
    }
  }

  allCompleted = () => {
    for(let key in this.tasks){
      if(!this.tasks[key].completed){
        return false;
      }
    }
    return true;
  }
 
  toString = () => {
    let output = `Tasks: \n[\n`
    this.tasks.forEach((task)=>{
      output += ' ' +task.toString()+ '\n';
    })
    return output +`]`;
  };
}
