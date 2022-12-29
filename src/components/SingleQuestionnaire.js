import { requestSingleQuestionnaire } from './Requests'
import { useEffect, useState } from 'react'
import {  useLocation } from 'react-router-dom'

export const SingleQuestionnaire = ({ token }) => {
    const [questionnaire, setQuestionnaire] = useState([])
    const location = useLocation()

    useEffect(() => {
        requestSingleQuestionnaire(token, location.state.id)
            .then(res => setQuestionnaire(res.data))
    }, [token, location.state.id])

    return (
        
        <div>
            <h1>Went to page</h1>
            <h1>{questionnaire.habit_name}</h1>
            <div>
                <p>How many days {questionnaire.duration} </p>
                <div>
                    <p>{`${questionnaire.monday}`} </p>
                    <p>{`${questionnaire.tuesday}`} </p>
                    <p>{`${questionnaire.wednesday}`} </p>
                    <p>{`${questionnaire.thursday}`} </p>
                    <p>{`${questionnaire.friday}`} </p>
                    <p>{`${questionnaire.saturday}`} </p>
                    <p>{`${questionnaire.sunday}`} </p>
                </div>
                <p>{questionnaire.metric_baseline}{questionnaire.metric_label} </p>
                <p>{questionnaire.goal_metric} {questionnaire.goal_label} </p>
                <p>{questionnaire.cue_question_1} </p>
                <p>{questionnaire.cue_question_2} </p>
                <p>{questionnaire.cue_question_3} </p>
                <p>{questionnaire.craving_question_1} </p>
                <p>{questionnaire.response_question_1} </p>
                <p>{questionnaire.response_question_2} </p>
                <p>{questionnaire.signature} </p>
            </div>    
            </div>
    )
}