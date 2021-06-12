import "./styles.css";
import axios from "axios";
import { useEffect, useState } from "react";

const USERURL = "https://randomuser.me/api/?results=20";
const getUsers = async () => {
  const response = await axios.get(USERURL);
  const { results } = response.data;
  console.log(results);
  return results;
};

export default function App() {
  const [users, setUsers] = useState([]);
  useEffect(
    () =>
      getUsers()
        .then((users) => setUsers(users))
        .catch((error) => console.error(error)),
    []
  );
  return (
    <div className="App">
      {users && users.map((user) => <pre>{JSON.stringify(user, null, 5)}</pre>)}
    </div>
  );
}
