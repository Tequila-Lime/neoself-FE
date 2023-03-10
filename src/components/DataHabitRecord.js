import { requestHabitRecords } from './Requests'
import { useEffect, useState } from 'react'
import { VictoryBar, VictoryChart,VictoryAxis,VictoryLabel, VictoryLine} from 'victory'


export const DataVisHabit = ({ token,habitId, step }) => {
    const [recordList, setRecordList] = useState([])

// Needs to pull from questionnaire and a nested record serializer for records
    useEffect(() => {
        requestHabitRecords(token, habitId)
            .then(res => (setRecordList(res.data)
            ))
    }, [token, habitId])


    const habit_occurance = recordList.reduce((acc, curr) => {
        if (!acc[curr.habit_name]) {
          acc[curr.habit_name] = 0;
        }
        if (curr.filled_in) {
          acc[curr.habit_name]++;
        }
        return acc;
      }, {});

    const habit_frequency = Object.keys(habit_occurance).map(key => ({
        x: key,
        y: habit_occurance[key]
      }));
// doesn't work don't care any more
    const days_left_in_habit = {};
      for (const record of recordList) {
        if (!days_left_in_habit[record.habit_name] && days_left_in_habit[record.habit_name] !== 0) {

          days_left_in_habit[record.habit_name] = (record.length - (record.day_in_habit));
        }
        // console.log(days_left_in_habit)
      }
    const habit_remaining_days = Object.keys(days_left_in_habit).map(key => ({
        x:  key,
        y:  days_left_in_habit[key]
      }));
    
      // console.log(habit_remaining_days)

    const completionOverTime = recordList.reduce((acc, curr) => {
      if (!acc[curr.date]) {
          acc[curr.date] = {
                total: 1,
                count: 1
              }
        } 
      if(curr.filled_in) {
        acc[curr.date].total += 1;
        acc[curr.date].count += 1;
      }else{
        acc[curr.date].count += 1
      }
      
      return acc;
      }, {});
    
    for (const date in completionOverTime) {
      completionOverTime[date] = completionOverTime[date].total/ completionOverTime[date].count;
    }

    const day_completions = Object.keys(completionOverTime).map(key => ({
      x:  key,
      y:  completionOverTime[key]
    }));

    const completionToMetric = recordList.reduce((acc, curr) => {
      if (!acc[curr.habit_name]) {
        acc[curr.habit_name] = {
          total: (curr.daily_record/curr.week_reflection.metric_baseline),
          count: 1
        };
      } else {
        acc[curr.habit_name].total += (curr.daily_record/curr.week_reflection.metric_baseline);
        acc[curr.habit_name].count += 1;
        
      }
      
      return acc;
    }, {});
    
    // Calculate the average for each habit_name
    for (const habit_name in completionToMetric) {
      completionToMetric[habit_name] = completionToMetric[habit_name].total / completionToMetric[habit_name].count;
    }

    const recorded_metric_goal = Object.keys(completionToMetric).map(key => ({
      x:  key,
      y:  completionToMetric[key]
    }));
    
    const completionToMajorGoal = recordList.reduce((acc, curr) => {
      if (!acc[curr.habit_name]) {
        acc[curr.habit_name] = {
          total: (curr.daily_record/curr.week_reflection.goal_metric),
          count: 1
        };
      } else {
        acc[curr.habit_name].total += (curr.daily_record/curr.week_reflection.goal_metric);
        acc[curr.habit_name].count += 1;
        
      }
        return acc;
      }, {} );

    for (const habit_name in completionToMajorGoal) {
      completionToMajorGoal[habit_name] = completionToMajorGoal[habit_name].total / completionToMajorGoal[habit_name].count;
    }

    const recorded_major_goal = Object.keys(completionToMajorGoal).map(key => ({
      x:  key,
      y:  completionToMajorGoal[key]
    }));

    const improvement = recordList.reduce((acc, curr) => {
      if (!acc[curr.date]) {
        acc[curr.date] = {
          total: (curr.daily_record/curr.week_reflection.goal_metric),
          count: 1
        };
      } else {
        acc[curr.date].total += (curr.daily_record/curr.week_reflection.goal_metric);
        acc[curr.date].count += 1;
        
      }
        return acc;
      }, {} );

    for (const date in improvement) {
      improvement[date] = improvement[date].total / improvement[date].count;
    }

    const timeImprovement = Object.keys(improvement).map(key => ({
      x:  key,
      y:  improvement[key]
    }));

    const improvementMinor = recordList.reduce((acc, curr) => {
      if (!acc[curr.date]) {
        acc[curr.date] = {
          total: (curr.daily_record/curr.week_reflection.metric_baseline),
          count: 1
        };
      } else {
        acc[curr.date].total += (curr.daily_record/curr.week_reflection.metric_baseline);
        acc[curr.date].count += 1;
        
      }
        return acc;
      }, {} );

    

    for (const date in improvementMinor) {
      improvementMinor[date] = improvementMinor[date].total / improvementMinor[date].count;
    }

    const timeImprovementMinor = Object.keys(improvementMinor).map(key => ({
      x:  key,
      y:  improvementMinor[key]
    }));

      // container with all the relevant data
    const habitValues = {
      // x
      "habit_occurancy":habit_frequency,
      // x
      "days_remaining":habit_remaining_days,
      // x
      "habits_occurance_per_date": day_completions,
      // x
      "completion_to_goal": recorded_metric_goal,
      // x
      "percent_to_ultimate_goal": recorded_major_goal,
      // x
      "improvement_per_day_major": timeImprovement,
      // x
      "improvement_per_day_minor": timeImprovementMinor,
    }

    // variables for complete circle styles

    function renderStep(step){
        const formSteps = [
          // chart 0 Days remaining 
            <VictoryChart
            domainPadding={20}
            >
                <VictoryAxis
                    dependentAxis
                    domain={[0,1.5]}
                    label="Days Left"
                    style={{
                      axisLabel: { padding: 30}
                    }}
                />
                <VictoryAxis
                    crossAxis
                    
                />
                <VictoryBar data={habitValues.days_remaining} />
            </VictoryChart>
            ,
            // Chart 2 habit occurance
            <>
            {/* {console.log(habitValues.habit_occurancy)} */}
            <VictoryChart 
              domainPadding={50}
              >
                <VictoryBar
                barRatio={5}
                  style={{ data: { fill: "#46C8D8" } }}
                  data={habitValues.habit_occurancy}
                labels={({ datum }) => `${datum.y}`}
                          />
            </VictoryChart>
              </>
            ,
            // Chart 3 Habit completed per date
            <>
            {/* {console.log(habitValues.habits_occurance_per_date)} */}
            <VictoryChart>
                <VictoryAxis style={{ tickLabels: { display: "none" }}}/>
                <VictoryAxis dependentAxis />
                <VictoryLabel text="# of habits completed over time" x={225} y={30} style={{ fontSize: 24 }} textAnchor="middle" />
                {/* <VictoryAxis dependentAxis tickValues={[]} /> */}
                <VictoryLine domain={[0,4]} data={habitValues.habits_occurance_per_date} />
            </VictoryChart>
            </>
            ,
            // Chart 4 Improvement per day Minor: likely hood to meet minor goal each day
            <VictoryChart >
                <VictoryAxis style={{ tickLabels: { display: "none" }}}/>
                <VictoryAxis dependentAxis label="1.0 = 100%" style={{
                      axisLabel: { padding: 35}
                    }}/>
                <VictoryLabel text="Record over time to Short Term" x={225} y={30} style={{ fontSize: 24 }} textAnchor="middle" />
                {/* <VictoryAxis dependentAxis tickValues={[]} /> */}
                <VictoryLine data={habitValues.improvement_per_day_minor}  />
            </VictoryChart>
            ,
            // Chart 5 Improvement per day Major: what percent of major goal 
            <VictoryChart >
            <VictoryAxis style={{ tickLabels: { display: "none" }}}/>
            <VictoryAxis dependentAxis label="1.0 = 100%" style={{
                  axisLabel: { padding: 35}
                }}/>
            <VictoryLabel text="Habits meeting Extended Goal" x={225} y={30} style={{ fontSize: 24 }} textAnchor="middle" />
            {/* <VictoryAxis dependentAxis tickValues={[]} /> */}
            <VictoryLine data={habitValues.improvement_per_day_major }  />
        </VictoryChart>
        ,
        // Chart 6 How average daily_record of habit compared to minor goal
        <>
          <VictoryChart 
              domainPadding={50}
              >
                <VictoryAxis />
                <VictoryLabel text="Habit Meeting Short Term Goal" x={225} y={30} style={{ fontSize: 24 }} textAnchor="middle" />
                <VictoryBar
                barRatio={.8}
                  style={{ data: { fill: "#46C8D8" } }}
                  data={habitValues.completion_to_goal}
                labels={({ datum }) =>`${Math.round(datum.y * 100)}%`}
                          />
            </VictoryChart>
        </>
        ,
        // Chart 7 how average daily_record of habit compared to major goal
        <>
          <VictoryChart 
              domainPadding={50}
              >
                <VictoryAxis />
                <VictoryLabel text="Habit Meeting Long Term Goal" x={225} y={30} style={{ fontSize: 24 }} textAnchor="middle" />
                <VictoryBar
                barRatio={.8}
                  style={{ data: { fill: "#46C8D8" } }}
                  data={habitValues.percent_to_ultimate_goal}
                labels={({ datum }) =>`${Math.round(datum.y * 100)}%`}
                          />
            </VictoryChart>
        </>
        ];

        return step < formSteps.length ? formSteps[step] : null;
        }

    return (
        <>
        {/* {console.log(habitValues.days_remaining)} */}
        <div className='chart'>
            {renderStep(step)}
        </div>
        </>
        
    )
}