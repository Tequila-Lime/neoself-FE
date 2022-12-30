import { useEffect, useState } from 'react';
import { requestFriends, requestRemoveFriend } from './Requests';

export const Friends = ({ token }) => {
  const [friendList, setFriendList] = useState([]);
  const [buttonText, setButtonText] = useState('Unfriend');


  useEffect(() => {
    requestFriends(token).then((res) => setFriendList(res.data));
  }, [token]);

  const handleUnfriend = (friendId) => {
    requestRemoveFriend(token, friendId).then(() => {
      setFriendList((prevFriendList) => prevFriendList.filter((friend) => friend.id !== friendId));
    });
  };

  const handleMouseEnter = () => {
    setButtonText('Confirm');
  };

  const handleMouseLeave = () => {
    setButtonText('Unfriend');
  };

  return (
    <div>
      <h1 className="page-title title is-4 has-text-centered">Friends</h1>
      <div>
        {console.log(friendList)}
        <div className="friends">
          {friendList.map((friend, idx) => (
            <div key={idx}>
              <div className="card">
                <p>{friend.friend}</p>
                {/* Add the unfriend button to the card */}
                <button
                  onClick={() => handleUnfriend(friend.id)}
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
                      <path
                        d="M20 12a8 8 0 1 0-16 0v4h3a1 1 0 0 1 1 1v3h8v-3a1 1 0 0 1 1-1h3v-4zm-2 6v3a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-3H3a1 1 0 0 1-1-1v-5C2 6.477 6.477 2 12 2s10 4.477 10 10v5a1 1 0 0 1-1 1h-3zM7.5 14a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                      />
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
