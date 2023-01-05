import { requestOwnProfileInfo } from './Requests';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const OwnProfile = ({ token }) => {
    const [ profile, setProfile ] = useState([])

    useEffect(() => {
        requestOwnProfileInfo(token).then((res) => setProfile(res.data))
    }, [token]);

    return (
            <div className="profile-title">
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
                            <button>Edit Profile</button>
                            <p>Habits started</p>
                        </div>
                        
                    </div>
                </div>
            </div>
    )
}