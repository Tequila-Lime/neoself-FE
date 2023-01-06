import { requestAddRecordLike, requestRemoveLike, requestRecordLike } from "./Requests";
import { useState, useEffect } from 'react';

export const LikeButton = ({ token, recordId}) => {
    const [likes, setLikes] = useState([])
    
    useEffect(() => {
        requestRecordLike(token, recordId).then((res) => setLikes(res.data));
      }, [token, recordId]);

    const handleClick = (event) => {
        event.preventDefault()
        const gifMail = {
            "record": recordId,
            }
        requestAddRecordLike(token, recordId, gifMail).then((res) => setLikes([res.data]));

        };

    function handleRemoveLike(likeId){
        requestRemoveLike(token, likeId)
        setLikes([])
    }

  return (
    <div>
        {console.log(likes)}
        {likes.length > 0 && <>{likes.map((like, idx) => (
            <div key={idx}>
                <button onClick={() => handleRemoveLike(like.id)}>Remove Like</button>
            </div>
        ))}
        </>}
      <button onClick={handleClick}>Like</button>
    </div>
  );
};
