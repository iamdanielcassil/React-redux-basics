import React from "react";
import FormControl from "@material-ui/core/FormControl";

export default props => {
  return (
    <FormControl margin="normal" variant="outlined" className={props.className}>
      {props.children}
    </FormControl>
  );
};
