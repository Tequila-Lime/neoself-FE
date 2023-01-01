import { requestHabitWeeklogs } from './Requests'
import { useEffect, useState } from 'react'
import { useLocation,Link } from "react-router-dom"

export const HabitWeeklogs = ({ token }) => {
    const [weeklogList, setWeeklogList] = useState([])
    const location = useLocation()


    useEffect(() => {
        requestHabitWeeklogs(token, location.state.id)
            .then(res => setWeeklogList(res.data))
    }, [token, location.state.id])

    return (
        <div>
            <h1>Your weeklogs</h1>
            <div>
                <div className='questionnaires'>{weeklogList.map((log, idx) => (
                    <div key={idx}>
                        <p>{log.questionnaire} log made on {log.date}</p>
                        <Link  to='/weeklogs/:id' state={{ id: log.id }}> Log detail</Link>
                    </div>
                ))}
                </div>    
            </div>
        </div>
    )
}