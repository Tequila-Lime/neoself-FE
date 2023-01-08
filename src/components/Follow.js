import { requestAddFriend,requestRemoveFriend, requestSingleFriendship} from "./Requests";
import { useState, useEffect } from "react"

export const Follow = ({ token, friendId}) => { 
  const [friendship, setFriendShip] = useState()
  
  
  useEffect(() => {
    requestSingleFriendship(token, friendId).then((res) => setFriendShip(res.data)  
    ); 
  }, [token, friendId]);

  const handleClick = (event) => {
    event.preventDefault()
    requestAddFriend(token, friendId).then((res) => setFriendShip(res.data));
    window.location.reload()
    };

  const handleUnfriend = (event) => {
      event.preventDefault()
      requestRemoveFriend(token, friendship[0].id)
      setFriendShip([])
    };

  return (
    <div>
      {console.log(friendship)}
      {friendship ? friendship.length === 0 ?
        <button onClick={handleClick} className="is-clickable">Friend</button> 
        :
        <button onClick={handleUnfriend} className="is-clickable">Unfriend</button>
      : null}

    </div>
  );
};
