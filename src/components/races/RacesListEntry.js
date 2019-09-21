import React from "react";
import WindBadge from "../badges/WindBadge";
import TempBadge from "../badges/TempBadge";
import CountBadge from "../badges/CountBade";

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
  isLogedIn,
  ...race
}) => {
  // test data
  wind = { direction: "NE", speed: 15 };
  temp = 78;
  return (
    <div className="flex-row-reversed">
      {isLogedIn ? (
        <div className="flex-column right-aligned raceListEntry-buttons">
          <a
            title="edit"
            href={`#/races/${id}/edit`}
            className="font-10pt raceListEntry-editButton link"
          >
            <span className="font-bold">edit</span>
          </a>
          <a
            title="delete"
            href={`#/races/${id}/edit`}
            className="font-10pt link red"
          >
            <span className="font-bold">DELETE</span>
          </a>
        </div>
      ) : null}

      <a title="view" href={`#/races/${id}`} className="raceListEntry">
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
            <CountBadge count={entries} label="Entries" />
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
    </div>
  );
};
