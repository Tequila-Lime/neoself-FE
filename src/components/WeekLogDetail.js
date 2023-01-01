import { requestWeeklogsDetail, requestWeekLogRecords  } from './Requests'
import { useEffect, useState } from 'react'
import {  useLocation, Link } from 'react-router-dom'

export const WeeklogsDetail = ({ token }) => {
    const [weeklog, setWeeklog] = useState([])
    const [recordList, setRecordList] = useState([])
    const location = useLocation()

    useEffect(() => {
        requestWeekLogRecords(token, location.state.id)
            .then(res => setRecordList(res.data))
        requestWeeklogsDetail(token, location.state.id)
            .then(res => setWeeklog(res.data))
    }, [token, location.state.id])
        
    return(
        <div>
            <h1>{weeklog.questionnaire} Log Records created on {weeklog.date}</h1>
        <div>
                <div className='UserRecords'>{recordList.map((record, idx) => (
                    <div key={idx}>
                        {/* would like to hav name of habit serialized */}
                        <p>Record for {record.week_reflection } on {record.date}</p>
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