import { useState } from 'react'
import { requestCreateQuestionnaire } from './Requests'
import { useNavigate } from 'react-router-dom';
import { SwitchLeft } from "@styled-icons/material/SwitchLeft"
import { SwitchRight } from "@styled-icons/material/SwitchRight"
import { CheckboxUnchecked } from "@styled-icons/fluentui-system-filled/CheckboxUnchecked"
import { CheckboxChecked } from "@styled-icons/fluentui-system-regular/CheckboxChecked"
import { ArrowLeftSquare } from "@styled-icons/bootstrap/ArrowLeftSquare"
import { ArrowRightSquare } from "@styled-icons/bootstrap/ArrowRightSquare"
import { Restart } from "@styled-icons/remix-line/Restart"
import { Send } from "@styled-icons/fluentui-system-regular/Send"

export const CreateQuestionnaire = ({token}) => {
    const [step, setStep] = useState(0)

    const [startOrEnd, setStartOrEnd] = useState(true)
    const [habitName, setHabitName] = useState("")
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
    const [questionC1, setQuestionC1] = useState("")
    const [questionC2, setQuestionC2] = useState("")
    const [questionC3, setQuestionC3] = useState("")
    const [questionCR1, setQuestionCR1] = useState("")
    const [questionR1, setQuestionR1] = useState("")
    const [questionR2, setQuestionR2] = useState("")
    const [signature, setSignature] = useState("")
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

    const handleBegin = (event) => {
        event.preventDefault()
        setStep(0)
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
                <p>Beginning of Questionnaire:</p>
                <p className='question'>Are you starting or ending Habit?</p>
                <div className='switch-cmt'>
                    <p>Start</p>
                    {startOrEnd ? 
                    <SwitchRight  className='cmt-icon'  onClick={e => setStartOrEnd(!startOrEnd)} />
                    :
                     <SwitchLeft className='cmt-icon' onClick={e => setStartOrEnd(!startOrEnd)} />
                    }
                    <p>End</p>
                    {console.log(startOrEnd)}
                </div>
            </div>
            ,
            <div className="questionnaire indent">
                <p className='question'>What is your habit</p>
                <p>Ex: Reading</p>
                <input className="hbt-name-input" placeholder='Ex: Reading' type='text' value={habitName}
                onChange={e => setHabitName(e.target.value)}></input>
                <p>*Just put name of activity*</p>
            </div>
            ,
            <div className="questionnaire indent">
                <p className='question'>What days of the week will you do habit?</p>
                <div className="weekdays">
                    <div className='sp-day'>
                        <p>Sun</p>
                        {sunday ? 
                        <CheckboxChecked  className='cmt-icon'  onClick={e => setSunday(!sunday)} />
                        :
                        <CheckboxUnchecked className='cmt-icon' onClick={e => setSunday(!sunday)} />
                        }
                        
                    </div>
                    <div className='sp-day'>
                        <p>Mon</p>
                        {monday ? 
                        <CheckboxChecked  className='cmt-icon'  onClick={e => setMonday(!monday)} />
                        :
                        <CheckboxUnchecked className='cmt-icon' onClick={e => setMonday(!monday)} />
                        }
                        
                    </div>
                    <div className='sp-day'>
                        <p>Tue</p>
                        {tuesday ? 
                        <CheckboxChecked  className='cmt-icon'  onClick={e => setTuesday(!tuesday)} />
                        :
                        <CheckboxUnchecked className='cmt-icon' onClick={e => setTuesday(!tuesday)} />
                        }
                        
                    </div>
                    <div className='sp-day'>
                        <p>Wed</p>
                        {wednesday ? 
                        <CheckboxChecked  className='cmt-icon'  onClick={e => setWednesday(!wednesday)} />
                        :
                        <CheckboxUnchecked className='cmt-icon' onClick={e => setWednesday(!wednesday)} />
                        }
                       
                    </div>
                    <div className='sp-day'>
                        <p>Thu</p>
                        {thursday ? 
                        <CheckboxChecked  className='cmt-icon'  onClick={e => setThursday(!thursday)} />
                        :
                        <CheckboxUnchecked className='cmt-icon' onClick={e => setThursday(!thursday)} />
                        }
                        
                    </div>
                    <div className='sp-day'>
                        <p>Fri</p>
                        {friday ? 
                        <CheckboxChecked  className='cmt-icon'  onClick={e => setFriday(!friday)} />
                        :
                        <CheckboxUnchecked className='cmt-icon' onClick={e => setFriday(!friday)} />
                        }

                    </div>
                    <div className='sp-day'>
                        <p>Sat</p>
                        {saturday ? 
                        <CheckboxChecked  className='cmt-icon'  onClick={e => setSaturday(!saturday)} />
                        :
                        <CheckboxUnchecked className='cmt-icon' onClick={e => setSaturday(!saturday)} />
                        }

                    </div>
                </div>
                <p className='question'>Are you starting today?</p>

                {startToday ? 
                        <CheckboxChecked  className='cmt-icon'  onClick={e => setStartToday(!startToday)} />
                        :
                        <CheckboxUnchecked className='cmt-icon' onClick={e => setStartToday(!startToday)} />
                        }
            </div>
            ,
            <div className="questionnaire indent">
                <p className='question'>Over how many days will this habit be tracked?</p>
                <div className='fill-in'>
                    <input className="numeric-input" type='number' value={lengthOfHabit}
                onChange={e => setLengthOfHabit(e.target.value)}></input>
                <p>Days</p>
                </div>
                
            </div>
            ,
            <div className="questionnaire indent">
                <p className='question'>Please put Metric for habit (Short term)</p>
                <p>Ex: I will read 30 min</p>
                <div className='fill-in'>
                    <p> I will {habitName}</p>
                    {/* <div className='widerpls'> */}
                        <input className="numeric-input" type='number' value={metricBaseline}
                        onChange={e => setMetricBaseline(e.target.value)}></input>

                        <input className="numeric-input" type='text' placeholder="Ex: min" value={metricLabel}
                            onChange={e => setMetricLabel(e.target.value)}></input>
                    {/* </div> */}
                </div>
               

                <p>Note: If goal is to just do it or not do it, input <b>1 time</b> for this section </p>
            </div>
            ,
            <div className="questionnaire indent">
                <p className='question'>Long term goal metric for habit</p>
                <div className='fill-in'>
                    <input className="numeric-input" type='number' value={goalBaseline}
                    onChange={e => setGoalBaseline(e.target.value)}></input>
                <p>{metricLabel}</p>
                </div>
                
                <p>If no progressions input the same as previous </p>
            </div>
            ,
            // start habit questions
            <div className="questionnaire indent">
                <p className='question'>Follow this prompt: I will [habit] at [time] in [location]</p>
                <p>Ex: I will read at 9pm in my office chair</p>
                <textarea className="long-answer" value={questionC1} onChange={e => setQuestionC1(e.target.value)}/>
                {/* <input className="text-box" type='text' value={questionC1}
                    onChange={e => setQuestionC1(e.target.value)}></input> */}
            </div>
            ,
            <div className="questionnaire indent">
                <p className='question'>Follow this prompt: After [current habit], I will [new habit]</p>
                <p>Ex: After I take a shower at night, I will read</p>
                <textarea className="long-answer" value={questionC2} onChange={e => setQuestionC2(e.target.value)}/>
                {/* <input className="text-box" type='text' value={questionC2}
                onChange={e => setQuestionC2(e.target.value)}></input> */}
            </div>
            ,
            <div className="questionnaire indent">
                <p className='question'>Follow this prompt: Please define a visual cue that would remind you to do habit?</p>
                <p>Ex: I will place book on my bed because it is where I go after I take a shower </p>
                <textarea className="long-answer" value={questionC3} onChange={e => setQuestionC3(e.target.value)}/>
                {/* <input className="text-box" type='text' value={questionC3}
                onChange={e => setQuestionC3(e.target.value)}></input> */}
            </div>
            ,
            <div className="questionnaire indent">
                <p className='question'>Follow this prompt: How will you reward yourself?</p>
                <p>Ex: I will reward myself with more TV time on the weekend</p>
                <textarea className="long-answer" value={questionCR1} onChange={e => setQuestionCR1(e.target.value)}/>
                {/* <input className="text-box" type='text' value={questionCR1}
                onChange={e => setQuestionCR1(e.target.value)}></input> */}
            </div>
            ,
            <div className="questionnaire indent">
                <p className='question'>Follow this prompt: How can I make this habit easy?</p>
                <p>Ex: When I place the book on my bed it will already be open to the page where I left off</p>
                <textarea className="long-answer" value={questionR1} onChange={e => setQuestionR1(e.target.value)}/>
                {/* <input className="text-box" type='text' value={questionR1}
                onChange={e => setQuestionR1(e.target.value)}></input> */}
            </div>
            ,
            <div className="questionnaire indent">
                <p className='question'>Follow this prompt: What are the Progressions?</p>
                <p>Ex: I will start by reading for 5 min, then each day read longer by a minute</p>
                <textarea className="long-answer" value={questionR2} onChange={e => setQuestionR2(e.target.value)}/>
                {/* <input className="text-box" type='text' value={questionR2}
                onChange={e => setQuestionR2(e.target.value)}></input> */}
            </div>
            ,
            // This is the end habit questions
            <div className="questionnaire indent">
                <p className='question'>Follow this prompt: Try to identify a trigger (Environment)</p>
                <p>Ex: When I am stressed I watch too much TV</p>
                <textarea className="long-answer" value={questionC1} onChange={e => setQuestionC1(e.target.value)}/>
                {/* <input className="text-box" type='text' value={questionC1}
                onChange={e => setQuestionC1(e.target.value)}></input> */}
            </div>
            ,
            <div className="questionnaire indent">
                <p className='question'>Follow this prompt: Define an alternate behavior</p>
                <p>Ex: I can meditate instead of watching TV</p>
                <textarea className="long-answer" value={questionC2} onChange={e => setQuestionC2(e.target.value)}/>
                {/* <input className="text-box" type='text' value={questionC2}
                onChange={e => setQuestionC2(e.target.value)}></input> */}
            </div>
            ,
            <div className="questionnaire indent">
                <p className='question'>Follow this prompt: What will be your consequence if you do habit?</p>
                <p>Ex: I will add an additional leg day in the gym </p>
                <p>Note: Make this a mild inconvenience</p>
                <textarea className="long-answer" value={questionCR1} onChange={e => setQuestionCR1(e.target.value)}/>
                {/* <input className="text-box" type='text' value={questionCR1}
                onChange={e => setQuestionCR1(e.target.value)}></input> */}
            </div>
            ,
            <div className="questionnaire indent">
                <p className='question'>Follow this prompt: How can you make your habit hard to do?</p>
                <p>Ex: I will unplug the TV after every use</p>
                <textarea className="long-answer" value={questionR1} onChange={e => setQuestionR1(e.target.value)}/>
                {/* <input className="text-box" type='text' value={questionR1}
                onChange={e => setQuestionR1(e.target.value)}></input> */}
            </div>
            ,
            <div className="questionnaire indent">
                <p className='question'>Do you want all records to be public(can change later)</p>
                <div className='switch-cmt'>
                    <p>Start</p>
                    {publicStatus ? 
                    <SwitchRight  className='cmt-icon'  onClick={e => setPublicStatus(!publicStatus)} />
                    :
                     <SwitchLeft className='cmt-icon' onClick={e => setPublicStatus(!publicStatus)} />
                    }
                    <p>End</p>
                </div>

                <p className='question'>Sign</p>
                <input className="hbt-name-input" placeholder='Ex: John Doe' type='text' value={signature}
                onChange={e => setSignature(e.target.value)}></input>
            </div>
        ];

    return step < formSteps.length ? formSteps[step] : null;
    }

    return(
        <form className="habit-form">
            {console.log(questionnaireCont)}
            {renderStep(step)}
            
            <hr></hr>

            {step <= 15 && (
                <div className='habit-buttons'>
                    {step !== 0 &&
                        <>
                        <ArrowLeftSquare className='cmt-icon' onClick={handlePrevClick} />
                        <Restart className='cmt-icon' onClick={handleBegin} />
                        </> }
                    <ArrowRightSquare className='cmt-icon' onClick={handleClick}/>
                </div>
                )}
            {step > 15 &&(
                <div className='habit-buttons'>
                    <ArrowLeftSquare className='cmt-icon' onClick={handlePrevClick} />
                    
                    {signature === undefined ? null : 
                    <>
                        <Send className='cmt-icon' onClick={handleCreate} />
                    </>
                    }
                    
                </div>
                )}
        </form>
    )
}