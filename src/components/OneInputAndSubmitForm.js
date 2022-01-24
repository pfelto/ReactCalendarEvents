/* eslint-disable react/prop-types */
import React from "react";

export const OneInputAndSubmitForm = ({ handleSubmit, children }) => {
  let submitButton = null;
  let inputTextField = false;

  if (!children.length) {
    throw new Error("This Form requires more than 1 child");
  }

  for (let child in children) {
    if (children[child].props.type === "submit") {
      submitButton = children[child];
    }
    if (children[child].props.type === "text") {
      inputTextField = true;
    }
  }

  if (!submitButton) {
    throw new Error("Forms need a submit button");
  }

  if (!inputTextField) {
    throw new Error("Form needs atleast one text input");
  }

  return <form onSubmit={handleSubmit}>{children}</form>;
};
