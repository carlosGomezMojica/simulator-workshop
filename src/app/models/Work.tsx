import { Tasks } from "./Tasks";

export class Work {
    public id: string;
    public tasks: Tasks;
    public completed: boolean;
  
    constructor(id: string, task: Tasks) {
      this.id = id;
      this.tasks = task;
      this.completed = false;
    }
  
    getId = () => {
      return this.id;
    };
  
    setId = (id:string) => {
      this.id = id;
    };
  
    getTasks = () => {
      return this.tasks;
    };
  
    setTasks = (task: Tasks) => {
      this.tasks = task;
    };
  
  
    getCompleted = () => {
      return this.completed;
    }
  
    setCompleted = (completed:boolean) => {
      this.completed = completed;
    }
  
    toString = () => {
      return `Work: ${this.id}\n
      ${this.tasks.toString()}\n
      Complete: ${this.completed}`
    }
  }
  