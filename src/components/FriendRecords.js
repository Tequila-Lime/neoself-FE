import { requestFriendRecords } from './Requests'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { CommentBar } from './CommentBar'
import { ArrowDownCircle } from "@styled-icons/feather/ArrowDownCircle"
import { ArrowUpCircle } from "@styled-icons/bootstrap/ArrowUpCircle"

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
                                <Link className='user-record-name' to='/random-profile' state={{ id: record.user_number }}>{record.user}</Link>
                                <p className='date-of-record'>{record.date}</p>
                                <p className='specific-record-f'>{record.habit_name}</p>
                        </div>
                        <div className='record-action-f'>
                            <p className='today-recorded'>{record.daily_record}</p>
                            <p className='today-metric'>{record.metric_label}</p>
                        </div>
                    </div>
                    <div className="reaction">
                        <CommentBar token={token} recordId={record.id}/>
                    </div>
                </div>
                ))}
            </div>
        {/* would like these to be arrows in future */}
        <div className="load-records">
            {recordsPerPage < recordList.length && (
                <ArrowDownCircle className="load-more" onClick={handleLoadMore}/>
                // <button className="load-more" onClick={handleLoadMore}>Load More</button>
            )}
            {recordsPerPage > 4 && (
                <ArrowUpCircle className="load-more" onClick={handleLoadLess}/>
                // <button className="load-more" onClick={handleLoadLess}>Load Less</button>
            )}
        </div>
        </div>
    )
}