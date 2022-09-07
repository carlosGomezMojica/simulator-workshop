import { Machine } from "./Machine";
import { Machines } from "./Machines";
import { Task } from "./Task";
import { Work } from "./Work";
import { Works } from "./Works";

export class Simulator {
  public machines: Machines;
  public works: Works;
  public clock = 0;

  constructor() {
    this.machines = new Machines();
    this.works = new Works();
  }

  getMachines = () => {
    return this.machines;
  };

  setMachines = (machines: Machines) => {
    this.machines = machines;
  };

  getWorks = () => {
    return this.works;
  };

  setWorks = (works: Works) => {
    this.works = works;
  };

  getClocks = () => {
    return this.clock;
  };

  setClocks = (clock: number) => {
    this.clock = clock;
  };

  updateClock = () => {
    this.clock += 1;
    this.sleep(1000);
    console.log("tiempo de simulacion: " + this.clock);
  };

  sleep = (milliseconds: number) => {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if (new Date().getTime() - start > milliseconds) {
        break;
      }
    }
  };

  run = () => {
    this.laodMachines();
    this.loadWorks();
    console.log(this.works.toString())
    console.log(this.machines.toString());
    let auxTask0: any;
    let auxTask1: any;
    let lastJob:number = -1;
    while (!this.works.simulationEnd()) {
      let firtsJobInQueue = this.works.findWorkDontEnd();
      
      if (auxTask0 == null) {
        if (firtsJobInQueue?.task.machine.available) {
          firtsJobInQueue.task.machine.setAvailable(false);
          firtsJobInQueue.task.machine.setCurrentWork(
            this.works.works[firtsJobInQueue.workPosition]
          );
          firtsJobInQueue.task.machine.setCountDown(
            firtsJobInQueue.task.count_down
          );
          lastJob = firtsJobInQueue.workPosition
          auxTask0 = firtsJobInQueue.task;
        }
      }
      console.log(firtsJobInQueue?.workPosition + ' ' + this.works.works.length)
      if (firtsJobInQueue != undefined && firtsJobInQueue.workPosition != this.works.works.length-1) {
        if (auxTask1 == null) {
            if (
              !this.works.works[firtsJobInQueue.workPosition + 1].completed && !this.works.works[firtsJobInQueue.workPosition + 1].tasks.tasks[0].completed
              ) {
                if (
                  this.works.works[firtsJobInQueue.workPosition + 1].tasks.tasks[0]
                  .machine.available
                  ) {
                    this.works.works[
                      firtsJobInQueue.workPosition + 1
                    ].tasks.tasks[0].machine.setAvailable(false);
                    this.works.works[
                      firtsJobInQueue.workPosition + 1
              ].tasks.tasks[0].machine.setCountDown(
                this.works.works[firtsJobInQueue.workPosition + 1].tasks
                .tasks[0].count_down
              );
              this.works.works[
                firtsJobInQueue.workPosition + 1
              ].tasks.tasks[0].machine.setCurrentWork(
                this.works.works[firtsJobInQueue.workPosition + 1]
                );
              auxTask1 =
                this.works.works[firtsJobInQueue.workPosition + 1].tasks
                  .tasks[0];
            }
          } else if (
            !this.works.works[firtsJobInQueue.workPosition + 1].completed &&
            !this.works.works[firtsJobInQueue.workPosition + 1].tasks.tasks[1]
              .completed
          ) {
            if (
              this.works.works[firtsJobInQueue.workPosition + 1].tasks.tasks[1]
                .machine.available
            ) {
              
              this.works.works[
                firtsJobInQueue.workPosition + 1
              ].tasks.tasks[1].machine.setAvailable(false);
              this.works.works[
                firtsJobInQueue.workPosition + 1
              ].tasks.tasks[1].machine.setCountDown(
                this.works.works[firtsJobInQueue.workPosition + 1].tasks
                  .tasks[1].count_down
              );
              this.works.works[
                firtsJobInQueue.workPosition + 1
              ].tasks.tasks[1].machine.setCurrentWork(
                this.works.works[firtsJobInQueue.workPosition + 1]
              );
              auxTask1 =
                this.works.works[firtsJobInQueue.workPosition + 1].tasks
                .tasks[1];
              }
            }
          }
      }

      if (auxTask0 != null) {
        auxTask0.setCountDown(auxTask0.count_down - 1);
        auxTask0.machine.setCountDown(auxTask0.count_down);
        if (auxTask0.count_down == 0) {
          auxTask0.setCompleted(true);
          auxTask0.machine.setAvailable(true);
          auxTask0 = null;
          console.log('se termina la tarea ')
        }
      }

      if (auxTask1 != null) {
        auxTask1.setCountDown(auxTask1.count_down - 1);
        auxTask1.machine.setCountDown(auxTask1.count_down);
        if (auxTask1.count_down == 0) {
          auxTask1.setCompleted(true);
          auxTask1.machine.setAvailable(true);
          auxTask1 = null;
          console.log('se termino la tarea en paralelo')
        }
      }

      if(lastJob != -1){
        if(this.works.works[lastJob].tasks.allCompleted()){
          this.works.works[lastJob].setCompleted(true);
        }

        if(this.works.works[lastJob+1].tasks.allCompleted()){
          this.works.works[lastJob+1].setCompleted(true);
        }
      }
      
      console.log(auxTask0?.machine);
      console.log(auxTask1?.machine);
      this.updateClock();

     
    }
  };

  setInMachine = (machine: Machine | null, time: number, work: Work) => {
    if (machine != null) {
      machine.setAvailable(false);
      machine.setCountDown(time);
      machine.setCurrentWork(work);
    }
  };

  loadWorks = () => {
    let works = [
      { A1: 30, A2: 50 },
      { A1: 0, A2: 40 },
      { A1: 20, A2: 70 },
      { A1: 30, A2: 0 },
      { A1: 50, A2: 20 },
    ];

    this.works.addWorks(works, this.getMachines());
  };

  laodMachines = () => {
    this.machines.addMachine(["A1", "A2"]);
  };
}
