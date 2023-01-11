import { requestHabitRecords } from './Requests'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Edit } from "@styled-icons/boxicons-solid/Edit"
import { ArrowDownCircle } from "@styled-icons/feather/ArrowDownCircle"
import { ArrowUpCircle } from "@styled-icons/bootstrap/ArrowUpCircle"

export const HabitRecords = ({ token, habitId }) => {
    const [recordList, setRecordList] = useState([])
    const [recordsPerPage, setRecordsPerPage] = useState(4)

    useEffect(() => {
        requestHabitRecords(token, habitId)
            .then(res => setRecordList(res.data))
    }, [token, habitId])

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
                                <p className='date-of-record-self'>{record.date}</p>
                        </div>
                        <div className='record-action'>
                                <div className='center'>
                                    <p className='today-recorded'>{record.daily_record}</p>
                                    <p>{record.metric_label}</p>
                                </div>
                        </div>
                        
                    </div>
                    <div className='self-comment'>
                        <p >{record.comment_dh}</p>
                        <Link className='specific-record-self' to='/records/:recordId' state={{ id: record.id }}><Edit className='edt-but' /></Link>
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