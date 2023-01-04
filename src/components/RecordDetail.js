
import { requestRecordDetail  } from './Requests'
import { useEffect, useState } from 'react'
import {  useLocation, Link } from 'react-router-dom'
import { GiphyBar } from './GiphyBar'

export const RecordDetail = ({ token, username }) => {
    const [record, setRecord] = useState([])
    const location = useLocation()

    useEffect(() => {
        requestRecordDetail(token, location.state.id)
            .then(res => setRecord(res.data))
    }, [token, location.state.id])

    return(
        <div>
            <h1>{record.user} Record to {record.habit_name} on {record.date}</h1>
            <p>Record number {record.daily_record} {record.metric_label}</p>
            <p> Did cue effect habit?:</p> 
            {record.cue_dh===false ?<p>❌</p> : <p>✅</p>}
            <p>Did craving effect habit?: {record.craving_dh}</p>
            {record.craving_dh===false ?<p>❌</p> : <p>✅</p>}
            <p>Did Response effect habit?: {record.response_dh}</p>
            {record.response_dh===false ?<p>❌</p> : <p>✅</p>}
            <p>Self Comments: </p>
            <p>{record.comment_dh}</p>

            {username===record.user && (
            <>
            <p>Is it public: {record.public}</p>
            {record.public===false ?<p>❌</p> : <p>✅</p>}
            </>
            )}
            
            <p>Likes amount {record.likes_num}</p>
            <hr></hr>
            {username===record.user && <Link  to='/records/update/:recordId' state={{ id: record.id }}> Update Record</Link>}
            {}
            <GiphyBar/>
        </div>
    )

    }