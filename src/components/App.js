/* eslint-disable react/prop-types */
import React, { useState } from "react";

export const App = ({ title }) => {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <button onClick={() => setCounter((counter) => counter + 1)}>
        {title}:{counter}
      </button>
    </div>
  );
};
