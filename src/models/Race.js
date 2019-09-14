import data from "../data";

export default class Race {
  constructor(props) {
    this.isNew = props.id === undefined;
    this.id = props.id;
    this.name = props.name;
    this.seasonId = props.seasonId;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.conditions = props.conditions;
    this.courseMap = props.courseMap;
    this.results = props.results;
  }

  save = () => {
    console.log("savin this: ", this);
    if (!this.id || !this.name) return Promise.reject();

    let race = {
      id: this.id,
      name: this.name,
      startDate: this.startDate || "",
      endDate: this.endDate || "",
      seasonId: this.seasonId
    };

    // if (this.id) season.id = this.id;
    // if (this.name) season.name = this.name;

    data.userScopedQuery(`seasons/${this.seasonId}/races`, this.id).set(race);
    // actions.races.set(race);
    return Promise.resolve(race);
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
