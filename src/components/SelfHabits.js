import { requestAllQuestionnaires } from './Requests'
import { useEffect, useState } from 'react';

export const OwnHabits = ({ token }) => {
    const [questionnaireList, setQuestionnaire] = useState([])

    useEffect(() => {
        requestAllQuestionnaires(token)
            .then(res => setQuestionnaire(res.data))
    }, [token])

    return (
        <div className="habit-list">
            <h3> Habits </h3>
            <div className="h-list-cont">{questionnaireList.map((questionnaire, idx) => (
                    <div className="specific-habit" key={idx}> 
                        {/* This will link to habit page */}
                        {questionnaire.habit_name}
                    </div>
            ))}
            </div>
        </div>
    )
}