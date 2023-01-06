import { useState } from 'react'
import { requestCreateQuestionnaire } from './Requests'
import { useNavigate } from 'react-router-dom';

export const CreateQuestionnaire = ({token}) => {
    const [step, setStep] = useState(0)

    const [startOrEnd, setStartOrEnd] = useState(true)
    const [habitName, setHabitName] = useState()
    const [startToday, setStartToday] = useState(false)
    const [lengthOfHabit, setLengthOfHabit] = useState(30)
    const [monday, setMonday] = useState(true)
    const [tuesday, setTuesday] = useState(true)
    const [wednesday, setWednesday] = useState(true)
    const [thursday, setThursday] = useState(true)
    const [friday, setFriday] = useState(true)
    const [saturday, setSaturday] = useState(true)
    const [sunday, setSunday] = useState(true)
    const [metricLabel, setMetricLabel] = useState()
    const [metricBaseline, setMetricBaseline] = useState(0)
    const [goalBaseline, setGoalBaseline] = useState(0)
    const [notification, setNotification] = useState(true)
    const [questionC1, setQuestionC1] = useState()
    const [questionC2, setQuestionC2] = useState()
    const [questionC3, setQuestionC3] = useState()
    const [questionCR1, setQuestionCR1] = useState()
    const [questionR1, setQuestionR1] = useState()
    const [questionR2, setQuestionR2] = useState()
    const [signature, setSignature] = useState()
    const [publicStatus, setPublicStatus] = useState(true)

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
        "public": `${publicStatus}`
    }

    const handleCreate = (event) => {
        event.preventDefault()

        requestCreateQuestionnaire(token, questionnaireCont) 
        navigate("/")

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
        setPublicStatus(true)
        setSignature('empty')
    }
