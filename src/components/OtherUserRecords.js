import { requestOtherUserRecords } from './Requests'
import { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom"

export const OtherUserRecords = ({ token }) => {
    const [recordList, setRecordList] = useState([])
    const location = useLocation()

    useEffect(() => {
        requestOtherUserRecords(token, location.state.id)
            .then(res => setRecordList(res.data))
    }, [token, location.state.id])

    return (
        <div>
            {/* This name should be from a different endpoint in future, but the component is working fine at the moment */}
            <h1>Records for {recordList.user}</h1>
            <div>
                <div className='UserRecords'>{recordList.map((record, idx) => (
                    <div key={idx}>
                        {/* would like to hav name of habit serialized */}
                        <p>Record for {record.habit_name } on {record.date}</p>
                        {/* This is where link to record detail would go */}
                        <Link  to='/records/:recordId' state={{ id: record.id }}> See record detail</Link>
                        {/* maybe a link to the users profile */}
                    </div>
                ))}
                </div>    
            </div>
        </div>
    )
}