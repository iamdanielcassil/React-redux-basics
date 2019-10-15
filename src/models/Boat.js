import core from "./core";

export default class Boat {
  constructor(props = {}) {
    this.isNew = props.id === undefined;
    this.id = props.id;
    this.name = props.name;
    this.model = props.model;
    this.maker = props.maker;
    this.length = props.length;
    this.type = props.type;
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
      name: this.name || "",
      captain: this.captain || "",
      maker: this.maker || "",
      model: this.model || "",
      type: this.type || "",
      length: this.length || "",
      year: this.year || "",
      crew: this.crew || [],
      phrf: this.phrf || ""
    };
  }

  update = changes => {
    return core.update(changes, this);
  };

  save = () => {
    if (!this.name || !this.captain) {
      return Promise.reject();
    }

    return core.save(this);
  };

  delete = () => {
    return core.delete(this);
  };
}
