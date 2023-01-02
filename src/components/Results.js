import { requestResults } from './Requests'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

export const Results = ({ token }) => {
    const [resultList, setResultList] = useState([])

    useEffect(() => {
        requestResults(token)
            .then(res => setResultList(res.data))
    }, [token])

    return (
        <div>
            <h1>Your habits</h1>
            <div>
                <div className='questionnaires'>{resultList.map((result, idx) => (
                    <div key={idx}>
                        {console.log(result)}
                        <p>{result.questionnaire} result</p>
                        <Link  to='/results/:id' state={{ id: result.id }}> Details </Link>
                    </div>
                ))}
                </div>    
            </div>
        </div>
    )
}