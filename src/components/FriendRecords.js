import { requestFriendRecords } from './Requests'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

export const FriendRecords = ({ token }) => {
    const [recordList, setRecordList] = useState([])
    const [recordsPerPage, setRecordsPerPage] = useState(4)

    useEffect(() => {
        requestFriendRecords(token)
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
                    <Link to='/records/:recordId' state={{ id: record.id }}>
                    {record.habit_name} record by {record.user}
                    </Link>
                    <p>{record.date}</p>
                </div>
                <p>{record.daily_record}{record.metric_label}</p>
                </div>
                <div className="reaction">
                    <p>Gif</p>
                    <p>Like</p>
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