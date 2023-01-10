import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useLocation  } from 'react-router-dom';
import { HabitRecords } from './HabitRecords';
import { DataVisHabit } from './DataHabitRecord';
import { requestRecentReflectionDetail } from './Requests'
 
export const HabitPage = ({ token }) => {
    const [reflection, setReflection]= useState([])
    const location = useLocation()
    
    useEffect(() => {
        requestRecentReflectionDetail(token, location.state.id)
            .then(res => setReflection(res.data))
    }, [token, location.state.id])
    

    return (
        <div className='habit-page-total'>
        {reflection.map((reflect, idx)=>(
                        
        <div key={idx} className="habitPage-cont"> 
            <div className="habitTitle">
                <h1>Habit for {reflect.name}</h1>
            </div>
            <div className='under-habit-title'>
                <div className='goals-habit'>
                    <div className='big-num-goal'>
                        {console.log(reflect)}
                        <p>Short</p>
                        <p className='number-display'>{reflect.metric_baseline}</p>
                        <p>{reflect.metric_label}</p>
                    </div>
                    <div className='big-num-goal'>
                        <p>Long</p>
                        <p className='number-display'>{reflect.goal_metric}</p>
                        <p>{reflect.metric_label}</p>
                    </div>
                </div>
                <div className="Habit-Function_Buttons-cont">
                    <div className='pretend-button'>
                        <Link className="Habit-Function_Button" to={`/reflection-habit/${location.state.id}`} state={{ id: location.state.id }}>Plans</Link>
                    </div>
                    <div className='pretend-button'>
                        <Link className="Habit-Function_Button" to='/plan-change' state={{ id: location.state.id }}>Modify Plan</Link>
                    </div>
                </div> 
            </div>
            <div className='dataviz-record'>
                <div className='record-s-viz'>
                    <h3>Habit Records</h3>
                    <HabitRecords token={token} habitId={location.state.id} />
                </div>
                <div className='data-s-viz'>
                    <div>
                        <DataVisHabit className="data-chart-in" token={token} habitId={location.state.id} step={5}/>
                    </div>

                    <div>
                        <DataVisHabit className="data-chart-in" token={token} habitId={location.state.id} step={6}/>
                    </div>

                    <div>
                        <DataVisHabit className="data-chart-in" token={token} habitId={location.state.id} step={3}/>
                    </div>
                        
                        
                    
                </div>
            </div>
        </div>
        
        ))}
        </div>
    );}