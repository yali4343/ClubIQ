import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./api/usersAPI.js";

function App() {
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: ({ signal }) => getUsers(signal),
  });

  console.log(usersQuery);

  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const [editingUserId, setEditingUserId] = useState(null);

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function loadUsers() {
    try {
      const response = await fetch("http://localhost:3000/users");

      if (!response.ok) {
        throw new Error("Failed to load users");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error.message);
    }
  }

  function resetForm() {
    setName("");
    setAge("");
    setEditingUserId(null);
    setError("");
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      const isEditing = editingUserId !== null;

      const url = isEditing
        ? `http://localhost:3000/users/${editingUserId}`
        : "http://localhost:3000/users";

      const method = isEditing ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          age: Number(age),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save user");
      }

      if (isEditing) {
        setUsers((currentUsers) =>
          currentUsers.map((user) => (user.id === editingUserId ? data : user)),
        );
      } else {
        setUsers((currentUsers) => [...currentUsers, data]);
      }

      setName("");
      setAge("");
      setEditingUserId(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleEdit(user) {
    setEditingUserId(user.id);
    setName(user.name);
    setAge(String(user.age));
    setError("");
  }

  async function handleDelete(userId) {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (shouldDelete === false) {
      return;
    }

    setError("");

    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers((currentUsers) =>
        currentUsers.filter((user) => user.id !== userId),
      );
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <h1>User Directory ({users.length} total)</h1>

      <h2>{editingUserId !== null ? "Edit User" : "Create User"}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>

          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="age">Age:</label>

          <input
            id="age"
            name="age"
            type="number"
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Saving..."
            : editingUserId !== null
              ? "Update User"
              : "Create User"}
        </button>

        {editingUserId !== null && (
          <button type="button" onClick={resetForm} disabled={isSubmitting}>
            Cancel
          </button>
        )}
      </form>

      {error && <p>{error}</p>}

      <hr />

      {users.length === 0 ? (
        <p>No users found. Create a user to get started.</p>
      ) : (
        users.map((user) => (
          <div key={user.id}>
            <span>
              {user.name} - {user.age}
            </span>

            <button onClick={() => handleEdit(user)}>Edit</button>

            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
