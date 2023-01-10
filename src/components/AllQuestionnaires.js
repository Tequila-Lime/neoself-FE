import { requestAllQuestionnaires } from './Requests'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { DoorOpen } from "@styled-icons/bootstrap/DoorOpen"
 
export const AllQuestionnaires = ({ token }) => {
    const [questionnaireList, setQuestionnaire] = useState([])

    useEffect(() => {
        requestAllQuestionnaires(token)
            .then(res => setQuestionnaire(res.data))
    }, [token])

    return (
        <div className='habit-header-link'>
            <h1>Your habits</h1>
            <div className='list-of-habits'>{questionnaireList.map((questionnaire, idx) => (
                <div className='each-habit' key={idx}>
                    <div className='status-habit-y'>
                        <h3>{questionnaire.habit_name}</h3>
                    </div>
                    
                    <Link className='link-for-habit' to={`/habit-page/${questionnaire.id}`} state={{ id: questionnaire.id }}>See habit <DoorOpen className='icon-temp'/></Link>
                </div>
            ))}
            </div>    
        </div>
    )
}