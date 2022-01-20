/* eslint-disable react/prop-types */
import React, { useState } from "react";

export const TestComp = ({ title }) => {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <button
        data-testid={title}
        onClick={() => setCounter((counter) => counter + 1)}
      >
        {counter}
      </button>
    </div>
  );
};
