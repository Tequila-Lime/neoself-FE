import { requestAddFriend,requestRemoveFriend, requestSingleFriendship} from "./Requests";
import { useState, useEffect } from "react"
import { PersonRemoveOutline } from "@styled-icons/evaicons-outline/PersonRemoveOutline"
import { PersonAddOutline} from "@styled-icons/evaicons-outline/PersonAddOutline"

export const Follow = ({ token, friendId}) => { 
  const [friendship, setFriendShip] = useState([])
  
  useEffect(() => {
    requestSingleFriendship(token, friendId).then((res) => setFriendShip(res.data)  
    ); 
  }, [token, friendId]);

  const handleClick = (event) => {
    event.preventDefault()
    requestAddFriend(token, friendId).then((res) => setFriendShip(res.data));
    };

  // friendship right now is an array with a dictionary but I want just the dictionary

  const handleUnfriend = (event) => {
      event.preventDefault()
      requestRemoveFriend(token, friendship[0].id)
      setFriendShip([])
    };

  return (
    <div className="profile-info-add">
      {friendship ? friendship.length === 0 ?
        <PersonAddOutline onClick={handleClick} />
        :
        <PersonRemoveOutline onClick={handleUnfriend} />
      : null}
    </div>
  );
};
