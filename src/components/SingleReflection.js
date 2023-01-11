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
        
        <div className='idec'>
           <h1>{reflection.user} Reflectionion on {reflection.date}</h1>
                            
                            <div className="questionReflect">
                                <p>I will [habit] at [time] in [location]</p>
                                <p>Answer: {reflection.cue_question_1}</p>
                            </div>
                            
                            <div className="questionReflect">
                                <p>After [current habit], I will [new habit]</p>
                                <p>Answer: {reflection.cue_question_2}</p>
                            </div>
                            <div className="questionReflect">
                                <p>Please define a visual cue that would remind you to do habit?</p>
                                <p>Answer: {reflection.cue_question_3}</p>
                            </div>
                            <div className="questionReflect">
                                <p>How will you reward yourself?</p>
                                <p>Answer: {reflection.craving_question_1}</p>
                            </div>
                            
                            <div className="questionReflect">
                                <p>How can I make this habit easy?</p>
                                <p>Answer: {reflection.response_question_1}</p>
                            </div>
                            
                            <div className="questionReflect">
                                <p>What are the Progressions?</p>
                                <p>Answer: {reflection.response_question_2}</p>
                            </div>  
            </div>
    )
}