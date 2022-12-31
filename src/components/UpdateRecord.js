import { requestUpdateRecordDetail, requestRecordDetail } from './Requests'
import { useState, useEffect } from 'react'
import {  useLocation, useNavigate } from 'react-router-dom'

export const UpdateRecord = ({ token, username }) => {
    const [record, setRecord] = useState([])
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        requestRecordDetail(token, location.state.id)
            .then(res => setRecord(res.data))
    }, [token, location.state.id])

    const handleUpdate = (event)=>{
        event.preventDefault()
        requestUpdateRecordDetail(token, location.state.id, record)
        navigate("/")
    }

    return(
        <div>
            {console.log(record)}

            <h1>{record.user} Record on {record.date}</h1>
            <p>Record number {record.daily_record}</p>
            <input className="text-box" type='number' value={record.daily_record}
                onChange={e => setRecord({...record, daily_record: e.target.value})}></input>
            <p> Did cue effect habit?</p>
            <input className="text-box" type='checkbox' checked={record.cue_dh}
                    onChange={e => setRecord(!record.cue_dh)}></input>
            <p>Did craving effect habit?</p>
            <input className="text-box" type='checkbox' checked={record.craving_dh}
                    onChange={e => setRecord(!record.craving_dh)}></input>
            <p>Did Response effect habit?</p>
            <input className="text-box" type='checkbox' checked={record.response_dh}
                    onChange={e => setRecord(!record.response_dh)}></input>
            <p>Self Comments: </p>
            <p>{record.comment_dh}</p>
            <p>Is it public</p>
            <input className="text-box" type='checkbox' checked={record.public}
                    onChange={e => setRecord(!record.public)}></input>
            <p>Likes amount {record.likes_num}</p>
            <hr></hr>
            <button onClick={handleUpdate}>Update</button>
            
        </div>
    )

    }
