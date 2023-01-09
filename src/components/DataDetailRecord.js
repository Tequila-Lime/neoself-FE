import { requestRecordDetail } from './Requests'
import { useEffect, useState } from 'react'
import { VictoryBar, VictoryChart, VictoryPie,VictoryAxis,VictoryLabel, VictoryLine} from 'victory'


export const DataVisIndivRecord = ({ token,recordId, step }) => {
    const [recordList, setRecordList] = useState([])
    const currentDate = new Date()
    const day = currentDate.getDate()
    const month = currentDate.getMonth() + 1; // January is 0, so we need to add 1
    const year = currentDate.getFullYear();

    let today = `${year}-`;
    if (month < 10) {
      today += `0${month}-`;
    } else {
      today += `${month}-`;
    }
    if (day < 10) {
      today += `0${day}`;
    } else {
      today += `${day}`;
    }

// Needs to pull from questionnaire and a nested record serializer for records
    useEffect(() => {
        requestRecordDetail(token, recordId)
            .then(res => (setRecordList(res.data)
            ))
    }, [token, recordId])

    const colorScale = (percentageComplete) => {
      if (percentageComplete < 33) {
        return "red";
      } else if (percentageComplete < 70) {
        return "orange";
      } else {
        return "green";
      }
    }

    function renderStep(step){
        const formSteps = [
            <>
          {/* {console.log(habitValues.habits_done_today)} */}
            <VictoryPie data={recordList} 
                    innerRadius={100}
                    style={{
                      data: { fill: "blue" }}}
                    labelPosition={"centroid"}
                    labels={({ datum }) => `${(datum.y * 100)}%`}
            />
          </>
            
        ];

        return step < formSteps.length ? formSteps[step] : null;
        }

    return (
        <>
        {/* {console.log(habitValues.days_remaining)} */}
            {renderStep(step)}
        </>
        
    )
}