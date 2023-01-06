import React from 'react'
import { useEffect, useState } from 'react'
import { requestHabitRecords, requestResultDetail, requestHabitWeeklogs, requestHabitResults } from './Requests'
import { Link } from 'react-router-dom';

export const HabitPage = ({ token, questionnaireId  }) => {
    /*const [recordList, setRecordList] = useState([])*/
    const [resultsList, setResultsList] = useState([])
    const [weeklogsList, setWeeklogsList] = useState([])
    const location = useLocation()

    useState(() => {
        requestResultDetail(token, location.state.id )
            .then(res => setResultsList(res.data))
        
    }, [token, location.state.id,])

    useState(()=>{
        requestHabitWeeklogs(token, location.state.id)
                    .then(res => setWeeklogsList(res.data))
    }, [token, location.state.id,])

                
    return (
        <div className="habitPage-cont">
            <div className="habitTitle"><h1>Habit for {habitName} </h1></div>
            <div className="Habit-Function_Buttons-cont">
                <Link className="Habit-Function_Button" to='/results/habit/' state={{ id: resultsList.id }}>Habit Results</Link>
                <Link className="Habit-Function_Button" to='/weeklogs/habit/' state={{ id: weeklogsList.id }}>Week Log</Link>
                <Link className="Habit-Function_Button" to='/weeklogs/habit/' state={{ id: weeklog.id }}>Plans</Link>
                <Link className="Habit-Function_Button" to='/weeklogs/habit/' state={{ id: weeklog.id }}>Modify Plan</Link>
            </div>
            <div className="Data-Visualization-Window-cont">
                <div className="Data-Visualization-Window"></div>
            </div>
            <div className="Bottom-Console">
                <div className="Left-Bottom-Console">
                    <div className='HabitRecords'>{recordList.map((record, idx) => (
                        <div key={idx}>
                            {/* would like to hav name of habit serialized */}
                            <p>Record for {} on {}</p>
                            {console.log()}
                            <Link to='/records/:recordId' state={{ id: record.id }}> Record detail</Link>
                            {/* This is where link to record detail would go */}
                        </div>
                    ))}
                    </div>
                </div>
                <div className="Right-Bottom-Console"></div>
            
                <div className="middle-cont">
                    <div className="dash-component">
                        <div className='indent'></div>
                    </div>
                </div>
                <div className="side-cont"></div>
            </div>
        
        </div>
        
    );}