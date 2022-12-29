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
        if (startOrEnd === true){
            setStep(step + 1)
        } else { setStep(step + 2 ) }
    }

    const handlePrevClick = (event) => {
        event.preventDefault()
        setStep(0)
    }

    function renderStep(step){
        const formSteps = [
        <div>
            <p>What is your habit</p>
            <input className="text-box" type='text' value={habitName}
                onChange={e => setHabitName(e.target.value)}></input>
            
            {/* want button to change to true if previously false and be false if previously true */}
            <p>Start or end habit</p>
            <input className="text-box" type='checkbox' checked={startOrEnd}
                onChange={e => setStartOrEnd(!startOrEnd)}></input>

            <p>Are you starting today?</p>
            <input className="text-box" type='checkbox' checked={startToday}
                onChange={e => setStartToday(!startToday)}></input>

            <p>How many days will you do this habit</p>
            <input className="text-box" type='number' value={lengthOfHabit}
                onChange={e => setLengthOfHabit(e.target.value)}></input>
            
            <div className="weekdays">
                <p>Sunday</p>
                <input className="text-box" type='checkbox' checked={sunday}
                    onChange={e => setSunday(!sunday)}></input>
                
                <p>Monday</p>
                <input className="text-box" type='checkbox' checked={monday}
                    onChange={e => setMonday(!monday)}></input>
                
                <p>Tuesday</p>
                <input className="text-box" type='checkbox' checked={tuesday}
                    onChange={e => setTuesday(!tuesday)}></input>

                <p>Wednesday</p>
                <input className="text-box" type='checkbox' checked={wednesday}
                    onChange={e => setWednesday(!wednesday)}></input>
                
                <p>Thursday</p>
                <input className="text-box" type='checkbox' checked={thursday}
                    onChange={e => setThursday(!thursday)}></input>
                
                <p>Friday</p>
                <input className="text-box" type='checkbox' checked={friday}
                    onChange={e => setFriday(!friday)}></input>

                <p>Saturday</p>
                <input className="text-box" type='checkbox' checked={saturday}
                    onChange={e => setSaturday(!saturday)}></input>
            </div>

            <p>Numeric Value for habit</p>
            <input className="text-box" type='number' value={metricBaseline}
                onChange={e => setMetricBaseline(e.target.value)}></input>

            <p>How will you measure your habit</p>
            <input className="text-box" type='text' value={metricLabel}
                onChange={e => setMetricLabel(e.target.value)}></input>

            <p>Ultimate goal metric for habit</p>
            <input className="text-box" type='number' value={goalBaseline}
                onChange={e => setGoalBaseline(e.target.value)}></input>
            <p>{metricLabel}</p>

            <p>Would you like to opt-in to notifications?</p>
            <input className="text-box" type='checkbox' checked={notification}
                onChange={e => setNotification(!notification)}></input>        
        </div>,
            // next part
        <div>
            <h1>version 1</h1>
            <p>Cue Question 1?</p>
            <input className="text-box" type='text' value={questionC1}
                onChange={e => setQuestionC1(e.target.value)}></input>

            <p>Cue Question 2?</p>
            <input className="text-box" type='text' value={questionC2}
                onChange={e => setQuestionC2(e.target.value)}></input>
            
            <p>Cue Question 3?</p>
            <input className="text-box" type='text' value={questionC3}
                onChange={e => setQuestionC3(e.target.value)}></input>

            <p>Craving Question 1?</p>
            <input className="text-box" type='text' value={questionCR1}
                onChange={e => setQuestionCR1(e.target.value)}></input>
            
            <p>response Question 1?</p>
            <input className="text-box" type='text' value={questionR1}
                onChange={e => setQuestionR1(e.target.value)}></input>

            <p>response Question 2?</p>
            <input className="text-box" type='text' value={questionR2}
                onChange={e => setQuestionR2(e.target.value)}></input>
            
            <p>Sign</p>
            <input className="text-box" type='text' value={signature}
                onChange={e => setSignature(e.target.value)}></input>
            
        </div>,
        <div>
            <h1>version 2</h1>
            <p>Cue Question 1?</p>
            <input className="text-box" type='text' value={questionC1}
                onChange={e => setQuestionC1(e.target.value)}></input>

            <p>Cue Question 2?</p>
            <input className="text-box" type='text' value={questionC2}
                onChange={e => setQuestionC2(e.target.value)}></input>
            
            <p>Cue Question 3?</p>
            <input className="text-box" type='text' value={questionC3}
                onChange={e => setQuestionC3(e.target.value)}></input>

            <p>Craving Question 1?</p>
            <input className="text-box" type='text' value={questionCR1}
                onChange={e => setQuestionCR1(e.target.value)}></input>
            
            <p>response Question 1?</p>
            <input className="text-box" type='text' value={questionR1}
                onChange={e => setQuestionR1(e.target.value)}></input>

            <p>response Question 2?</p>
            <input className="text-box" type='text' value={questionR2}
                onChange={e => setQuestionR2(e.target.value)}></input>
            
            <p>Sign</p>
            <input className="text-box" type='text' value={signature}
                onChange={e => setSignature(e.target.value)}></input>
        </div>
        ];

    return step < formSteps.length ? formSteps[step] : null;
    }

    return(
        <form>
            {renderStep(step)}
            {step === 0 && (
                <>
                <button onClick={handleClick}>Next</button>
                <br />
                </>
                )}

            {step > 0 &&(
                <>
                <button onClick={handlePrevClick}>Prev</button>
                <button onClick={handleCreate}> Submit </button>
                </>
                )}
        </form>
    )
}