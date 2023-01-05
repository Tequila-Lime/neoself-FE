import { requestUsersProfileInfo } from './Requests';
import { useEffect, useState } from 'react';

export const OtherProfile = ({ token, id }) => {
    const [ profile, setProfile ] = useState([])

    useEffect(() => {
        requestUsersProfileInfo(token, id).then((res) => setProfile(res.data))
    }, [token, id]);

    return (
            <div className="profile-title">
                <div className="profile-img">
                    <div className="profile-name-profile">
                        <div className="actual-img">img</div>
                        <p>{profile.username}</p>
                        <p>{profile.full_name}</p>
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
                            <button>Friend/unfriend</button>
                            <p>Habits started</p>
                        </div>
                        
                    </div>
                </div>
            </div>
    )
}