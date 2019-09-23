import data from "../data";

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

  update = data => {
    console.log(data);
    Object.keys(data).forEach(key => {
      if (this.hasOwnProperty(key)) {
        this[key] = data[key];
      } else {
        console.warn(`Tried to update non own property {${key}}`);
      }
    });
    console.log("Race this is: ", this);
    return this;
  };

  save = () => {
    console.log("savin this: ", this);
    if (!this.startDate || !this.name || !this.seasonId)
      return Promise.reject();

    let race = this.get();

    if (this.isNew) {
      // save new race
      race.id = new Date().getTime();
    }
    return data
      .getCollectionQuery(`seasons/${this.seasonId}/races`)
      .then(collection => {
        let doc = collection.doc(race.id.toString());

        console.log("doc", doc);
        console.log("collection", collection);
        window.xcc = collection;
        doc.set(race);
        // window.history.back();
        return race;
      });
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
