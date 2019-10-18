import React from "react";
import TextField from "@material-ui/core/TextField";

export default props => {
  return (
    <TextField
      required={props.required}
      id={props.id}
      label={props.label}
      value={props.value}
      onChange={props.handleChange}
      className={props.className}
      margin="normal"
      variant="outlined"
    />
  );
};
