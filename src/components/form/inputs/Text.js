import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Base from "./Base";

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
