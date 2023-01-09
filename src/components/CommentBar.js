import { requestGiphySearch, requestSpecificGif, requestAddRecordReaction, requestRecordReaction } from "./Requests"
import { useState } from 'react';
import { LikeButton } from "./LikeButton"; 
import { InsertComment } from "@styled-icons/material-rounded/InsertComment"
import { SearchAlt } from "@styled-icons/boxicons-regular/SearchAlt"
import { Send } from "@styled-icons/bootstrap/Send"
 
export const CommentBar = ({ token, recordId }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [gifs, setGifs] = useState([]);
    const [selectedGif, setSelectedGif] = useState([]);
    const [comments, setComments] = useState([])
    const [step, setStep] = useState(0)

    const API_KEY = 'GSKy3RpyH0NC0Pg3mw6nVaNaLdDHf2CD'

    function handleSubmit(event) {
        event.preventDefault();
        requestGiphySearch(searchTerm, API_KEY).then(response => {
            setGifs(response.data.data);
        if (step===2){
            setStep(0)
        }
        else{setStep(2)}
    });
    }

    function handleGifSelection(gif){
        requestSpecificGif(gif.id, API_KEY).then(response => {
            setSelectedGif(response.data.data);})
        setGifs([])
        setStep(3)

    }
    function handleSendGif(gif){
        const gifMail = {
        "record": recordId,
        "gif_url": `${gif.images.fixed_width.url}`
        }

        requestAddRecordReaction(token, recordId, gifMail)
        setStep(0)
    }

    function viewGifComments(event){
        event.preventDefault()
        requestRecordReaction(token, recordId).then(response => {
            setComments(response.data);
        if (step===1){
            setStep(0)
        }
        else{setStep(1)}
        });
    }

    function renderStep(step){
        const profEdit = [
            <>
            </>
            ,
            <>
            {comments.length > 0 ?
                    <div className="comment-list-cont">
                        {comments.map((comment, idx) => (
                            <div className="indiv-rec-comment" key={idx}>
                                <p>{comment.commentor}</p>
                                <img className="gif-style" src={comment.gif_url} alt="gif" />
                            </div>
                        ))}
                    </div>
                :
                <p>No comments</p>
            } 
            </>
            ,
            <div className="searched-gifs">
            {gifs.map((gif, idx) => (
                <div className="indiv-gif-cont" key={idx}>
                    {/* <img className="indiv-gif" onClick={() =>handleGifSelection(gif)} src={gif.images.fixed_width.url} alt={gif.title} /> */}
                    <img className="indiv-gif" onClick={() => handleGifSelection(gif)} src={gif.images.fixed_width.url} alt={gif.title} />
                </div>
            ))}
            </div>
            ,
            <>
            {selectedGif.length !== 0 && 
                <>
                <div className="gif-on-cue">
                    <Send className="send-gif" onClick={() => handleSendGif(selectedGif)}/>
                    <img className="selected-gif" src={selectedGif.images.fixed_width.url} alt={selectedGif.title} />
                </div>    
                </>
            }
            </>
        ]

        return step < profEdit.length ? profEdit[step] : null;
    }

    return (
        <div className="comment-cont">
            <div className="comment-bar">
                <div className="quick-action">

                    <InsertComment className="comment-button spc" onClick={viewGifComments} />
                    <LikeButton token={token} recordId={recordId} />
                </div>
                
                <div className="gif-search">
                    <input className="search-input-gif" placeholder="Send gif..." type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                    <SearchAlt className="comment-button" type="submit" onClick={handleSubmit}/>
                </div>
                
            </div>
            <div className="gif-search-results">
            {renderStep(step)}
            </div>
        </div>
    )
}
