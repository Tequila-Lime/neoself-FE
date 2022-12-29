import { useState } from 'react'
import { requestCreateReflection } from './Requests'; 

export const CreateReflection = ({token})=> {
    const [questionC1, setQuestionC1] = useState('none')
    const [questionC2, setQuestionC2] = useState('none')
    const [questionC3, setQuestionC3] = useState('none')
    const [questionCR1, setQuestionCR1] = useState('none')
    const [questionR1, setQuestionR1] = useState('none')
    const [questionR2, setQuestionR2] = useState('none')
    const [metricBaseline, setMetricBaseline] = useState(0)
    const [goalMetric, setGoalMetric] = useState('empty')

    let reflectionCont = {
        "cue_question_1": `${questionC1}`,
        "cue_question_2": `${questionC2}`,
        "cue_question_3": `${questionC3}`,
        "craving_question_1": `${questionCR1}`,
        "response_question_1": `${questionR1}`,
        "response_question_2": `${questionR2}`,
        "metric_baseline": metricBaseline,
        "goal_metric": `${goalMetric}`,  
}

    const handleCreate = (event) => {
        event.preventDefault()

        requestCreateReflection(token, reflectionCont)

        setQuestionC1('empty')
        setQuestionC2('empty')
        setQuestionC3('empty')
        setQuestionCR1('empty')
        setQuestionR1('empty')
        setQuestionR2('empty')
        setMetricBaseline(0)
        setGoalMetric('empty')

}

return (
    <section>
            <h1 className="page-title title is-4 has-text-centered">Weekly Reflection</h1>
            <div className="columns is-flex is-justify-content-space-around">
                <div className="create-columns column is-3 box has-text-centered">
                    <p>Cue Question #1</p>
                    <input className="text-box" type='text' value={questionC1}
                    onChange={e => setQuestionC1(e.target.value)}></input>
                    <p>Cue Question #2</p>
                    <input className="text-box" type='text' value={questionC2}
                    onChange={e => setQuestionC2(e.target.value)}></input>
                    <p>Cue Question #3</p>
                    <input className="text-box" type='text' value={questionC3}
                    onChange={e => setQuestionC3(e.target.value)}></input>
                    <p>Craving Question #1</p>
                    <input className="text-box" type='text' value={questionCR1}
                    onChange={e => setQuestionCR1(e.target.value)}></input>
                    <p>Response Question #1</p>
                    <input className="text-box" type='text' value={questionR1}
                    onChange={e => setQuestionR1(e.target.value)}></input>
                    <p>Response Question #2</p>
                    <input className="text-box" type='text' value={questionR2}
                    onChange={e => setQuestionR2(e.target.value)}></input>
                    <p>Metric Baseline</p>
                    <input className="number" type='number' value={metricBaseline}
                    onChange={e => setMetricBaseline(e.target.value)}></input>
                    <p>Goal Metric</p>
                    <input className="text-box" type='text' value={goalMetric}
                    onChange={e => setGoalMetric(e.target.value)}></input>
                    <button className="reflection button" onClick={handleCreate}>Submit</button>
                </div>
            </div>
    </section>)
}

// Still need to attach to questionnaire, foreign key