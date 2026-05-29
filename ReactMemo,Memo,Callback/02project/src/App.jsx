/// App.jsx

import { useState, useMemo, useCallback } from "react";
import Sum from "./Sum";
import Post from "./Post";

function App() {
  console.log("🔴 Parent App Re-rendered");

  /* =========================================================
     STATES
  ========================================================= */

  // Causes parent re-render
  const [counter, setCounter] = useState(0);

  // Used for expensive prime calculation
  const [increment, setIncrement] = useState(100000);

  /* =========================================================
     useMemo → Stores expensive calculated VALUE
     Recalculates only when dependency changes
  ========================================================= */

  const primeCount = useMemo(() => {
    console.log("🟡 Prime calculation running...");

    let count = 0;

    for (let i = 2; i <= increment; i++) {
      let isPrime = true;

      for (let j = 2; j < i; j++) {
        if (i % j === 0) {
          isPrime = false;
          break;
        }
      }

      if (isPrime) {
        count++;
      }
    }

    return count;
  }, [increment]);

  /* =========================================================
     Object Reference Concept

     Objects compare by reference, not values.

     {} !== {}

     If object recreates on every render,
     React.memo thinks prop changed.

     useMemo stores same object reference.
  ========================================================= */

  const userInfo = useMemo(() => {
    console.log("🟢 Object created only once");

    return {
      name: "Vikas",
      age: 20,
    };
  }, []);

  /* =========================================================
     useCallback → Stores FUNCTION reference
     Function recreated only when dependency changes
  ========================================================= */

  const greet = useCallback(() => {
    console.log(`Hello Counter : ${counter}`);
  }, [counter]);

  return (
    <>
      {/* =====================================================
          NORMAL STATE UPDATE
      ===================================================== */}

      <h1>Counter : {counter}</h1>

      <button onClick={() => setCounter(counter + 1)}>
        Increment Parent Counter
      </button>

      <hr />

      {/* =====================================================
          useMemo Example
      ===================================================== */}

      <h1>useMemo</h1>

      <p>
        Stores expensive calculated values and recalculates only
        when dependency changes.
      </p>

      <h2>Prime Count : {primeCount}</h2>

      <button onClick={() => setIncrement(increment + 100)}>
        Increase Prime Calculation Range
      </button>

      <hr />

      {/* =====================================================
          React.memo Example
      ===================================================== */}

      <h1>React.memo</h1>

      <p>
        Stops child re-render if props remain same.
      </p>

      <Sum number={1000} />

      <Post info={userInfo} />

      <hr />

      {/* =====================================================
          useCallback Example
      ===================================================== */}

      <h1>useCallback</h1>

      <p>
        Stores function reference so same function is reused
        between renders.
      </p>

      <button onClick={greet}>Run Callback Function</button>
    </>
  );
}

export default App;