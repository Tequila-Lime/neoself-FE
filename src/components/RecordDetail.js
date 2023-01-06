
import { requestRecordDetail, requestUpdateRecordDetail } from './Requests'
import { useEffect, useState } from 'react'
import {  useLocation } from 'react-router-dom'
import { CommentBar } from './CommentBar'

export const RecordDetail = ({ token, username }) => {
    const [record, setRecord] = useState([])
    const [step, setStep] = useState(0)
    const location = useLocation()

    useEffect(() => {
        requestRecordDetail(token, location.state.id)
            .then(res => setRecord(res.data))
    }, [token, location.state.id])

    const handleSaveUpdate = (event)=>{
        event.preventDefault()
        requestUpdateRecordDetail(token, location.state.id, record)
        setStep(0)
    }

    const handleUpdate = (event) => {
        event.preventDefault()
        setStep(1)
    }
    const handleBack = (event) => {
        event.preventDefault()
        setStep(step-1)
    }

    function renderStep(step){
        const formSteps = [
        <div className='record-detail'>
                <div className='r-detail-title' >
                    <h1 className='detail-title'>{record.user} Record to {record.habit_name} on {record.date}</h1>
                </div>
                <div className='indent'>    
                <div className='status-input'>
                    <p>Record number {record.daily_record} {record.metric_label}</p>
                    {record.public===false ?<p>Private</p> : <p>Public</p>}
                </div>
                
                {username===record.user && 
                <div className='user-record-details'>
                    <div className='effect-record'>
                        <div>
                            <p> Did cue effect habit?:</p> 
                            {record.cue_dh===false ?<p>❌</p> : <p>✅</p>}
                        </div>
                        <div>
                            <p>Did craving effect habit?: {record.craving_dh}</p>
                            {record.craving_dh===false ?<p>❌</p> : <p>✅</p>}
                        </div>
                        <div>
                            <p>Did Response effect habit?: {record.response_dh}</p>
                            {record.response_dh===false ?<p>❌</p> : <p>✅</p>}
                        </div>
                    </div>
                </div>
                }
                <div className='record-detail-comment'>
                        <p>Comments: </p>
                        <div className='actual-comment'>
                            <p className='bio-text-record'>{record.comment_dh}</p>
                        </div>
                        
                </div>
                <div className='upd-sav-button'>
                {(username===record.user && step===0) && <button className='detail-record-button' onClick={handleUpdate}> Update </button>}
                </div>
                <hr></hr>
                {}
                <CommentBar token={token} recordId={record.id}/>
                {/* where gif and like button will go */}
                </div>
        </div>,
        <div className='record-detail'>
            <div className='r-detail-title' >
                <h1 className='detail-title'>{record.user} Record to {record.habit_name} on {record.date}</h1>
            </div>
            <div className='indent'>    
                <div className='status-input'>
                    <div className='record-info-input'>
                        <input className="record-info-input-num" type='number' value={record.daily_record}
                        onChange={e => setRecord({...record, daily_record: e.target.value})}></input>
                        <p>{record.metric_label}</p>
                    </div>
                    
                    {record.public===false ?<p>Private</p> : <p>Public</p>}
                </div>
            
                {username===record.user && 
                <div className='user-record-details'>
                    <div className='effect-record'>
                        <div>
                            <p> Did cue effect habit?:</p> 
                            <input className="text-box" type='checkbox' checked={record.cue_dh}
                            onChange={e => setRecord({...record, cue_dh: !record.cue_dh})}></input>
                        </div>
                        <div>
                            <p>Did craving effect habit?: {record.craving_dh}</p>
                            <input className="text-box" type='checkbox' checked={record.craving_dh}
                            onChange={e => setRecord({...record, craving_dh: !record.craving_dh})}></input>
                        </div>
                        <div>
                            <p>Did Response effect habit?: {record.response_dh}</p>
                            <input className="text-box" type='checkbox' checked={record.response_dh}
                            onChange={e => setRecord({...record, response_dh: !record.response_dh})}></input>
                        </div>
                    </div>
                </div>
                }
                <div className='record-detail-comment'>
                        <p>Comments: </p>
                        <textarea className='actual-edit-comment' value={record.comment_dh} onChange={e => setRecord({...record, comment_dh: e.target.value })}/>
                </div>
                <div className='upd-sav-button'>
                    {(username===record.user && step===1) && <>
                    <button className='detail-record-button' onClick={handleBack}>Back</button>
                    <button className='detail-record-button' onClick={handleSaveUpdate}> Save </button>
                    </>}
                </div>
            </div>
        </div>
        ,
        <div>
            <h1>test</h1>
        </div>

            ];

            return step < formSteps.length ? formSteps[step] : null;
            }

    return(
        <>
        {renderStep(step)}
        </>
        
    )

    }