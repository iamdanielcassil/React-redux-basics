let currentWorkers = [];

const reducer = (state = { working: false }, action) => {
  let isWorkStarter = action.type.includes("_STARTED") || false;
  let isWorkFinisher = action.type.includes("_FINISHED") || false;

  if (isWorkStarter || isWorkFinisher) {
    let workerKey = action.type
      .replace("_STARTED", "")
      .replace("_FINISHED", "");
    let workerIndex = currentWorkers.findIndex(worker => worker.key);

    // now worker saved
    if (workerIndex === -1) {
      currentWorkers.push({ key: workerKey, started: isWorkStarter });
    } else {
      currentWorkers[workerIndex].started = isWorkStarter;
    }

    return { working: currentWorkers.some(worker => worker.started) };
  }

  return state;
};

const selectWorking = state => state.states.working;

export default {
  name: "states",
  reducer,
  selectWorking
};
