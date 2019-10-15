import core from "./core";

export default class Season {
  constructor(props) {
    this.isNew = props.id === undefined;
    this.id = props.id;
    this.name = props.name || "";
    this.startDate = props.startDate || new Date().toISOString().split("T")[0];
    this.endDate = props.endDate;
    this.results = props.results;

    this.apiRoute = `seasons`;
  }

  get() {
    return {
      id: this.id,
      name: this.name,
      startDate: this.startDate,
      endDate: this.endDate || ""
    };
  }

  update = changes => {
    return core.update(changes, this);
  };

  save = () => {
    window.DC.debug.log("savin this: ", this);
    if (!this.startDate || !this.name) return Promise.reject();

    return core.save(this);
  };

  delete = () => {
    return core.delete(this);
  };

  // addRacer(racer) {

  // }

  // editRacer(racer) {

  // }

  // removeRacer(racer) {

  // }

  // raceEntries() {
  //   return actions.entries.getRace(this.id);
  // }
}
