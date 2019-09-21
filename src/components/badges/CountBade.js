import React from "react";

export default ({ count, label }) => {
  return (
    <span className="asBadge">
      <span className="label">
        <span>{count || 0}</span>
      </span>
      <span>{label}</span>
    </span>
  );
};