// have to change the value

    const handleClick = (event) => {
        event.preventDefault()
        if(startOrEnd === true && step ===6){
            setStep(step+1)
        }
        else if(startOrEnd === false && step ===6){
            setStep(13)
        }
        else if(step === 12 ){
            setStep(16)
        }
        else{
            setStep(step+1)
        }
    }

    const handleBegin = (event) => {
        event.preventDefault()
        setStep(0)
    }

    const handlePrevClick = (event) => {
        event.preventDefault()
        if (step === 17 && startOrEnd===true){
            setStep(12)
        }
        else if(step === 13){
            setStep(6)
        }
        else{setStep(step-1)}
    }

    function renderStep(step){
        const formSteps = [
            <div className="questionnaire indent">
                <p>Welcome to Neoself and congratulations on taking the first step towards improving your behavior!</p>
                <p></p>
                <p>Are you starting or ending Habit?</p>
                <div>
                    <input className="text-box" type='checkbox' checked={startOrEnd}
                    onChange={e => setStartOrEnd(!startOrEnd)}></input>
                </div>
            </div>
            ,
            <div className="questionnaire indent">
                <p>What is your habit</p>
                <p>Ex: Reading</p>
                <input className="text-box" placeholder='Ex: Reading' type='text' value={habitName}
                onChange={e => setHabitName(e.target.value)}></input>
                <p>*Just put name of activity*</p>
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
                <p>Over how many days will this habit be tracked?</p>
                <input className="text-box" type='number' value={lengthOfHabit}
                onChange={e => setLengthOfHabit(e.target.value)}></input>
            </div>
            ,
            <div className="questionnaire indent">
                <p>Numeric Value for habit</p>
                <input className="text-box" type='number' value={metricBaseline}
                onChange={e => setMetricBaseline(e.target.value)}></input>

                <p>How will you measure your habit</p>
                <input className="text-box" type='text' placeholder="Ex: min" value={metricLabel}
                    onChange={e => setMetricLabel(e.target.value)}></input>

                <p>Note: If goal is to just do it or not do it, input <b>1 time</b> for this section </p>
            </div>
            ,
            <div className="questionnaire indent">
                <p>Ultimate goal metric for habit</p>
                <input className="text-box" type='number' value={goalBaseline}
                    onChange={e => setGoalBaseline(e.target.value)}></input>
                <p>{metricLabel}</p>
                <p>If no progressions input the same as previous </p>
            </div>
            ,
            <div className="questionnaire indent">
                <p>Follow this prompt: I will [habit] at [time] in [location]</p>
                <p>Ex: I will read at 9pm in my office chair</p>
                <textarea value={questionC1} onChange={e => setQuestionC1(e.target.value)}/>
                {/* <input className="text-box" type='text' value={questionC1}
                    onChange={e => setQuestionC1(e.target.value)}></input> */}
            </div>
            ,
            <div className="questionnaire indent">
                <p>Follow this prompt: After [current habit], I will [new habit]</p>
                <p>Ex: After I take a shower at night, I will read</p>
                <textarea value={questionC2} onChange={e => setQuestionC2(e.target.value)}/>
                {/* <input className="text-box" type='text' value={questionC2}
                onChange={e => setQuestionC2(e.target.value)}></input> */}
            </div>
            ,
            <div className="questionnaire indent">
                <p>Follow this prompt: Please define a visual cue that would remind you to do habit?</p>
                <p>Ex: I will place book on my bed because it is where I go after I take a shower </p>
                <textarea value={questionC3} onChange={e => setQuestionC3(e.target.value)}/>
                {/* <input className="text-box" type='text' value={questionC3}
                onChange={e => setQuestionC3(e.target.value)}></input> */}
            </div>
            ,
            <div className="questionnaire indent">
                <p>Follow this prompt: How will you reward yourself?</p>
                <p>Ex:I will reward myself with more TV time on the weekend</p>
                <textarea value={questionCR1} onChange={e => setQuestionCR1(e.target.value)}/>
                {/* <input className="text-box" type='text' value={questionCR1}
                onChange={e => setQuestionCR1(e.target.value)}></input> */}
            </div>
            ,
            <div className="questionnaire indent">
                <p>Follow this prompt: How can I make this habit easy?</p>
                <p>Ex: When I place the book on my bed it will already be open to the page where I left off</p>
                <textarea value={questionR1} onChange={e => setQuestionR1(e.target.value)}/>
                {/* <input className="text-box" type='text' value={questionR1}
                onChange={e => setQuestionR1(e.target.value)}></input> */}
            </div>
            ,
            <div className="questionnaire indent">
                <p>Follow this prompt: What are the Progressions?</p>
                <p>Ex: I will start by reading for 5 min, then each day read longer by a minute</p>
                <textarea value={questionR2} onChange={e => setQuestionR2(e.target.value)}/>
                {/* <input className="text-box" type='text' value={questionR2}
                onChange={e => setQuestionR2(e.target.value)}></input> */}
            </div>
            ,
            // This is the end habit questions
            <div className="questionnaire indent">
                <p>Follow this prompt: Try to identify a trigger (Environment)</p>
                <p>Ex: When I am stressed I watch too much TV</p>
                <textarea value={questionC1} onChange={e => setQuestionC1(e.target.value)}/>
                {/* <input className="text-box" type='text' value={questionC1}
                onChange={e => setQuestionC1(e.target.value)}></input> */}
            </div>
            ,
            <div className="questionnaire indent">
                <p>Follow this prompt: Define an alternate behavior</p>
                <p>Ex: I can meditate instead of watching TV</p>
                <textarea value={questionC2} onChange={e => setQuestionC2(e.target.value)}/>
                {/* <input className="text-box" type='text' value={questionC2}
                onChange={e => setQuestionC2(e.target.value)}></input> */}
            </div>
            ,
            <div className="questionnaire indent">
                <p>Follow this prompt: What will be your consequence if you do habit?</p>
                <p>Ex: I will add an additional leg day in the gym </p>
                <p>Note: Make this a mild inconvenience</p>
                <textarea value={questionCR1} onChange={e => setQuestionCR1(e.target.value)}/>
                {/* <input className="text-box" type='text' value={questionCR1}
                onChange={e => setQuestionCR1(e.target.value)}></input> */}
            </div>
            ,
            <div className="questionnaire indent">
                <p>Follow this prompt: How can you make habit hard to do?</p>
                <p>Ex: I will unplug the TV after every use</p>
                <textarea value={questionR1} onChange={e => setQuestionR1(e.target.value)}/>
                {/* <input className="text-box" type='text' value={questionR1}
                onChange={e => setQuestionR1(e.target.value)}></input> */}
            </div>
            ,
            <div className="questionnaire indent">
                <p>Do you want all records to be public(can change later)</p>
                <input className="dow" type='checkbox' checked={publicStatus}
                            onChange={e => setPublicStatus(e.target.value)}></input>

                <p>Sign</p>
                <input className="text-box" placeholder='Ex: John Doe' type='text' value={signature}
                onChange={e => setSignature(e.target.value)}></input>
            </div>
        ];

    return step < formSteps.length ? formSteps[step] : null;
    }

    return(
        <form className="habit-form">
            {console.log(step)}
            {renderStep(step)}
            {step <= 15 && (
                <div className='habit-buttons'>
                    {step !== 0 &&
                        <>
                        <button className='button' onClick={handlePrevClick}>Prev</button>
                        <button className='button' onClick={handleBegin}> To start </button>
                        </> }
                    <button className='button' onClick={handleClick}>Next</button>
                </div>
                )}

            {step > 15 &&(
                <div className='habit-buttons'>
                    <button className='button' onClick={handlePrevClick}>Prev</button>
                    {signature === undefined ? null : <button className='button' onClick={handleCreate}> Submit </button>}
                    
                </div>
                )}
        </form>
    )
}