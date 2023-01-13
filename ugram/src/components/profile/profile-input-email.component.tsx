import React from "react";
import { useState } from "react";
import TextField from "@material-ui/core/TextField";

interface EmailInputProps {
  stateValue: string | undefined;
  updateValue: (value: string) => void;
}

export default function PhoneInput(props: EmailInputProps) {
  const [stateError, updateSateError] = useState(false);
  const [stateErrorField, updateStateErrorField] = useState("");

  return (
    <TextField
      id="standard-basic"
      label="Email"
      type="email"
      defaultValue={props.stateValue}
      helperText={stateErrorField}
      onChange={(e) => validate(e.target.value)}
      error={stateError}
    />
  );

  function validate(newValue: string) {
    if (newValue.length === 0) {
      props.updateValue(newValue);
      updateSateError(false);
      updateStateErrorField("");
    } else if (
      !newValue.match(
        /\+?1?\s*\(?-*\.*(\d{3})\)?\.*-*\s*(\d{3})\.*-*\s*(\d{4})$/
      )
    ) {
      updateSateError(true);
      updateStateErrorField("*Invalid phone number");
    } else {
      props.updateValue(newValue);
      updateSateError(false);
      updateStateErrorField("");
    }
  }
}
