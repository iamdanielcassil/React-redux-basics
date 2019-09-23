export default class Boat {
  constructor(props) {
    this.name = props.name;
    this.type = props.type;
    this.length = props.length;
    this.year = props.year;
    this.captain = props.captain;
    this.crew = props.crew || [];
    this.phrf = props.phrf;

    this.seasonRankings = props.seasonRankings || {};
    this.lastRace = props.lastRace || {};
  }
}
