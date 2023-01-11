import { requestOtherUserRecords } from './Requests'
import { useEffect, useState } from 'react'
import { CommentBar } from './CommentBar'
import { ArrowDownCircle } from "@styled-icons/feather/ArrowDownCircle"
import { ArrowUpCircle } from "@styled-icons/bootstrap/ArrowUpCircle"
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
                                <p className='user-record-name-or'>{record.user}</p>
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
                </>
            }    
        </div>
    )
}