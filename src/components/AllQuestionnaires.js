import { requestAllQuestionnaires } from './Requests'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

export const AllQuestionnaires = ({ token }) => {
    const [questionnaireList, setQuestionnaire] = useState([])

    useEffect(() => {
        requestAllQuestionnaires(token)
            .then(res => setQuestionnaire(res.data))
    }, [token])

    return (
        <div>
            <h1>Your habits</h1>
            <div>
                <div className='questionnaires'>{questionnaireList.map((questionnaire, idx) => (
                    <div key={idx}>
                        <p>{questionnaire.habit_name} started on {questionnaire.date}</p>
                        {console.log(questionnaire.id)}
                        <Link  to='/questionnaire/:questionnaireId' state={{ id: questionnaire.id }}> See habit details</Link>
                        <>     </>
                        <Link  to='/records/habit/:recordId' state={{ id: questionnaire.id }}> See all records</Link>
                        <>     </>
                        <Link  to='/habit-weeklogs/:id' state={{ id: questionnaire.id }}> See WeekLogs</Link>
                    </div>
                ))}
                </div>    
            </div>
        </div>
    )
}