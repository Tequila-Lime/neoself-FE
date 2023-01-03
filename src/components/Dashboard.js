import { requestOwnProfileInfo, requestTodayOwnRecords } from './Requests';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom"

export const Dashboard = ({ token }) => {
    const [ profile, setProfile ] = useState([])
    const [todayRecord, setTodayRecord] = useState([])

    useEffect(() => {
        requestOwnProfileInfo(token).then((res) => setProfile(res.data))
        requestTodayOwnRecords(token).then(res => setTodayRecord(res.data))
    }, [token]);


    return (
        <div className="dashboard-cont">
            <div className="side-cont">
                <div className="dash-component">
                    <div className="profile-top">
                        <div className="avatar">
                            <p>I'm a picture</p>
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
                        {todayRecord.length === 0 ? <p>No records</p> :
                        <div className='user-records'>{todayRecord.map((record, idx) => (
                            <div key={idx}>
                                <Link className='today-records ' to='/records/:recordId' state={{ id: record.id }}>{record.habit_name } record </Link>
                            </div>
                            ))}
                        </div> }
                    </div>
                </div>
            </div>
            <div className="middle-cont">
                <div className="dash-component">
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                </div>
            </div>
            <div className="side-cont">
                <div className="dash-component">
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                </div>
            </div>
            
        </div>
    )
}