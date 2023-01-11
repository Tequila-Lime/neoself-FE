
import { requestRecordDetail, requestUpdateRecordDetail } from './Requests'
import { useEffect, useState } from 'react'
import {  useLocation } from 'react-router-dom'
import { Construct } from "@styled-icons/ionicons-sharp/Construct"
import { Save } from "@styled-icons/boxicons-regular/Save"
import { ArrowBack } from "@styled-icons/boxicons-regular/ArrowBack"


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
                    <div className="r-title">
                        <h1 className='detail-title'>Record for {record.habit_name}</h1>
                        {(username===record.user && step===0) && 
                        <Construct className='rec-det-icon' onClick={handleUpdate}/>
                        }
                    </div>
                </div>   
                <div className='status-input'>
                    <div className='status-input-m'>
                        <div className='status-status'>
                            {record.public===false ?<p>Private</p> : <p>Public</p>}
                            <p>{record.date}</p>
                        </div>
                        <div className='status-metric'>
                            <div className='big-status'>
                                <p>{record.daily_record}</p>
                                <p>{record.metric_label}</p>
                            </div>
                            <div className='lil-status'>
                                {/* {console.log(record)} */}
                                {/* <p>{record.week_reflection.metric_baseline} Short</p>
                                <p>{record.week_reflection.goal_metric} Long</p> */}
                            </div>
                            
                        </div>
                    </div>
                    <div className='status-input-q'>
                        <div>
                            <p>Did it conflict with other plans?</p>
                            {record.cue_dh===false ?<p>no</p> : <p>yes</p>}
                        </div>
                        <div>
                            <p>Did you reward yourself?</p>
                            {record.craving_dh===false ?<p>no</p> : <p>yes</p>}
                        </div>
                        <div>
                            <p>Was it attainable?</p>
                            {record.response_dh===false ?<p>no</p> : <p>yes</p>}
                        </div>
                    </div>   
                </div>
                <div className='record-detail-comment'>
                        <p>Comment: </p>
                        <div className='actual-comment'>
                            <p className='bio-text-record'>{record.comment_dh}</p>
                        </div>
                </div>
                {/* where gif and like button will go */}
            </div>
        ,
        <div className='record-detail'>
                <div className='r-detail-title' >
                    <div className="r-title">
                        <h1 className='detail-title'>Record for {record.habit_name}</h1>
                        <div className='btn-cmnt'>
                            <ArrowBack className='rec-det-icon' onClick={handleBack}/>
                            <Save className='rec-det-icon' onClick={handleSaveUpdate}/>
                        </div>
                    </div>
                </div>   
                <div className='status-input'>
                    <div className='status-input-m'>
                        <div className='status-status'>
                            <div className='pub-txt'>
                                {record.public===false ?<p>Private</p> : <p>Public</p>}
                                <input className="text-box" type='checkbox' checked={record.public}
                                onChange={e => setRecord({...record, public: !record.public})}></input>
                            </div>
                            <p>{record.date}</p>
                        </div>
                        <div className='status-metric'>
                            <div className='big-status'>
                                <input className="record-info-input-num" type='number' value={record.daily_record}
                                    onChange={e => setRecord({...record, daily_record: e.target.value})}></input>
                                <p>{record.metric_label}</p>
                            </div>
                            <div className='lil-status'>
                                {/* {console.log(record)} */}
                                {/* <p>{record.week_reflection.metric_baseline} Short</p>
                                <p>{record.week_reflection.goal_metric} Long</p> */}
                            </div>
                            
                        </div>
                    </div>
                    <div className='status-input-q'>
                        <div>
                        <p>Did it conflict with other plans?</p>
                            <input className="text-box" type='checkbox' checked={record.cue_dh}
                            onChange={e => setRecord({...record, cue_dh: !record.cue_dh})}></input>
                        </div>
                        <div>
                        <p>Did you reward yourself?</p>
                            <input className="text-box" type='checkbox' checked={record.craving_dh}
                            onChange={e => setRecord({...record, craving_dh: !record.craving_dh})}></input>
                        </div>
                        <div>
                        <p>Was it attainable?</p>
                            <input className="text-box" type='checkbox' checked={record.response_dh}
                            onChange={e => setRecord({...record, response_dh: !record.response_dh})}></input>
                        </div>
                    </div>   
                </div>
                <div className='record-detail-comment'>
                        <p>Comment: </p>
                        <div className='actual-comment'>
                        <textarea className='actual-edit-comment' value={record.comment_dh} onChange={e => setRecord({...record, comment_dh: e.target.value })}/>
                        </div>
                </div>
                {/* where gif and like button will go */}
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