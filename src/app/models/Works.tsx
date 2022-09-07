import { Machine } from "./Machine";
import { Machines } from "./Machines";
import { Tasks } from "./Tasks";
import { Work } from "./Work";

export class Works {
  public works: Work[];

  constructor() {
    this.works = [];
  }

  getWorks = () => {
    return this.works;
  };

  setWorks = (works: Work[]) => {
    this.works = works;
  };

  addWorks = (
    works: {
      A1: number;
      A2: number;
    }[],
    machines: Machines
  ) => {
    let counter = 1;
    works.forEach((work: any) => {
      let tasks = new Tasks();
      for (let key in work) {
        tasks.addTask(machines.getMachineId(key), work[key]);
      }
      this.works.push(new Work(`W${counter}`, tasks));
      counter++;
    });
  };

  findWorkDontEnd = () => {
    for (let work = 0; work < this.works.length; work++) {
      if (!this.works[work].completed) {
        if (!this.works[work].tasks.tasks[0].completed) {
          return { task: this.works[work].tasks.tasks[0], workPosition: work };
        } else if (!this.works[work].tasks.tasks[1].completed) {
          return { task: this.works[work].tasks.tasks[1], workPosition: work };
        }
      }
    }
  };

  simulationEnd = () => {
    for (let work in this.works) {
      if (!this.works[work].completed) {
        return false;
      }
    }
    return true;
  };

  toString = () => {
    let output = `Works: \n[\n`;
    this.works.forEach((work) => {
      output += " " + work.toString() + "\n";
    });
    return output + `]`;
  };
}
