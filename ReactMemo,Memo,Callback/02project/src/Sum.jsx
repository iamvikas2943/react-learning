/// Sum.jsx

import React from "react";

/*
  React.memo:
  Stops unnecessary re-render
  when props stay same
*/

const Sum = React.memo(({ number }) => {
  console.log("🔵 Sum Component Rendered");

  function calculateSum() {
    let sum = 0;

    for (let i = 1; i <= number; i++) {
      sum += i;
    }

    return sum;
  }

  const total = calculateSum();

  return (
    <>
      <h2>Math Library</h2>

      <h3>Sum : {total}</h3>
    </>
  );
});

export default Sum;