import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(10);

  function handleCount(e) {
    setCount(e.target.value);
  }

  useEffect(() => {
    async function GithubUsers() {
      const response = await fetch(
        `https://api.github.com/users?per_page=${count}`,
      );
      const data = await response.json();
      console.log("hello");
      setUsers(data);
    }

    GithubUsers();
  }, [count]);

  return (
    <>
      <h1>Github users :</h1>
      <input type="number" value={count} onChange={handleCount} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        {users.map((user) => {
          return (
            <img
              key={user.id}
              src={user.avatar_url}
              height={"100px"}
              width={"100px"}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;


//<-------------USEEFFECT NOTES--------->

// useEffect is used for side effects
// Side effects = API calls, timers, event listeners, localStorage, etc.

// useEffect always runs AFTER render completes

// Flow:
// Render component
// UI updates on screen
// Then useEffect runs

// No dependency array:
// Runs after every render

// Empty dependency array []:
// Runs only once after initial render

// Dependency array [count]:
// Runs once after initial render
// Then runs again whenever count changes

// Multiple dependencies [count, name]:
// Runs if any dependency changes

// Easy memory trick:
// No array      -> every render
// []            -> only once
// [value]       -> once + whenever value changes

// Main purpose:
// Control when side-effect code should run after rendering