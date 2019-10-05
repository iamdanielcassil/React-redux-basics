import core from "./core";

export default class Boat {
  constructor(props) {
    this.isNew = props.id === undefined;
    this.id = props.id;
    this.name = props.name;
    this.type = props.type;
    this.length = props.length;
    this.year = props.year;
    this.captain = props.captain;
    this.crew = props.crew || [];
    this.phrf = props.phrf;

    this.seasonRankings = props.seasonRankings || {};
    this.lastRace = props.lastRace || {};

    this.apiRoute = `boats`;
  }

  get() {
    return {
      id: this.id,
      name: this.name,
      captain: this.captain,
      type: this.type || "",
      length: this.length || "",
      year: this.year || "",
      crew: this.crew || [],
      phrf: this.phrf || ""
    };
  }

  save = () => {
    if (!this.name || !this.captain) {
      return Promise.reject();
    }

    return core.save(this);
  };
}
