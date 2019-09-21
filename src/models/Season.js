import data from "../data";

export default class Season {
  constructor(props) {
    this.isNew = props.id === undefined;
    this.id = props.id;
    this.name = props.name || "";
    this.startDate = props.startDate || new Date().toISOString().split("T")[0];
    this.endDate = props.endDate;
    this.results = props.results;
  }

  get() {
    return {
      id: this.id,
      name: this.name,
      startDate: this.startDate,
      endDate: this.endDate || ""
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
    return this;
  };

  save = () => {
    console.log("savin this: ", this);
    if (!this.startDate || !this.name) return Promise.reject();

    let season = {
      id: this.id,
      name: this.name,
      startDate: this.startDate,
      endDate: this.endDate || ""
    };

    if (this.isNew) {
      // save new race
      season.id = new Date().getTime();
    }
    return data.getCollectionQuery(`seasons`).then(collection => {
      let doc = collection.doc(season.id.toString());

      console.log("doc", doc);
      console.log("collection", collection);
      window.xcc = collection;
      doc.set(season);
      return season;
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
