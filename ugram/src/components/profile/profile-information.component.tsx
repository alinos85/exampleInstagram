import React from "react";
import { useState } from "react";
import "./profile.scss";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import EmailInput from "./profile-input-email.component";
import PhoneInput from "./profile-input-phone.component";
import NameInput from "./profile-input-name.component";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  button: {
    margin: theme.spacing(1),
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  input: {
    display: "none",
  },
}));

export default function ProfileInformation(props: {
  name: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  date: string | undefined;
  updateFunction: () => void;
}) {
  const classes = useStyles();
  const [stateName, updateSateName] = useState(props.name);
  const [stateLastName, updateSateLastName] = useState(props.lastName);
  const [stateEmail, updateSateEmail] = useState(props.email);
  const [statePhone, updateSatePhone] = useState(props.phone);

  return (
    <div className="info">
      <form className={classes.root} noValidate autoComplete="on">
        <NameInput
          stateValue={stateName}
          label="Name"
          updateValue={updateSateName}
        />
        <NameInput
          stateValue={stateLastName}
          label="Last name"
          updateValue={updateSateLastName}
        />
        <EmailInput stateValue={stateEmail} updateValue={updateSateEmail} />
        <PhoneInput stateValue={statePhone} updateValue={updateSatePhone} />

        <TextField
          id="standard-read-only-input"
          label="Registration date"
          type="date"
          defaultValue={props.date}
          InputProps={{
            readOnly: true,
          }}
        />

        <div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={props.updateFunction}
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
