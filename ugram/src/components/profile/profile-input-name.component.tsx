import React from "react";
import { useState } from "react";
import TextField from "@material-ui/core/TextField";

interface NameInputProps {
  stateValue: string | undefined;
  label: string | undefined;
  updateValue: (value: string) => void;
}

export default function NameInput(props: NameInputProps) {
  const [stateError, updateSateError] = useState(false);
  const [stateErrorField, updateStateErrorField] = useState("");

  return (
    <TextField
      id="standard-basic"
      label={props.label}
      defaultValue={props.stateValue}
      helperText={stateErrorField}
      onChange={(e) => validate(e.target.value)}
      error={stateError}
    />
  );

  function validate(newValue: string) {
    if (newValue.length === 0) {
      updateSateError(true);
      updateStateErrorField("*Field cannot be empty");
    } else if (!newValue.match("^[a-zA-Z \\-]+$")) {
      updateSateError(true);
      updateStateErrorField("*Invalid character");
    } else {
      props.updateValue(newValue);
      updateSateError(false);
      updateStateErrorField("");
    }
  }
}
