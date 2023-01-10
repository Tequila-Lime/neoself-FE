import { useEffect, useState } from 'react'
import { useNavigate, useLocation} from 'react-router-dom'
import { requestRecentReflectionDetail, requestAddReflectionsForHabit } from './Requests'
import { Send } from "@styled-icons/fluentui-system-regular/Send"

export const PlanChange = ({ token }) => {
    const [reflection, setReflection] = useState([])
    const location = useLocation()
    const [newReflect, setNewReflect] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        requestRecentReflectionDetail(token, location.state.id)
            .then(res => setReflection(res.data))
        
    }, [token, location.state.id])


    const judge = reflection.reduce((acc,curr)=>(
        acc[curr.day_in_record] = curr.start_end
    ), {})

    function handleSubmit(event) {
        console.log(newReflect)
        event.preventDefault();
        requestAddReflectionsForHabit(token, location.state.id ,newReflect)
        navigate('/habits')
    }

return (
        <div>
            {judge ? 
                <div className='ref-ct'>
                    {reflection.map((reflect, idx)=>(
                        <div className='reflection-questionnaire' key={idx}>
                            <h1>{reflect.user} Reflection on {reflect.date}</h1>
                            
                            <div className="questionReflect">
                                <p>Follow this prompt: I will [habit] at [time] in [location]</p>
                                <p>Old: {reflect.cue_question_1}</p>
                                <textarea value={newReflect.cue_question_1} onChange={e =>setNewReflect({...newReflect, cue_question_1: e.target.value })}/>
                            </div>
                            
                            <div className="questionReflect">
                                <p>Follow this prompt: After [current habit], I will [new habit]</p>
                                <p>Old: {reflect.cue_question_2}</p>
                                <textarea value={newReflect.cue_question_2} onChange={e =>setNewReflect({...newReflect, cue_question_2: e.target.value })}/>
                            </div>
                            <div className="questionReflect">
                                <p>Follow this prompt: Please define a visual cue that would remind you to do habit?</p>
                                <p>Old: {reflect.cue_question_3}</p>
                                <textarea value={newReflect.cue_question_3} onChange={e =>setNewReflect({...newReflect, cue_question_3: e.target.value })}/>
                            </div>
                            <div className="questionReflect">
                                <p>Follow this prompt: How will you reward yourself?</p>
                                <p>Old: {reflect.craving_question_1}</p>
                                <textarea value={newReflect.craving_question_1} onChange={e => setNewReflect({...newReflect, craving_question_1: e.target.value })}/>
                            </div>
                            
                            <div className="questionReflect">
                                <p>Follow this prompt: How can I make this habit easy?</p>
                                <p>Old: {reflect.response_question_1}</p>
                                <textarea value={newReflect.response_question_1} onChange={e =>setNewReflect({...newReflect, response_question_1: e.target.value })}/>
                            </div>
                            
                            <div className="questionReflect">
                                <p>Follow this prompt: What are the Progressions?</p>
                                <p>Old: {reflect.response_question_2}</p>
                                <textarea value={newReflect.response_question_2} onChange={e =>setNewReflect({...newReflect, response_question_2: e.target.value })}/>
                            </div>
                        </div>
                    ))}
                    <Send className='send-reflection' onClick={handleSubmit}/>
                </div>
                : 
                <div>
                    {reflection.map((reflect, idx)=>(
                        <div className='reflection-questionnaire' key={idx}>
                            <h1>{reflect.user} Reflection on {reflect.date}</h1>
                            
                           <div className="questionReflect">
                                <p>Follow this prompt: Try to identify a trigger (Environment)</p>
                                <p>Old: {reflect.cue_question_1}</p>
                                <textarea value={newReflect.cue_question_1} onChange={e =>setNewReflect({...newReflect, cue_question_1: e.target.value })}/>
                            </div>
                            
                           <div className="questionReflect">
                                <p>Follow this prompt: Define an alternate behavior</p>
                                <p>Old: {reflect.cue_question_2}</p>
                                <textarea value={newReflect.cue_question_2} onChange={e =>setNewReflect({...newReflect, cue_question_2: e.target.value })}/>
                            </div>
                           <div className="questionReflect">
                                <p>Follow this prompt: What will be your consequence if you do habit?</p>
                                <p>Note: Make this a mild inconvenience</p>
                                
                                <p>Old: {reflect.craving_question_1}</p>
                       
                                <textarea value={newReflect.craving_question_1} onChange={e => setNewReflect({...newReflect, craving_question_1: e.target.value })}/>
                            </div>
                           <div className="questionReflect">
                                <p>Follow this prompt: How can you make your habit hard to do?</p>
                                <p>Old: {reflect.response_question_1}</p>
                                
                                <textarea value={newReflect.response_question_1} onChange={e =>setNewReflect({...newReflect, response_question_1: e.target.value })}/>
                           </div>

                        </div>
                    ))}
                    <Send className='send-reflection' onClick={handleSubmit}/>
                </div>
                }
        </div>
        )
    
}