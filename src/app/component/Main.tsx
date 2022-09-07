import { useEffect, useState } from "react";
import { Work } from "../models/Work";
import { Simulator } from "./../models/Simulator";

export const Main = () => {
  const [simulator] = useState<Simulator>(new Simulator());
  const [clock, setClock] = useState<number>(0);
  const [workArray, setWorkArray] = useState<Work[]>(simulator.works.works);

  const run = () => {
    simulator.laodMachines();
    simulator.loadWorks();
    console.log(simulator.works.toString());
    console.log(simulator.machines.toString());
    let auxTask0: any;
    let auxTask1: any;
    let lastJob: number = -1;
    while (!simulator.works.simulationEnd()) {
      let firtsJobInQueue = simulator.works.findWorkDontEnd();

      if (auxTask0 == null) {
        if (firtsJobInQueue?.task.machine.available) {
          firtsJobInQueue.task.machine.setAvailable(false);
          firtsJobInQueue.task.machine.setCurrentWork(
            simulator.works.works[firtsJobInQueue.workPosition]
          );
          firtsJobInQueue.task.machine.setCountDown(
            firtsJobInQueue.task.count_down
          );
          lastJob = firtsJobInQueue.workPosition;
          auxTask0 = firtsJobInQueue.task;
        }
      }
      if (
        firtsJobInQueue != undefined &&
        firtsJobInQueue.workPosition != simulator.works.works.length - 1
      ) {
        if (auxTask1 == null) {
          if (
            !simulator.works.works[firtsJobInQueue.workPosition + 1]
              .completed &&
            !simulator.works.works[firtsJobInQueue.workPosition + 1].tasks
              .tasks[0].completed
          ) {
            if (
              simulator.works.works[firtsJobInQueue.workPosition + 1].tasks
                .tasks[0].machine.available
            ) {
              simulator.works.works[
                firtsJobInQueue.workPosition + 1
              ].tasks.tasks[0].machine.setAvailable(false);
              simulator.works.works[
                firtsJobInQueue.workPosition + 1
              ].tasks.tasks[0].machine.setCountDown(
                simulator.works.works[firtsJobInQueue.workPosition + 1].tasks
                  .tasks[0].count_down
              );
              simulator.works.works[
                firtsJobInQueue.workPosition + 1
              ].tasks.tasks[0].machine.setCurrentWork(
                simulator.works.works[firtsJobInQueue.workPosition + 1]
              );
              auxTask1 =
                simulator.works.works[firtsJobInQueue.workPosition + 1].tasks
                  .tasks[0];
            }
          } else if (
            !simulator.works.works[firtsJobInQueue.workPosition + 1]
              .completed &&
            !simulator.works.works[firtsJobInQueue.workPosition + 1].tasks
              .tasks[1].completed
          ) {
            if (
              simulator.works.works[firtsJobInQueue.workPosition + 1].tasks
                .tasks[1].machine.available
            ) {
              simulator.works.works[
                firtsJobInQueue.workPosition + 1
              ].tasks.tasks[1].machine.setAvailable(false);
              simulator.works.works[
                firtsJobInQueue.workPosition + 1
              ].tasks.tasks[1].machine.setCountDown(
                simulator.works.works[firtsJobInQueue.workPosition + 1].tasks
                  .tasks[1].count_down
              );
              simulator.works.works[
                firtsJobInQueue.workPosition + 1
              ].tasks.tasks[1].machine.setCurrentWork(
                simulator.works.works[firtsJobInQueue.workPosition + 1]
              );
              auxTask1 =
                simulator.works.works[firtsJobInQueue.workPosition + 1].tasks
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
          console.log("se termina la tarea ");
        }
      }

      if (auxTask1 != null) {
        auxTask1.setCountDown(auxTask1.count_down - 1);
        auxTask1.machine.setCountDown(auxTask1.count_down);
        if (auxTask1.count_down == 0) {
          auxTask1.setCompleted(true);
          auxTask1.machine.setAvailable(true);
          auxTask1 = null;
          console.log("se termino la tarea en paralelo");
        }
      }

      if (lastJob != -1) {
        if (simulator.works.works[lastJob].tasks.allCompleted()) {
          simulator.works.works[lastJob].setCompleted(true);
        }

        if (simulator.works.works[lastJob + 1].tasks.allCompleted()) {
          simulator.works.works[lastJob + 1].setCompleted(true);
        }
      }

      console.log(auxTask0?.machine);
      console.log(auxTask1?.machine);
      simulator.updateClock();
      updateClock(simulator.clock);
    }
  };

  const updateClock = (time: number) => {
    setClock(time);
  };

  useEffect(()=>{
    updateClock(simulator.clock)
  })

  return (
    <body className="container-fluid">
      <header>
        <h1 className="mt-2 mb-2">WorkShop</h1>
        <button
          type="button"
          className="btn btn-primary mt-3"
          id="liveToastBtn"
          onClick={run}
        >
          Iniciar Simualción
        </button>
      </header>
      <main>
        <div className="row mt-5 d-flex align-content-between">
          <div className="col align-self-center">
            <div className="card card-border-dark">
              <div className="card-header">
                <h3>Trabajos por Hacer</h3>
                <i className="fa-solid fa-clipboard-list fa-2x mb-2 mt-2"></i>
              </div>
              <div className="card-body">
                <table className="table table-striped table-hover table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Task</th>
                      <th scope="col">Completed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workArray.map((myWork) => (
                      <tr>
                        <th scope="row">{myWork.getId()}</th>
                        <td>{}</td>
                        <td>{} min</td>
                        <td>False</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col align-self-center mt-2">
            <div className="card">
              <div className="card-header">
                <h3>Máquina 1</h3>
                <i className="fa-solid fa-cash-register fa-2x mb-2 mt-2"></i>
              </div>
              <div className="card-body">
                <div className="machine-work">
                  <span></span>
                </div>
              </div>
            </div>
          </div>
          <div className="col align-self-center mt-2">
            <div className="card">
              <div className="card-header">
                <h3>Máquina 2</h3>
                <i className="fa-solid fa-cash-register fa-2x mb-2 mt-2"></i>
              </div>
              <div className="card-body">
                <div className="machine-work">
                  <span></span>
                </div>
              </div>
            </div>
          </div>
          <div className="col align-self-end mt-2">
            <div className="card">
              <div className="card-header">
                <h3>Trabajos Terminados</h3>
                <i className="fa-solid fa-clipboard-check fa-2x mb-2 mt-2"></i>
              </div>
              <div className="card-body">
                <table className="table table-striped table-hover table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Name</th>
                      <th scope="col">Completed</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">W1</th>
                      <td>30 min</td>
                      <td>True</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="position-relative">
        <div>Tiempo: {simulator.clock}</div>
      </footer>
    </body>
  );
};
