import { requestFriendRecords } from './Requests'
import { useEffect, useState } from 'react'

export const FriendRecords = ({ token }) => {
    const [recordList, setRecordList] = useState([])

    useEffect(() => {
        requestFriendRecords(token)
            .then(res => setRecordList(res.data))
    }, [token])

    return (
        <div>
            <h1>Your Records</h1>
            <div>
                <div className='UserRecords'>{recordList.map((record, idx) => (
                    <div key={idx}>
                        {/* would like to hav name of habit serialized */}
                        <p>Record for {record.week_reflection } on {record.date}</p>
                        {/* This is where link to record detail would go */}
                        {/* maybe a link to the users profile */}
                    </div>
                ))}
                </div>    
            </div>
        </div>
    )
}