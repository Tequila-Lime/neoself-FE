import { requestDataUserRecords } from './Requests'
import { useEffect, useState } from 'react'
import { VictoryBar, VictoryChart, VictoryPie,VictoryAxis,VictoryLabel, VictoryLine} from 'victory'


export const DataVisualization = ({ token, step }) => {
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
      requestDataUserRecords(token)
            .then(res => (setRecordList(res.data)
            ))
    }, [token])

    const todayRecords = recordList.filter((record)=>record.date === today)

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

    const todayHabitCompletions = todayRecords.reduce((acc, curr) => {
      if (curr.date === today) {
        if (!acc[curr.date]){
          if (curr.filled_in){
            acc[curr.date] = {
              numerator: 1,
              denominator: 1
            }}
          else{
            acc[curr.date] = {
              numerator: 0,
              denominator: 1
            }
          }}
        else{
          if (curr.filled_in){
            acc[curr.date] = {
              numerator: acc[curr.date].numerator + 1,
              denominator: acc[curr.date].denominator + 1
            }}
          else{
            acc[curr.date] = {
              numerator: acc[curr.date].numerator,
              denominator: acc[curr.date].denominator + 1
            }
          }
          }
      }
      
      return acc;
      }, {});
    
    const today_completion = Object.keys(todayHabitCompletions).map(key => ({
      x:  key,
      y:  todayHabitCompletions[key].numerator / todayHabitCompletions[key].denominator
    }));

  const today_completion_math = Object.entries(today_completion).reduce((acc, [key, value]) => {
      acc.x = key;
      acc.y = value.y;
      return acc;
    }, {});
    // console.log(today_completion)

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
      // x
      "habits_done_today":today_completion
    }

    // variables for complete circle styles
    const percentageComplete = today_completion_math.y * 100;

    // console.log(habitValues.habits_done_today)
    const colorScale = (percentageComplete) => {
      if (percentageComplete < 33) {
        return "red";
      } else if (percentageComplete < 73) {
        return "orange";
      } else {
        return "green";
      }
    }

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
          // Chart percent of habits done today
          <div className='chart-holder'>
          {/* {console.log(habitValues.habits_done_today)} */}

            <VictoryPie data={habitValues.habits_done_today} 
                    innerRadius={100}
                    style={{
                      data: { fill: colorScale(percentageComplete) }}}
                    labelPosition={"centroid"}
                    labels={({ datum }) => `${(datum.y * 100)}%`}
            />
            
          </div>
            ,
            // Chart 2 habit occurance
            <>
            {/* {console.log(habitValues.habit_occurancy)} */}
            <VictoryChart 
              domainPadding={50}
              >
                <VictoryBar
                barRatio={.8}
                  style={{ data: { fill: "#46C8D8" } }}
                  data={habitValues.habit_occurancy}
                horizontal
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
                <VictoryLabel text="Habits meeting Base Goal" x={225} y={30} style={{ fontSize: 24 }} textAnchor="middle" />
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
                <VictoryLabel text="Habit Meeting Goal Metric" x={225} y={30} style={{ fontSize: 24 }} textAnchor="middle" />
                <VictoryBar
                barRatio={.8}
                  style={{ data: { fill: "#46C8D8" } }}
                  data={habitValues.completion_to_goal}
                horizontal
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
                <VictoryLabel text="Habit Meeting Major Goal Metric" x={225} y={30} style={{ fontSize: 24 }} textAnchor="middle" />
                <VictoryBar
                barRatio={.8}
                  style={{ data: { fill: "#46C8D8" } }}
                  data={habitValues.percent_to_ultimate_goal}
                horizontal
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