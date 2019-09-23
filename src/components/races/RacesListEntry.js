import React from "react";
import WindBadge from "../badges/WindBadge";
import TempBadge from "../badges/TempBadge";
import CountBadge from "../badges/CountBade";
import MoreMenu from "../menus/more";

import "./raceListEntry.css";

export default ({
  seasonName,
  startDate,
  entries,
  first,
  second,
  thrid,
  id,
  temperature,
  windSpeed,
  windDirection,
  name,
  isLogedIn,
  ...race
}) => {
  // test data
  return (
    <div className="flex-row-reversed">
      <div className="raceListEntry">
        {/* {isLogedIn ? (
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
      ) : null} */}

        <div className="threeCol-left flex-row">
          <div className="flex-column left-aligned raceListEntry-cell ">
            <h3>{name}</h3>
            <span>Race Date: {new Date(startDate).toLocaleString()}</span>
          </div>
          <div className="flex-column right-aligned raceListEntry-cell">
            <span className="asBadge">
              <span className="label">
                <span>{seasonName || " June 2019"}</span>
              </span>
            </span>
          </div>
        </div>
        <div className="threeCol-center flex-row">
          <div className="flex-column stretch center-aligned raceListEntry-cell ">
            <WindBadge {...{ windDirection, windSpeed }} />
            <TempBadge temperature={temperature} />
          </div>
          <div className="flex-column stretch center-aligned raceListEntry-cell ">
            <CountBadge count={entries} label="Entries" />
          </div>
        </div>
        <div className="threeCol-right flex-row flex-end">
          <div className="flex-column stretch right-aligned flex-11auto raceListEntry-cell font-10pt ">
            <span>1st Place: {first || "Test boat"}</span>
            <span>2nd Place: {first || "Test boat"}</span>
            <span>3rd Place: {first || "Test boat"}</span>
          </div>
          <div className="flex-column right-aligned flex-11auto ">
            <a title="view" href={`#/races/${id}`} className="">
              preivew
            </a>
          </div>
          <div className="flex-column right-aligned flex-11auto ">
            {isLogedIn ? (
              <MoreMenu>
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
              </MoreMenu>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
