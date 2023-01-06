import React from 'react'
import { Link, useLocation  } from 'react-router-dom';
import { HabitRecords } from './HabitRecords';
 
export const HabitPage = ({ token }) => {
    const location = useLocation()
                
    return (
        <div className="habitPage-cont">
            <div className="habitTitle"><h1>Habit for  </h1></div>
            <div className="Habit-Function_Buttons-cont">
                <Link className="Habit-Function_Button" to='/results/habit/' state={{ id: location.state.id }}>Habit Results</Link>
                <Link className="Habit-Function_Button" to='/weeklogs/habit/' state={{ id: location.state.id }}>Week Log</Link>
                <Link className="Habit-Function_Button" to='/reflection-habit/:id' state={{ id: location.state.id }}>Plans</Link>
                <Link className="Habit-Function_Button" to='/createReflection' state={{ id: location.state.id }}>Modify Plan</Link>
            </div>
            <div className="Data-Visualization-Window-cont">
                <div className="Data-Visualization-Window"></div>
            </div>
            <div className="Bottom-Console">
                <div className="Left-Bottom-Console">
                    <HabitRecords token={token} habitId={location.state.id} />
                </div>
                <div className="Right-Bottom-Console"></div>
            
                <div className="middle-cont">
                    <div className="">
                        <div className='indent'></div>
                    </div>
                </div>
                <div className="side-cont"></div>
            </div>
        
        </div>
        
    );}