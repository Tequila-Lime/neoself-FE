import { requestReflectionDetail  } from './Requests'
import { useEffect, useState } from 'react'
import {  useLocation, Link } from 'react-router-dom'

export const ReflectionDetail = ({ token, username }) => {
    const [reflection, setReflection] = useState([])
    const location = useLocation()

    useEffect(() => {
        requestReflectionDetail(token, location.state.id)
            .then(res => setReflection(res.data))
    }, [token, location.state.id])

return (
    <div>
        <h1>{reflection.user} Reflection to {reflection.habit_name} on {reflection.date}</h1>
        <p>Reflection number {reflection.daily_record} {reflection.metric_label}</p>
        <p>{reflection.cue_question_1}</p>
        <p>{reflection.cue_question_2}</p>
        <p>{reflection.cue_question_3}</p>
        <p>{reflection.craving_question_1}</p>
        <p>{reflection.response_question_1}</p>
        <p>{reflection.response_question_2}</p>
        <p>{reflection.metric_baseline}</p>
        <p>{reflection.goal_metric}</p>
        <hr></hr>
        {<Link  to='/reflection/update/:reflectionId' state={{ id: reflection.id }}> Update Reflection</Link>}
    </div>
    )
}