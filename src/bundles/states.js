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

const doDebugWork = start => ({ dispatch }) => {
  if (start) {
    dispatch({
      type: "FAKE_WORK_STARTED"
    });
  } else {
    dispatch({
      type: "FAKE_WORK_FINISHED"
    });
  }
};

const selectStates = state => state.states;
const selectWorking = state => state.states.working;

export default {
  name: "states",
  reducer,
  doDebugWork,
  selectStates,
  selectWorking
};
