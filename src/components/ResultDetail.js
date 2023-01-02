import { requestResultDetail, requestHabitRecords  } from './Requests'
import { useEffect, useState } from 'react'
import {  useLocation, Link } from 'react-router-dom'

export const ResultDetail = ({ token }) => {
    const [result, setResult] = useState([])
    const [recordList, setRecordList] = useState([])
    const location = useLocation()

    useEffect(() => {
        requestResultDetail(token, location.state.id )
            .then(res => setResult(res.data))
        
    }, [token, location.state.id,])

    useEffect(()=>{
        requestHabitRecords(token, result.questionnaire)
                    .then(res => setRecordList(res.data))
    }, [token, result.questionnaire])
        
    return(
        <div>
            <h1>Records</h1>
            {console.log("BELOW")}
            {console.log(result.questionnaire)}
        <div>
            {console.log(recordList)}
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