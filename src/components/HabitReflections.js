import { requestReflectionsForHabit } from './Requests'
import { useEffect, useState } from 'react'
import {  useLocation, Link } from 'react-router-dom'

export const HabitReflection = ({ token }) => {
    const [reflectionList, setReflectionList] = useState([])
    const location = useLocation()

    useEffect(() => {
        requestReflectionsForHabit(token, location.state.id)
            .then(res => setReflectionList(res.data))
    }, [token, location.state.id])

    return (
        <div>
        <h1>Habit Reflections</h1>
            <div>
                <div className='HabitReflections'>{reflectionList.map((reflection, idx) => (
                    <div key={idx}>
                        {/* would like to hav name of habit serialized */}
                        <p>Reflections for { reflection.habit_name } on {reflection.date}</p>
                        {console.log(reflection.id)}
                        <Link  to='/reflection/:reflectionId' state={{ id: reflection.id }}> Record detail</Link>
                        {/* This is where link to record detail would go */}
                    </div>
                ))}
                </div>    
            </div>
        </div>
    )
}