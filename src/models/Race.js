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

    this.apiRoute = `seasons/${this.seasonId}/races`;
  }

  get() {
    return {
      id: this.id,
      name: this.name,
      startDate: this.startDate,
      endDate: this.endDate || "",
      seasonId: this.seasonId,
      temperature: this.temperature,
      windSpeed: this.windSpeed,
      windDirection: this.windDirection
    };
  }

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
