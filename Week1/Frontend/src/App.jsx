import { useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  async function loadUsers() {
    const response = await fetch("http://localhost:3000/api/users");

    const data = await response.json();

    setUsers(data);
  }

  return (
    <div>
      <h1>Users</h1>

      <button onClick={loadUsers}>Load Users</button>

      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

export default App;
