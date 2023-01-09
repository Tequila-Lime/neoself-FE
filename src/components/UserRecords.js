import { requestUserRecords } from './Requests'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { Edit } from "@styled-icons/boxicons-solid/Edit"

export const UserRecords = ({ token }) => {
    const [recordList, setRecordList] = useState([])
    const [recordsPerPage, setRecordsPerPage] = useState(4)


    useEffect(() => {
        requestUserRecords(token)
            .then(res => setRecordList(res.data))
    }, [token])

    function handleLoadMore() {
        setRecordsPerPage(recordsPerPage + 4);
      }
    
    function handleLoadLess() {
        setRecordsPerPage(recordsPerPage - 4);
      }

    return (
        <div>
            <div className='records-cont'>
                {recordList.slice(0, recordsPerPage).map((record, idx) => (
                <div className="indiv-record" key={idx}>
                    <div className="record-info">
                        <div className="record-title">
                                <Link className='specific-record-self' to='/records/:recordId' state={{ id: record.id }}>{record.habit_name}</Link>
                                <p className='date-of-record-self'>{record.date}</p>
                        </div>
                        <div className='record-action'>
                                <div className='center'>
                                    <p className='today-recorded'>{record.daily_record}</p>
                                    <p>{record.metric_label}</p>
                                </div>
                                <div className='gls'>
                                    <p className='txt-sc'>{record.week_reflection.metric_baseline}</p>
                                    <p className='txt-sc'>{record.week_reflection.goal_metric}</p>
                                </div>
                        </div>
                        
                    </div>
                    <div className='self-comment'>
                        <p >{record.comment_dh} {record.week_reflection.metric_baseline}</p>
                        <Link className='specific-record-self' to='/records/:recordId' state={{ id: record.id }}><Edit className='edt-but' /></Link>
                    </div>    
                </div>
                ))}
        </div>
        {/* would like these to be arrows in future */}
        <div className="load-records">
            {recordsPerPage < recordList.length && (
                <button className="load-more" onClick={handleLoadMore}>Load More</button>
            )}
            {recordsPerPage > 4 && (
                <button className="load-more" onClick={handleLoadLess}>Load Less</button>
            )}
        </div>
        </div>
    )
}