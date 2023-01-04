import { useState } from 'react'
import { requestCreateQuestionnaire } from './Requests'
import { useNavigate } from 'react-router-dom';

export const CreateQuestionnaire = ({token}) => {
    const [step, setStep] = useState(0)

    const [startOrEnd, setStartOrEnd] = useState(true)
    const [habitName, setHabitName] = useState('empty')
    const [startToday, setStartToday] = useState(false)
    const [lengthOfHabit, setLengthOfHabit] = useState(30)
    const [monday, setMonday] = useState(true)
    const [tuesday, setTuesday] = useState(true)
    const [wednesday, setWednesday] = useState(true)
    const [thursday, setThursday] = useState(true)
    const [friday, setFriday] = useState(true)
    const [saturday, setSaturday] = useState(true)
    const [sunday, setSunday] = useState(true)
    const [metricLabel, setMetricLabel] = useState('empty')
    const [metricBaseline, setMetricBaseline] = useState(0)
    const [goalBaseline, setGoalBaseline] = useState(0)
    const [notification, setNotification] = useState(true)
    const [questionC1, setQuestionC1] = useState('none')
    const [questionC2, setQuestionC2] = useState('none')
    const [questionC3, setQuestionC3] = useState('none')
    const [questionCR1, setQuestionCR1] = useState('none')
    const [questionR1, setQuestionR1] = useState('none')
    const [questionR2, setQuestionR2] = useState('none')
    const [signature, setSignature] = useState('empty')
    const navigate = useNavigate()

    let questionnaireCont = {
        "start_habit": startOrEnd,
        "habit_name": `${habitName}`,
        "start_today": `${startToday}`,
        "duration": lengthOfHabit,
        "monday": monday,
        "tuesday": tuesday,
        "wednesday": wednesday,
        "thursday": thursday,
        "friday": friday,
        "saturday": saturday,
        "sunday": sunday,
        "metric_label": `${metricLabel}`,
        "metric_baseline": metricBaseline,
        "goal_label": `${metricLabel}`,
        "goal_metric": goalBaseline,
        "opt_in": notification,
        "cue_question_1": `${questionC1}`,
        "cue_question_2": `${questionC2}`,
        "cue_question_3": `${questionC3}`,
        "craving_question_1": `${questionCR1}`,
        "response_question_1": `${questionR1}`,
        "response_question_2": `${questionR2}`,
        "signature": `${signature}`,
    }

    const handleCreate = (event) => {
        event.preventDefault()

        requestCreateQuestionnaire(token, questionnaireCont) 
        navigate("/questionnaires")

        setStartOrEnd(true)
        setHabitName('empty')
        setStartToday(false)
        setLengthOfHabit(30)
        setMonday(true)
        setTuesday(true)
        setWednesday(true)
        setThursday(true)
        setFriday(true)
        setSaturday(true)
        setSunday(true)
        setMetricLabel('empty')
        setMetricBaseline(0)
        setGoalBaseline(0)
        setNotification(true)
        setQuestionC1('empty')
        setQuestionC2('empty')
        setQuestionC3('empty')
        setQuestionCR1('empty')
        setQuestionR1('empty')
        setQuestionR2('empty')
        setSignature('empty')
    }
// have to change the value

    const handleClick = (event) => {
        event.preventDefault()
        if(startOrEnd === true && step ===5){
            setStep(step+1)
        }
        else if(startOrEnd === false && step ===5){
            setStep(12)
        }
        else if(step === 11 ){
            setStep(16)
        }
        else{
            setStep(step+1)
        }
    }

    const handlePrevClick = (event) => {
        event.preventDefault()
        if (step === 16 && startOrEnd===true){
            setStep(11)
        }
        else if(step === 12){
            setStep(5)
        }
        else{setStep(step-1)}
    }

    function renderStep(step){
        const formSteps = [
            <div className="questionnaire indent">
                <p>Are you starting or ending Habit?</p>
                <div>
                    <input className="text-box" type='checkbox' checked={startOrEnd}
                    onChange={e => setStartOrEnd(!startOrEnd)}></input>
                </div>
            </div>
            ,
            <div className="questionnaire indent">
                <p>What is your habit</p>
                <input className="text-box" type='text' value={habitName}
                onChange={e => setHabitName(e.target.value)}></input>
            </div>
            ,
            <div className="questionnaire indent">
                <p>What days of the week will you do habit?</p>
                <div className="weekdays">
                    <div>
                        <p>Sunday</p>
                        <input className="dow" type='checkbox' checked={sunday}
                            onChange={e => setSunday(!sunday)}></input>
                    </div>
                    <div>
                        <p>Monday</p>
                        <input className="dow" type='checkbox' checked={monday}
                            onChange={e => setMonday(!monday)}></input>
                    </div>
                    <div>
                        <p>Tuesday</p>
                        <input className="dow" type='checkbox' checked={tuesday}
                            onChange={e => setTuesday(!tuesday)}></input>
                    </div>
                    <div>
                        <p>Wednesday</p>
                        <input className="dow" type='checkbox' checked={wednesday}
                            onChange={e => setWednesday(!wednesday)}></input>
                    </div>
                    <div>
                        <p>Thursday</p>
                        <input className="dow" type='checkbox' checked={thursday}
                            onChange={e => setThursday(!thursday)}></input>
                    </div>
                    <div>
                        <p>Friday</p>
                        <input className="dow" type='checkbox' checked={friday}
                            onChange={e => setFriday(!friday)}></input>
                    </div>
                    <div>
                        <p>Saturday</p>
                        <input className="dow" type='checkbox' checked={saturday}
                            onChange={e => setSaturday(!saturday)}></input>
                    </div>
                </div>
                <p>Are you starting today?</p>
                <input className="text-box" type='checkbox' checked={startToday}
                onChange={e => setStartToday(!startToday)}></input>
            </div>
            ,
            <div className="questionnaire indent">
                <p>Over how many days will this habit be done?</p>
                <input className="text-box" type='number' value={lengthOfHabit}
                onChange={e => setLengthOfHabit(e.target.value)}></input>
            </div>
            ,
            <div className="questionnaire indent">
                <p>Numeric Value for habit</p>
                <input className="text-box" type='number' value={metricBaseline}
                onChange={e => setMetricBaseline(e.target.value)}></input>

                <p>How will you measure your habit</p>
                <input className="text-box" type='text' value={metricLabel}
                    onChange={e => setMetricLabel(e.target.value)}></input>
            </div>
            ,
            <div className="questionnaire indent">
                <p>Ultimate goal metric for habit</p>
                <input className="text-box" type='number' value={goalBaseline}
                    onChange={e => setGoalBaseline(e.target.value)}></input>
                <p>{metricLabel}</p>
            </div>
            ,
            <div className="questionnaire indent">
                <p>START HABIT Cue Question 1?</p>
                <textarea value={questionC1} onChange={e => setQuestionC1(e.target.value)}/>
                {/* <input className="text-box" type='text' value={questionC1}
                    onChange={e => setQuestionC1(e.target.value)}></input> */}
            </div>
            ,
            <div className="questionnaire indent">
                <p>START HABIT Cue Question 2?</p>
                <textarea value={questionC2} onChange={e => setQuestionC2(e.target.value)}/>
                {/* <input className="text-box" type='text' value={questionC2}
                onChange={e => setQuestionC2(e.target.value)}></input> */}
            </div>
            ,
            <div className="questionnaire indent">
                <p>START HABIT Cue Question 3?</p>
                <textarea value={questionC3} onChange={e => setQuestionC3(e.target.value)}/>
                {/* <input className="text-box" type='text' value={questionC3}
                onChange={e => setQuestionC3(e.target.value)}></input> */}
            </div>
            ,
            <div className="questionnaire indent">
                <p>START HABIT Craving Question 1?</p>
                <textarea value={questionCR1} onChange={e => setQuestionCR1(e.target.value)}/>
                {/* <input className="text-box" type='text' value={questionCR1}
                onChange={e => setQuestionCR1(e.target.value)}></input> */}
            </div>
            ,
            <div className="questionnaire indent">
                <p>START HABIT response Question 1?</p>
                <textarea value={questionR1} onChange={e => setQuestionR1(e.target.value)}/>
                {/* <input className="text-box" type='text' value={questionR1}
                onChange={e => setQuestionR1(e.target.value)}></input> */}
            </div>
            ,
            <div className="questionnaire indent">
                <p>START HABIT response Question 2?</p>
                <textarea value={questionR2} onChange={e => setQuestionR2(e.target.value)}/>
                {/* <input className="text-box" type='text' value={questionR2}
                onChange={e => setQuestionR2(e.target.value)}></input> */}
            </div>
            ,
            <div className="questionnaire indent">
                <p>END HABIT Cue Question 1?</p>
                <textarea value={questionC1} onChange={e => setQuestionC1(e.target.value)}/>
                {/* <input className="text-box" type='text' value={questionC1}
                onChange={e => setQuestionC1(e.target.value)}></input> */}
            </div>
            ,
            <div className="questionnaire indent">
                <p>END HABIT Cue Question 2?</p>
                <textarea value={questionC2} onChange={e => setQuestionC2(e.target.value)}/>
                {/* <input className="text-box" type='text' value={questionC2}
                onChange={e => setQuestionC2(e.target.value)}></input> */}
            </div>
            ,
            <div className="questionnaire indent">
                <p>END HABIT Craving Question 1?</p>
                <textarea value={questionCR1} onChange={e => setQuestionCR1(e.target.value)}/>
                {/* <input className="text-box" type='text' value={questionCR1}
                onChange={e => setQuestionCR1(e.target.value)}></input> */}
            </div>
            ,
            <div className="questionnaire indent">
                <p>END HABIT response Question 1?</p>
                <textarea value={questionR1} onChange={e => setQuestionR1(e.target.value)}/>
                {/* <input className="text-box" type='text' value={questionR1}
                onChange={e => setQuestionR1(e.target.value)}></input> */}
            </div>
            ,
            <div className="questionnaire indent">
                <p>Sign</p>
                <input className="text-box" type='text' value={signature}
                onChange={e => setSignature(e.target.value)}></input>
            </div>
        ];

    return step < formSteps.length ? formSteps[step] : null;
    }

    return(
        <form className="habit-form">
            {renderStep(step)}
            {step <= 15 && (
                <div className='habit-buttons'>
                    {step !== 0 && <button className='button' onClick={handlePrevClick}>Prev</button>}
                    <button className='button' onClick={handleClick}>Next</button>
                </div>
                )}

            {step > 15 &&(
                <div className='habit-buttons'>
                    <button className='button' onClick={handlePrevClick}>Prev</button>
                    {signature === "empty" ? null : <button className='button' onClick={handleCreate}> Submit </button>}
                    
                </div>
                )}
        </form>
    )
}