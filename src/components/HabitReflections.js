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

    const name = reflectionList.reduce((acc, ref) =>(
            acc=ref.name
    ),"")
    
    return (
        <div className='habitCont'>
            <div className='habitCont2'>
                <div className='habit-title-1'>
                    <h1>Habit Reflections for {name}</h1>
                </div>
                {console.log(name)}
                    <div className='HabitReflections'>{reflectionList.map((reflection, idx) => (
                        <div className='each-h-reflect' key={idx}>
                            {/* would like to hav name of habit serialized */}
                            <div className='reflect-date'>
                                <p>Reflections for {reflection.date}</p>
                            </div>
                            <div className='reflect-id-link'>
                                <Link  to='/reflection/:reflectionId' state={{ id: reflection.id }}> Record detail</Link>
                            </div>
                            {/* This is where link to record detail would go */}
                        </div>
                        ))}
                    </div>  
                </div>
            </div>
    )
}