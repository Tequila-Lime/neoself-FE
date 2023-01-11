import { requestAllQuestionnaires } from './Requests'
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom"

export const OwnHabits = ({ token }) => {
    const [questionnaireList, setQuestionnaire] = useState([])

    useEffect(() => {
        requestAllQuestionnaires(token)
            .then(res => setQuestionnaire(res.data))
    }, [token])

    return (
        <div className="habit-list">
            <h2> Habits </h2>
            <div className="h-list-cont">{questionnaireList.map((questionnaire, idx) => (
                    <div className="specific-habit" key={idx}> 
                        {/* This will link to habit page */}
                        <Link className='l-e-c' to={`/habit-page/${questionnaire.id}`} state={{ id: questionnaire.id }}>{questionnaire.habit_name}</Link>
                    </div>
            ))}
            </div>
        </div>
    )
}