import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Base from "./Base";

const useStyles = makeStyles(theme => ({
  label: {
    backgroundColor: "#fff",
    padding: "0 4px"
  },
  labelAlt: {
    backgroundColor: "#5284af",
    padding: "0 4px",
    color: "white",
    "Mui-focused": {
      backgroundColor: "#5284af",
      padding: "0 4px",
      color: "white"
    }
  }
}));
export default props => {
  const classes = useStyles();

  return (
    <Base id={props.id} label={props.label} className={props.className}>
      <InputLabel
        className={props.useAlt ? classes.labelAlt : classes.label}
        htmlFor={props.id}
      >
        {props.label}
      </InputLabel>
      <Select
        required={props.required}
        id={props.id}
        label={props.label}
        value={props.value}
        onChange={props.handleChange}
        className={props.className}
        variant={props.useAlt ? "standard" : "outlined"}
        inputProps={{
          name: props.name,
          id: props.id
        }}
      >
        {props.options.map(item => (
          <MenuItem
            key={item.key ? item.key : item.value}
            value={item.key ? item.key : item.value}
          >
            {item.value}
          </MenuItem>
        ))}
      </Select>
    </Base>
  );
};
