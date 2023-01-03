import { requestTodayOwnRecords } from './Requests'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

export const TodayRecords = ({ token }) => {
    const [recordList, setRecordList] = useState([])

    useEffect(() => {
        requestTodayOwnRecords(token)
            .then(res => setRecordList(res.data))
    }, [token])

    return (
        <div>
            <div>
                <div className="indent">
                        {recordList.length === 0 ? <p>No records test</p> :
                        <div className='user-records'>{recordList.map((record, idx) => (
                            <div key={idx}>
                                <Link className='today-records ' to='/records/:recordId' state={{ id: record.id }}>{record.habit_name } record </Link>
                            </div>
                            ))}
                        </div> }
                    </div>   
            </div>
        </div>
    )
}