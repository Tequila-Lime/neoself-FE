import { requestOwnProfileInfo } from './Requests';
import { useEffect, useState } from 'react';
import { TodayRecords } from './TodayRecords';
import { UserRecords } from './UserRecords';
import { Link } from "react-router-dom"
import { DataVisualization } from './DataAllRecord';

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
                            <Link className="profile-name" to='/profile'> {profile.username}</Link>
                            {profile.full_name !== null && <p>{profile.full_name}</p> }
                        </div>
                    </div>
                    {/* <button className='basic-button' type="submit">Friend</button>   */}
                </div>
                <div className="dash-component">
                    <div className="indent">
                        <h3>Today's Records</h3>
                        <TodayRecords token={token}/>
                    </div>
                </div>
            </div>
            <div className="middle-cont">
                <div className="dash-component-nb">
                    <div className='indent'>
                        <h3 className='txt-nice'>Your Records</h3>
                        <UserRecords token={token}/>
                    </div>
                </div>
            </div>
            <div className="side-cont">
                <div className="dash-chart">
                    <h3 className='txt-nice'>Habits Done today</h3>
                    <DataVisualization  token={token} step={1}/>
                </div>
            </div>
            
        </div>
    )
}