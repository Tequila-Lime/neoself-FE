import { requestOtherUserRecords } from './Requests'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
// , useLocation
export const OtherUserRecords = ({ token, id }) => {
    const [recordList, setRecordList] = useState([])
    const [recordsPerPage, setRecordsPerPage] = useState(4)
    // const location = useLocation()

    useEffect(() => {
        requestOtherUserRecords(token, id)
            .then(res => setRecordList(res.data))
    }, [token, id])

    function handleLoadMore() {
        setRecordsPerPage(recordsPerPage + 4);
      }
    
    function handleLoadLess() {
        setRecordsPerPage(recordsPerPage - 4);
      }

    return (
        <div>
            {/* This name should be from a different endpoint in future, but the component is working fine at the moment */}
            {recordList.length === 0 ? <p>No records made</p> : <>
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
        <div className="load-records">
            {recordsPerPage < recordList.length && (
                <button className="load-more" onClick={handleLoadMore}>Load More</button>
            )}
            {recordsPerPage > 4 && (
                <button className="load-more" onClick={handleLoadLess}>Load Less</button>
            )}
        </div>
                </>
            }    
        </div>
    )
}