import core from "./core";

export default class Race {
  constructor(props) {
    this.isNew = props.id === undefined;
    this.id = props.id;
    this.name = props.name || "";
    this.seasonId = props.seasonId;
    this.startDate = props.startDate || new Date().toISOString().split("T")[0];
    this.endDate = props.endDate || "";
    this.temperature = props.temperature || "";
    this.windDirection = props.windDirection || "";
    this.windSpeed = props.windSpeed || "";
    this.courseMap = props.courseMap;
    this.results = props.results;
    this.entries = props.entries || [];

    this.apiRoute = `seasons/${this.seasonId}/races`;
  }

  addEntry = entry => {
    if (this.entries.some(e => e.id === entry.id)) {
      return;
    }

    this.entries.push(entry);
  };

  removeEntry = id => {
    let index = this.entries.findIndex(e => e.id === id);

    this.entries.splice(index, 1);
  };

  get = () => {
    return {
      id: this.id,
      name: this.name,
      startDate: this.startDate,
      endDate: this.endDate || "",
      seasonId: this.seasonId,
      temperature: this.temperature,
      windSpeed: this.windSpeed,
      windDirection: this.windDirection,
      entries: this.entries,
      results: this.results
    };
  };

  update = changes => {
    return core.update(changes, this);
  };

  save = () => {
    console.log("savin this: ", this);
    if (!this.startDate || !this.name || !this.seasonId) {
      return Promise.reject();
    }

    return core.save(this);
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
