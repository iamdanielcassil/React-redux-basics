import core from "./core";

export default class Race {
  constructor(props) {
    this.isNew = props.id === undefined;
    this.id = props.id;
    this.name = props.name || "";
    this.seasonId = props.seasonId;
    this.startDate = props.startDate || new Date().toISOString().split("T")[0];
    this.startTime = props.startTime ? new Date(props.startTime) : null;
    this.endDate = props.endDate || "";
    this.endTime = props.endTime ? new Date(props.endTime) : null;
    this.temperature = props.temperature || "";
    this.windDirection = props.windDirection || "";
    this.windSpeed = props.windSpeed || "";
    this.courseMap = props.courseMap;
    this.results = props.results || [];
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

  hasOpenEntries = () => {
    return this.entries.length > 0 && this.entries.length > this.results.length;
  };

  isRunning = () => {
    return this.hasStarted() && !this.hasEnded();
  };

  hasStarted = () => {
    return this.startTime !== undefined;
  };

  hasEnded = () => {
    return this.endTime !== undefined;
  };

  start = time => {
    this.startTime = time;
    this.save();
    return this;
  };

  end = time => {
    this.endTime = time;
    this.save();
    return this;
  };

  reset = () => {
    this.startTime = undefined;
    this.endTime = undefined;
    this.results = [];
    this.save();
    return this;
  };

  finishEntry = (entryId, time) => {
    let entry = this.entries.find(e => e.id === entryId);

    if (!entry) {
      console.warn("Unable to finish entry - no entry found for: ", entryId);
    }

    this.results.push({
      ...entry,
      startTime: this.get().startTime,
      endTime: time
    });

    this.save();
    return this;
  };

  get = () => {
    return {
      id: this.id,
      name: this.name,
      startDate: this.startDate,
      startTime: this.startTime ? this.startTime.getTime() : null,
      endDate: this.endDate || "",
      endTime: this.endTime ? this.endTime.getTime() : null,
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
    window.DC.debug.log("savin this: ", this);
    console.trace("save in race");
    if (!this.startDate || !this.name || !this.seasonId) {
      return Promise.reject();
    }

    return core.save(this);
  };

  delete = () => {
    return core.delete(this);
  };

  // raceEntries() {
  //   return actions.entries.getRace(this.id);
  // }
}
