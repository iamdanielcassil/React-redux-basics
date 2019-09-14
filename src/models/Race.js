import data from "../data";

export default class Race {
  constructor(props) {
    this.isNew = props.id === undefined;
    this.id = props.id;
    this.name = props.name || "";
    this.seasonId = props.seasonId;
    this.startDate = props.startDate || new Date().toISOString().split("T")[0];
    this.endDate = props.endDate;
    this.conditions = props.conditions;
    this.courseMap = props.courseMap;
    this.results = props.results;
  }

  get() {
    return {
      id: this.id,
      name: this.name,
      startDate: this.startDate,
      endDate: this.endDate || "",
      seasonId: this.seasonId
    };
  }

  update = data => {
    Object.keys(data).forEach(key => {
      if (this.hasOwnProperty(key)) {
        this[key] = data[key];
      } else {
        console.warn(`Tried to update non own property {${key}}`);
      }
    });

    return this;
  };

  save = () => {
    console.log("savin this: ", this);
    if (!this.startDate || !this.name || !this.seasonId)
      return Promise.reject();

    let race = {
      id: this.id,
      name: this.name,
      startDate: this.startDate,
      endDate: this.endDate || "",
      seasonId: this.seasonId
    };

    if (this.isNew) {
      // save new race
      race.id = new Date().getTime();
    }
    let collection = data.getCollectionQuery(`seasons/${this.seasonId}/races`);
    let doc = collection.doc(race.id.toString());

    console.log("doc", doc);
    console.log("collection", collection);
    window.xcc = collection;
    doc.set(race);
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
