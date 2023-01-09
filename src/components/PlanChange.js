import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { RecentestHabitReflection } from './RecentestHabitReflection'

export const PlanChange = ({ token, habitId }) => {
    const [reflection, setReflection] = useState([])
    const location = useLocation()

return (
    <div>
        <div>
        <h1>Change Plan</h1>
        </div>
        <div>
            {console.log(location.state.id)}
            <RecentestHabitReflection token={token} idx={location.state.id} />
        </div>
        <div>
            
        </div>
        
        
    </div>
    )
}