import { faker } from "@faker-js/faker";
import { useEffect, useMemo, useState } from "react";
import { Modal } from "./Modal";

interface User {
  id: string;
  vorname: string;
  nachname: string;
  selected: boolean;
}

const createUsers = () => {
  return Array(100)
    .fill(0)
    .map(() => {
      return {
        id: faker.string.uuid(),
        vorname: faker.person.firstName(),
        nachname: faker.person.lastName(),
        selected: false,
      };
    }) as User[];
};

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setUsers(JSON.parse(user));
    } else {
      const newUsers = createUsers();
      console.log(newUsers);
      localStorage.setItem("user", JSON.stringify(newUsers));
      setUsers(newUsers);
    }
  }, []);

  const deleteUsers = () => {
    setUsers(users.filter((x) => !x.selected));
  };

  const selectedUser = useMemo(() => {
    const result = users.find((x) => x.selected);
    if (!result) return undefined;
    return { ...result };
  }, [users]);

  const saveUser = () => {
    if (!selectedUser) return;
    const user = users.find((x) => x.id == selectedUser.id)!;
    user.nachname = selectedUser.nachname;
    user.vorname = selectedUser.vorname;
    setUsers([...users]);
  };

  return (
    <>
      <div className="d-flex gap-3">
        <button
          type="button"
          disabled={users.filter((x) => x.selected).length == 0}
          onClick={deleteUsers}
          className="btn btn-danger"
        >
          Löschen
        </button>
        <Modal
          title="Bearbeiten"
          disabled={users.filter((x) => x.selected).length != 1}
          save={saveUser}
        >
          {selectedUser && (
            <>
              <label>Vorname:</label>
              <input
                type="text"
                className="form-control"
                placeholder={selectedUser.vorname}
                onChange={(x) => {
                  selectedUser.vorname = x.target.value;
                }}
              />
              <label>Nachname:</label>
              <input
                type="text"
                className="form-control"
                placeholder={selectedUser.nachname}
                onChange={(x) => {
                  selectedUser.nachname = x.target.value;
                }}
              />
            </>
          )}
        </Modal>
      </div>
      <div className="list-group">
        {users.map((x) => (
          <div key={x.id} className="d-flex gap-3 list-group-item">
            <input
              type="checkbox"
              className="form-check-input"
              checked={x.selected}
              onChange={() => {
                x.selected = !x.selected;
                setUsers([...users]);
              }}
            />{" "}
            <span>
              {x.vorname} {" " + x.nachname}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserList;
