import { requestUsersProfileInfo} from './Requests';
import { useEffect, useState } from 'react';
import { Follow } from './Follow';

export const OtherProfile = ({ token, id }) => {
    const [ profile, setProfile ] = useState([])

    useEffect(() => {
        requestUsersProfileInfo(token, id).then((res) => setProfile(res.data))
    }, [token, id]);

    return (
            <div className="profile-title">
                <div className="profile-img">
                    <div className="profile-name-profile">
                        <p className='profile-name-p'>{profile.username}</p>
                        <p>{profile.full_name}</p>
                    </div>
                </div>
                <div className="bio">
                    <div className="top-bio">
                        <p className="bio-text">Bio:</p>
                        {/* <textarea  /> */}
                        <p>{profile.bio}</p>
                    </div>
                    <div className="bottom-bio">
                        <div className="bio-text">
                        </div>
                        <div className="friend-profile">
                            <Follow  token={token} friendId={id} />
                        </div>
                        
                    </div>
                </div>
            </div>
    )
}