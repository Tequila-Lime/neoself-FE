import { requestHabitRecords } from './Requests'
import { useEffect, useState } from 'react'
import {  useLocation } from 'react-router-dom'

export const HabitRecords = ({ token }) => {
    const [recordList, setRecordList] = useState([])
    const location = useLocation()

    useEffect(() => {
        requestHabitRecords(token, location.state.id)
            .then(res => setRecordList(res.data))
    }, [token, location.state.id])

    return (
        <div>
        <h1>Questionnaire Records</h1>
            <div>
                <div className='QuestionnaireRecords'>{recordList.map((record, idx) => (
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