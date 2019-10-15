import React, { useState, useEffect } from "react";
import { connect } from "redux-bundler-react";
import { makeStyles } from "@material-ui/core/styles";
import RaceEntries from "../components/entries/RaceEntries";
import Button from "@material-ui/core/Button";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Text from "../components/form/inputs/Text";
import DateTime from "../components/form/inputs/DateTime";
import Select from "../components/form/inputs/Select";
import Container from "@material-ui/core/Container";
import "./editRace.css";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  container: {
    display: "flex",
    padding: 0,
    marginTop: "15px"
  },
  saveButton: {
    width: "100%",
    padding: "10px",
    borderRadius: 0,
    margin: "15px"
  },
  cancelButton: {
    width: "100%",
    padding: "10px",
    borderRadius: 0,
    margin: "15px"
  },
  formGroup: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  field: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
    maxWidth: "400px",
    flex: "1 0",
    minWidth: "300px",
    alignSelf: "center"
  },
  fullField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
    maxWidth: "80%",
    flex: "1 1 auto",
    minWidth: "300px",
    alignSelf: "center"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default connect(
  "selectRouteParams",
  "selectCurrentBoat",
  "doSetCurrentBoat",
  "doSaveBoat",
  "selectBoats",
  "doGoToManageRaces",
  ({
    routeParams,
    currentBoat,
    doSetCurrentBoat,
    doSaveBoat,
    boats,
    doGoToManageRaces
  }) => {
    const classes = useStyles();
    const [boat, setBoat] = useState();

    useEffect(() => {
      doSetCurrentBoat(routeParams.id);
    }, [routeParams.id, doSetCurrentBoat, boats]);

    useEffect(() => {
      setBoat(currentBoat);
    }, [currentBoat]);

    if (!boat) {
      return null;
    }

    return (
      <form className={classes.root} autoComplete="off">
        <ExpansionPanel defaultExpanded>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Details</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.formGroup}>
            <Text
              className={classes.field}
              id="name"
              label="Name"
              required
              handleChange={e => setBoat({ ...boat, name: e.target.value })}
              value={boat.name}
            />
            <Text
              className={classes.field}
              id="captain"
              label="Captain"
              required
              handleChange={e => setBoat({ ...boat, captain: e.target.value })}
              value={boat.captain}
            />
            <Text
              className={classes.field}
              id="crew"
              label="Crew"
              handleChange={e => setBoat({ ...boat, crew: e.target.value })}
              value={boat.crew}
            />
            <Text
              className={classes.field}
              id="maker"
              label="Maker"
              handleChange={e => setBoat({ ...boat, maker: e.target.value })}
              value={boat.maker}
            />
            <Text
              className={classes.field}
              id="length"
              label="Length"
              handleChange={e => setBoat({ ...boat, length: e.target.value })}
              value={boat.length}
            />
            <Text
              className={classes.field}
              id="model"
              label="Model"
              handleChange={e => setBoat({ ...boat, model: e.target.value })}
              value={boat.model}
            />
            <Text
              className={classes.field}
              id="type"
              label="Keel Type"
              handleChange={e => setBoat({ ...boat, type: e.target.value })}
              value={boat.type}
            />
            <Text
              className={classes.field}
              id="phrf"
              label="PHRF"
              handleChange={e => setBoat({ ...boat, phrf: e.target.value })}
              value={boat.phrf}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <Container className={classes.container}>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            className={classes.cancelButton}
            onClick={() => (window.location.hash = "/boats/manage")}
          >
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            color="primary"
            className={classes.saveButton}
            onClick={() =>
              doSaveBoat(currentBoat.update(boat)).then(
                () => (window.location.hash = "/boats/manage")
              )
            }
          >
            Save
          </Button>
        </Container>
      </form>
    );
  }
);

// export default connect(
//   "doSaveBoat",
//   "doDeleteBoat",
//   "selectCurrentBoat",
//   ({ doSaveBoat, doDeleteBoat, currentBoat }) => {
//     const [boat, setBoat] = useState(currentBoat || {});
//     const [isEditing, setIsEditing] = useState(false);

//     return (
//       <div className="form">
//         <div className="row">
//           {!isEditing ? (
//             <input
//               className="button-secondary"
//               type="button"
//               onClick={() => setIsEditing(true)}
//               value="edit"
//             />
//           ) : null}
//           {isEditing && boat.id ? (
//             <input
//               className="button-secondary button-delete"
//               type="button"
//               onClick={() => doDeleteBoat(boat)}
//               value="DELETE"
//             />
//           ) : null}
//         </div>
//         <div className="row">
//           <div className="column">
//             <label htmlFor="name">
//               Name
//               <input
//                 disabled={!isEditing}
//                 id="name"
//                 className="field"
//                 placeholder="Boats name"
//                 type="text"
//                 onChange={e => setBoat({ ...boat, name: e.target.value })}
//                 value={boat.name || ""}
//               />
//             </label>
//             <label htmlFor="captain">
//               Captain
//               <input
//                 disabled={!isEditing}
//                 id="captain"
//                 placeholder="Captain Jack"
//                 className="field"
//                 type="text"
//                 onChange={e => setBoat({ ...boat, captain: e.target.value })}
//                 value={boat.captain || ""}
//               />
//             </label>
//             <label htmlFor="maker">
//               Boat Maker
//               <input
//                 disabled={!isEditing}
//                 id="maker"
//                 placeholder="Catalina"
//                 className="field"
//                 type="text"
//                 onChange={e => setBoat({ ...boat, maker: e.target.value })}
//                 value={boat.maker || ""}
//               />
//             </label>
//             <label htmlFor="type">
//               Boat Type
//               <input
//                 disabled={!isEditing}
//                 id="type"
//                 placeholder="fin keel, center board, cat"
//                 className="field"
//                 type="text"
//                 onChange={e => setBoat({ ...boat, type: e.target.value })}
//                 value={boat.type || ""}
//               />
//             </label>
//           </div>
//           <div className="column">
//             <label htmlFor="model">
//               Model
//               <input
//                 disabled={!isEditing}
//                 id="model"
//                 placeholder="25"
//                 className="field"
//                 type="text"
//                 onChange={e => setBoat({ ...boat, model: e.target.value })}
//                 value={boat.model || ""}
//               />
//             </label>
//             <label htmlFor="length">
//               Length
//               <input
//                 disabled={!isEditing}
//                 id="length"
//                 placeholder="25"
//                 className="field"
//                 type="text"
//                 onChange={e => setBoat({ ...boat, length: e.target.value })}
//                 value={boat.length || ""}
//               />
//             </label>
//             <label htmlFor="phrf">
//               PHRF
//               <input
//                 disabled={!isEditing}
//                 id="phrf"
//                 className="field"
//                 placeholder="perscribed handicap number"
//                 type="text"
//                 onChange={e => setBoat({ ...boat, phrf: e.target.value })}
//                 value={boat.phrf || ""}
//               />
//             </label>
//             <label htmlFor="crew">
//               Crew
//               <input
//                 disabled={!isEditing}
//                 id="crew"
//                 className="field"
//                 placeholder="comma seporated list of names"
//                 type="text"
//                 onChange={e => setBoat({ ...boat, crew: e.target.value })}
//                 value={boat.crew || ""}
//               />
//             </label>
//           </div>
//         </div>
//         <div className="row">
//           <div className="double-column">
//             {isEditing ? (
//               <input
//                 className="button-save"
//                 type="button"
//                 onClick={() => doSaveBoat(boat)}
//                 value="save"
//               />
//             ) : null}
//           </div>
//         </div>
//       </div>
//     );
//   }
// );
