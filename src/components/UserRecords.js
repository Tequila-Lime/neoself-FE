import { requestUserRecords } from './Requests'
import { useEffect, useState } from 'react'

export const UserRecords = ({ token }) => {
    const [recordList, setRecordList] = useState([])

    useEffect(() => {
        requestUserRecords(token)
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
                        {console.log(record.id)}
                        {/* This is where link to record detail would go */}
                    </div>
                ))}
                </div>    
            </div>
        </div>
    )
}