import { requestWeeklogs } from './Requests'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

export const Weeklogs = ({ token }) => {
    const [weeklogList, setWeeklogList] = useState([])

    useEffect(() => {
        requestWeeklogs(token)
            .then(res => setWeeklogList(res.data))
    }, [token])

    return (
        <div>
            <h1>Your weeklogs</h1>
            <div>
                <div className='questionnaires'>{weeklogList.map((log, idx) => (
                    <div key={idx}>
                        <p>log made on {log.date} for {log.questionnaire}</p>
                        <Link  to='/weeklogs/:id' state={{ id: log.id }}> Log detail</Link>
                    </div>
                ))}
                </div>    
            </div>
        </div>
    )
}