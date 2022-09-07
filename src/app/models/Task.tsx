import { Machine } from "./Machine";

export class Task {
  public machine: Machine;
  public task_time: number;
  public count_down: number;
  public completed: boolean;

  constructor(machine: Machine, task_time: number) {
    this.machine = machine;
    this.task_time = task_time;
    this.count_down = task_time;
    this.completed = task_time == 0;
  }

  getMachine = () => {
    return this.machine;
  };

  setMachine = (machine: Machine) => {
    this.machine = machine;
  };

  getTaskTime = () => {
    return this.task_time;
  };

  setTaskTIme = (task_time: number) => {
    this.task_time = task_time;
  };

  getCountDown = () => {
    return this.count_down;
  };

  setCountDown = (count_down: number) => {
    this.count_down = count_down;
  };

  getCompleted = () => {
    return this.completed;
  }

  setCompleted = (completed:boolean) => {
    this.completed = completed;
  }

  toString = () => {
    return `Task: ${this.machine},
    Time: ${this.task_time},
    Count down: ${this.count_down},
    Complete: ${this.completed}`
  }
}
