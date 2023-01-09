import { useEffect, useState } from 'react';
import { requestFriends, requestRemoveFriend, requestOwnProfileInfo } from './Requests';
import { PersonRemoveOutline } from "@styled-icons/evaicons-outline/PersonRemoveOutline"
import { Link } from "react-router-dom"
 
export const Friends = ({ token }) => {
  const [friendList, setFriendList] = useState([]);
  const [self, setSelf] = useState([])


  useEffect(() => {
    requestFriends(token).then((res) => setFriendList(res.data));
  }, [token]);
  useEffect(() => {
    requestOwnProfileInfo(token).then((res) => setSelf(res.data));
  }, [token]);

  const handleUnfriend = (friendId) => {
    requestRemoveFriend(token, friendId).then(() => {
      setFriendList((prevFriendList) => prevFriendList.filter((friend) => friend.id !== friendId));
    });
  };


  return (
        <div className="friends-list indent">
          {friendList.map((friend, idx) => (
            <div className="friend-in-list" key={idx}>
              {self.username === friend.current_user ?
                 <Link className='list-profile-link' to='/random-profile' state={{ id: friend.friend_number }}>{friend.friend}</Link>
                 : 
                 <Link className='list-profile-link' to='/random-profile' state={{ id: friend.current_number }}>{friend.current_user}</Link>
              }
                <PersonRemoveOutline className='remove-friend-in-list' onClick={() => handleUnfriend(friend.id)}/>
            </div>
          ))}
        </div>
  );
};
