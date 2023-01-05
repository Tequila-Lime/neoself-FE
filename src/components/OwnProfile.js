import { requestOwnProfileInfo, requestEditOwnProfileInfo  } from './Requests';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const OwnProfile = ({ token }) => {
    const [ profile, setProfile ] = useState([])
    const [step, setStep] = useState(0)

    useEffect(() => {
        requestOwnProfileInfo(token).then((res) => setProfile(res.data))
    }, [token]);

    const handleUpdate = (event)=>{
        event.preventDefault()
        requestEditOwnProfileInfo(token, profile)
        //  refresh page after this
        setStep(0)
    }
    const handleEdit = (event)=>{
        setStep(1)
    }
    const handleNvm = (event)=>{
        setStep(0)
    }

    function renderStep(step){
        const profEdit = [
            <>
            <div className="profile-img">
                    <div className="profile-name-profile">
                        <div className="actual-img">img</div>
                        <p>{profile.username}</p>
                        <p>{profile.full_name}</p>
                        <Link to="/FriendList">Friends</Link>
                    </div>
                </div>
                <div className="bio">
                    <div className="top-bio">
                        <p className="bio-text">Bio:</p>
                        {/* <textarea  /> */}
                        <p className="bio-info">{profile.bio}</p>
                    </div>
                    <div className="bottom-bio">
                        <div className="bio-text">
                        </div>
                        <div className="friend-profile">
                            {/* <button>Friend/unfriend</button> */}
                            {/* this is for self profile above is for other users */}
                            <button onClick={handleEdit}>Edit Profile</button>
                            <p>Habits started</p>
                        </div>
                    </div>
                </div>
                </>
                ,
                <>
                <div className="profile-img">
                        <div className="profile-name-profile">
                            <div className="actual-img">img</div>
                            <p>Username</p>
                            <input className="text-box" type='text' value={profile.username}
                    onChange={e => setProfile({...profile, username: e.target.value})}></input>
                            <p>Full name</p>
                            <input className="text-box" type='text' value={profile.full_name}
                    onChange={e => setProfile({...profile, full_name: e.target.value})}></input>
                        </div>
                    </div>
                    <div className="bio">
                        <div className="top-bio">
                            <p className="bio-text">Bio:</p>
                            <textarea className="bio-info" value={profile.bio}
                    onChange={e => setProfile({...profile, bio: e.target.value})}/>
                        </div>
                        <div className="bottom-bio">
                            <div className="bio-text">
                            </div>
                            <div className="friend-profile">
                                {/* <button>Friend/unfriend</button> */}
                                {/* this is for self profile above is for other users */}
                                <button onClick={handleUpdate}>Save</button>
                                <button onClick={handleNvm}>Go back</button>
                                <p>Habits started</p>
                            </div>
                        </div>
                    </div>
                </>
        ]
        return step < profEdit.length ? profEdit[step] : null;
    }

    return (
            <div className="profile-title">
                {/* render step is going to replace below */}
                {renderStep(step)}
                
            </div>
    )
    }