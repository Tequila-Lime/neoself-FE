import { requestAllReflections } from './Requests'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

export const AllReflections = ({ token }) => {
    const [reflectionList, setReflection] = useState([])

    useEffect(() => {
        requestAllReflections(token)
            .then(res => setReflection(res.data))
    }, [token])

return (
    <div>
        <h1>Your Reflections</h1>
        <div>
        <div className='reflections'>{reflectionList.map((reflection, idx) => (
                    <div key={idx}>
                        <p>{reflection.user} created on {reflection.date}</p>
                        {console.log(reflection.id)}
                        <Link  to='/reflection/:reflectionId' state={{ id: reflection.id }}> See reflection details</Link>
                        <>     </>
                        <Link  to='/records/habit/:recordId' state={{ id: reflection.id }}> See all records</Link>
                    </div>
            ))}
            </div>    
        </div>
    </div>
    )}