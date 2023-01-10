import { requestRecentReflectionDetail } from './Requests'
import { useEffect, useState } from 'react'


// This page has been moved into PlanChange




export const RecentestHabitReflection = ({ token, idx }) => {
    const [reflection, setReflection] = useState([])
    
    useEffect(() => {
        requestRecentReflectionDetail(token, idx)
            .then(res => setReflection(res.data))
    }, [token, idx])

    return (
        <div>
            {console.log(reflection)}
            {reflection.map((reflect, idx)=>(
            <div>
                <h1>{reflect.user} reflect to {reflect.habit_name} on {reflect.date}</h1>
                <p>reflect number{reflect.daily_record} for {reflect.metric_label}</p>
                <p>{reflect.cue_question_1}</p>
                <p>{reflect.cue_question_2}</p>
                <p>{reflect.cue_question_3}</p>
                <p>{reflect.craving_question_1}</p>
                <p>{reflect.response_question_1}</p>
                <p>{reflect.response_question_2}</p>
                <p>{reflect.metric_baseline}</p>
                <p>{reflect.goal_metric}</p>
            </div>
            ))}
        </div>)
}
