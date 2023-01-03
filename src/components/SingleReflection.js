import { requestSingleReflection } from './Requests'
import { useEffect, useState } from 'react'
import {  useLocation } from 'react-router-dom'

export const SingleReflection = ({ token }) => {
    const [reflection, setReflection] = useState([])
    const location = useLocation()

    useEffect(() => {
        requestSingleReflection(token, location.state.id)
            .then(res => setReflection(res.data))
    }, [token, location.state.id])

    return (
        
        <div>
            <h1>Went to page</h1>
            <h1>{reflection.id}</h1>
            <div>
                <p>{reflection.metric_baseline}{reflection.metric_label} </p>
                <p>{reflection.goal_metric} {reflection.goal_label} </p>
                <p>{reflection.cue_question_1} </p>
                <p>{reflection.cue_question_2} </p>
                <p>{reflection.cue_question_3} </p>
                <p>{reflection.craving_question_1} </p>
                <p>{reflection.response_question_1} </p>
                <p>{reflection.response_question_2} </p>
            </div>    
            </div>
    )
}