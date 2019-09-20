import React from "react";
import WindBadge from "../badges/WindBadge";
import TempBadge from "../badges/TempBadge";
import "./raceListEntry.css";

export default ({
  seasonName,
  startDate,
  entries,
  first,
  second,
  thrid,
  id,
  wind,
  temp,
  name,
  ...race
}) => {
  // test data
  wind = { direction: "NE", speed: 15 };
  temp = 78;
  console.log(race);
  return (
    <a href={`#/races/${id}/edit`} className="raceListEntry">
      <div className="threeCol-left flex-row">
        <div className="flex-column left-aligned raceListEntry-cell ">
          <span>Race: {name}</span>
          <span>Race Date: {startDate}</span>
        </div>
        <div className="flex-column left-aligned raceListEntry-cell">
          <span className="asBadge">
            <span className="label">
              <span>{seasonName || " June 2019"}</span>
            </span>
          </span>
        </div>
      </div>
      <div className="threeCol-center flex-row">
        <div className="flex-column stretch center-aligned raceListEntry-cell ">
          <WindBadge {...wind} />
          <TempBadge temp={temp} />
        </div>
        <div className="flex-column stretch center-aligned raceListEntry-cell ">
          <span className="asBadge">
            <span className="label">
              <span>{entries || 36}</span>
            </span>
            <span>Entries</span>
          </span>
        </div>
      </div>
      <div className="threeCol-right flex-row">
        <div className="flex-column stretch right-aligned raceListEntry-cell font-10pt ">
          <span>1st Place: {first || "Test boat"}</span>
          <span>2nd Place: {first || "Test boat"}</span>
          <span>3rd Place: {first || "Test boat"}</span>
        </div>
      </div>
    </a>
  );
};
