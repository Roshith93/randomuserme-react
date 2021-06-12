import "./styles.css";
import axios from "axios";
import { useEffect, useState } from "react";

const USERURL = "https://randomuser.me/api/?results=20";
const getUsers = async () => {
  const response = await axios.get(USERURL);
  const { results } = response.data;
  return results;
};

export default function App() {
  const [users, setUsers] = useState([]);
  const [locations, setLocations] = useState([]);
  const getLocations = (users) => {
    return users && users.map((el) => el.location);
  };
  useEffect(
    () =>
      getUsers()
        .then((users) => {
          setUsers(users);
          setLocations(getLocations(users));
        })
        .catch((error) => console.error(error)),
    []
  );

  let flatArray = {};
  let flatTheArray = (obj, keyName = "location") => {
    Object.keys(obj).forEach((el) => {
      let newKey = `${obj[el]}_${keyName}`;
      if (typeof obj[el] === "object") {
        flatTheArray(obj[el], newKey);
      } else {
        flatArray[newKey] = obj[el];
      }
    });
  };

  flatTheArray(locations);
  console.log(flatArray);
  return (
    <div className="App">
      <table>
        <tr>
          <th>state</th>
          <th>city</th>
          <th>country</th>
        </tr>

        {users &&
          users.map((user) => (
            <tr>
              {" "}
              <td>{user.location.state}</td>
              <td>{user.location.city}</td>
              <td>{user.location.country}</td>
            </tr>
          ))}
      </table>
    </div>
  );
}
