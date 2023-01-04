import { requestOwnProfileInfo } from './Requests';
import { useEffect, useState } from 'react';
import { TodayRecords } from './TodayRecords';
import { UserRecords } from './UserRecords';

export const Dashboard = ({ token }) => {
    const [ profile, setProfile ] = useState([])

    useEffect(() => {
        requestOwnProfileInfo(token).then((res) => setProfile(res.data))
    }, [token]);


    return (
        <div className="dashboard-cont">
            <div className="side-cont">
                <div className="dash-component">
                    <div className="profile-top">
                        <div className="avatar">
                            {profile.avatar && <img src={profile.avatar} alt={profile.username}/>}
                        </div>
                        <div className="profile-info">
                            <p className="profile-name">{profile.username}</p>
                            {profile.full_name === true ? <p>{profile.name}</p> : <p>fill name out</p>}
                        </div>
                    </div>
                    {/* <button className='basic-button' type="submit">Friend</button>   */}
                    <p className="wins">Number of Completed Habits: </p>
                </div>
                <div className="dash-component">
                    <div className="indent">
                        <h3>Today's Records</h3>
                        <TodayRecords token={token}/>
                    </div>
                </div>
            </div>
            <div className="middle-cont">
                <div className="dash-component">
                    <div className='indent'>
                        <h3>Your Records</h3>
                        <UserRecords token={token}/>
                    </div>
                </div>
            </div>
            <div className="side-cont">
                <div className="dash-component">
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                </div>
            </div>
            
        </div>
    )
}