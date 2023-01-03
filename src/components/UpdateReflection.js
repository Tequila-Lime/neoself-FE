import { requestUpdateReflectionDetail, requestReflectionDetail } from './Requests'
import { useState, useEffect } from 'react'
import {  useLocation, useNavigate } from 'react-router-dom'

export const UpdateReflection = ({ token, username }) => {
    const [reflection, setReflection] = useState([])
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        requestReflectionDetail(token, location.state.id)
            .then(res => setReflection(res.data))
    }, [token, location.state.id])

    const handleUpdate = (event)=>{
        event.preventDefault()
        requestUpdateReflectionDetail(token, location.state.id, reflection)
        navigate("/")
    }

return (
    <div className="create-columns column is-3 box has-text-centered">
        <h1>{reflection.user} Reflection on {reflection.date}</h1>
            <p>Reflection number {reflection.id}</p>
        <p>Cue Question #1</p>
        <input className="text-box" type='text' checked={reflection.cue_question_1}
        onChange={e => setReflection(e.target.value)}></input>
        <p>Cue Question #2</p>
        <input className="text-box" type='text' checked={reflection.cue_question_2}
        onChange={e => setReflection(e.target.value)}></input>
        <p>Cue Question #3</p>
        <input className="text-box" type='text' checked={reflection.cue_question_3}
        onChange={e => setReflection(e.target.value)}></input>
        <p>Craving Question #1</p>
        <input className="text-box" type='text' checked={reflection.craving_question_1}
        onChange={e => setReflection(e.target.value)}></input>
        <p>Response Question #1</p>
        <input className="text-box" type='text' checked={reflection.response_question_1}
        onChange={e => setReflection(e.target.value)}></input>
        <p>Response Question #2</p>
        <input className="text-box" type='text' checked={reflection.response_question_2}
        onChange={e => setReflection(e.target.value)}></input>
        <p>Metric Baseline</p>
        <input className="number" type='number' checked={reflection.metric_baseline}
        onChange={e => setReflection(e.target.value)}></input>
        <p>Goal Metric</p>
        <input className="text-box" type='text' checked={reflection.goal_metric}
        onChange={e => setReflection(e.target.value)}></input>
        <button onClick={handleUpdate}>Update</button>
    </div>
)
}