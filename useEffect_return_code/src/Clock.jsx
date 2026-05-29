import React, { useEffect, useState } from "react";

function Clock() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!show) return; // show == false

    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [show]);

  return (
    <div>
      <button onClick={() => { setShow(!show);}} >
        {show ? "hide" : "show"}
      </button>
      {show && <h1>Time: {time}</h1>}
    </div>
  );
}

export default Clock;


// USEEFFECT "RETURN CLEAR" NOTE

/* when here i use [show] only without clearInterval .then after every click  new setIterval is created and sent to web Api ..so many intervals are there .....soo to remove old interval we use "return" in useEffect .........if initally a interval was running then i change state variable show so componenet rerenders ,as show was changed so useEffect will run but befire running it will clear old interval as i wrote return clearInterval ...then new interval is created or not   */

/*
When I use [show] without clearInterval,
then after every click a new setInterval is created.

Old intervals are not removed,
so many intervals keep running together.


To remove old interval,
we use cleanup function:

return () => {
   clearInterval(intervalId);
}


Flow:

Initially:
show = true
useEffect runs
new interval created


Then show state changes
component re-renders

Since [show] changed,
before running new useEffect,
React first runs cleanup function.

So old interval gets cleared/stopped.


Then useEffect runs again.


If show is true:
new interval gets created.

If show is false:
if (!show) return;
so no new interval is created.
*/