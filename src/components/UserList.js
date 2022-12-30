import { useEffect, useState } from "react";
import { requestUserInfo, requestAllUsers, requestAddFriend } from "./Requests";

export const Users = ({ token, username }) => {
  const [UserList, setUserList] = useState([]);
  const [buttonText, setButtonText] = useState("Befriend");

  useEffect(() => {
    requestAllUsers(token).then((res) => setUserList(res.data));
  }, [token]);

  const handleBefriend = (userId) => {
    requestAddFriend(token, userId).then(() => {
      setUserList((prevFriendList) =>
        prevFriendList.concat([{ id: userId }]));
    });
  };

  const handleMouseEnter = () => {
    setButtonText("Confirm");
  };

  const handleMouseLeave = () => {
    setButtonText("Befriend");
  };

  return (
    <div>
      <h1 className="page-title title is-4 has-text-centered">Users</h1>
      <div>
        {console.log(UserList)}
        <div className="users">
          {UserList.map((user, idx) => (
            <div key={idx}>
              <div className="card">
                <p>{user.username}</p>
                {/* Add the befriend button to the card */}
                <button
                  onClick={() => handleBefriend(user.id)}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="button"
                >
                  <div className="button-container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M17.841 15.659l.176.177.178-.177a2.25 2.25 0 0 1 3.182 3.182l-3.36 3.359-3.358-3.359a2.25 2.25 0 0 1 3.182-3.182zM12 14v2a6 6 0 0 0-6 6H4a8 8 0 0 1 7.75-7.996L12 14zm0-13c3.315 0 6 2.685 6 6a5.998 5.998 0 0 1-5.775 5.996L12 13c-3.315 0-6-2.685-6-6a5.998 5.998 0 0 1 5.775-5.996L12 1zm0 2C9.79 3 8 4.79 8 7s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />

                    </svg>
                    <span className="button-text">{buttonText}</span>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
