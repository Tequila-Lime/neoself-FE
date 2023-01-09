import { requestAddRecordLike, requestRemoveLike, requestRecordLike } from "./Requests";
import { useState, useEffect } from 'react';
import { Heart } from "@styled-icons/boxicons-regular/Heart"
import { HeartFill } from "@styled-icons/octicons/HeartFill"

export const LikeButton = ({ token, recordId}) => {
    const [likes, setLikes] = useState([])
    
    useEffect(() => {
        requestRecordLike(token, recordId).then((res) => setLikes(res.data))
        ;
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

        {likes.length > 0 ? <>{likes.map((like, idx) => (
            <div key={idx}>
                <HeartFill className="comment-button" onClick={() => handleRemoveLike(like.id)}/>
            </div>
        ))}
        </>
        :
        <Heart className="comment-button" onClick={handleClick}/>
        }
        
        
    </div>
  );
};
