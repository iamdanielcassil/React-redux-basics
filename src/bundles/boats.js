import Boat from "../models/Boat";
import data from "../data";

const reducer = (state = { all: [], current: [] }, action) => {
  return state;
};

const doSelectBoat = boatId => ({ dispatch, doUpdateUrl }) => {
  doUpdateUrl({ query: { boatId: window.encodeURI(boatId) } });
}

const doGoToSelectBoat = boatId => ({ dispatch, store }) => {
  console.log(boatId, store)
  store.doReplaceUrl({ pathname: '/', hash: '/', query: { ...store.selectQueryObject(), boatId: window.encodeURI(boatId) }});
}

const selectCurrentBoat = state => state.boats.current;
const selectBoats = state => state.boats.all;

export default {
  name: "boats",
  reducer,
  selectCurrentBoat,
  selectBoats,
  doGoToSelectBoat,
  doSelectBoat
};
