import { requestDataUserRecords } from './Requests'
import { useEffect, useState } from 'react'
import { VictoryBar, VictoryChart, VictoryPie,VictoryAxis } from 'victory'


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
    
    const days_left_in_habit = recordList.reduce((acc, curr) => {
        if (!acc[curr.habit_name]) {
          acc[curr.habit_name] = curr.length;
        }
        if (curr.length - curr.day_in_habit >= 0) {
          acc[curr.habit_name] = curr.length - curr.day_in_habit;
        } else{
          acc[curr.habit_name] = 0;
        }
        return acc;
      }, {});
    
    const habit_remaining_days = Object.keys(days_left_in_habit).map(key => ({
        x:  key,
        y:  days_left_in_habit[key]
      }));

    const completionOverTime = recordList.reduce((acc, curr) => {
      if (!acc[curr.date]) {
        acc[curr.date] = {
          total: 1,
          count: 1
        };
      } else if(curr.filled_in) {
        acc[curr.date].total += 1;
        acc[curr.date].count += 1;
      }else{
        acc[curr.date].count += 1
      }
      
      return acc;
      }, {});
    
    for (const date in completionOverTime) {
      completionOverTime[date] = completionOverTime[date].count/ completionOverTime[date].total;
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
      let numerator = 0
      let denominator = 0
      if (curr.date === today) {
        if (curr.filled_in){
          numerator++
          denominator++
        }
        else(
          denominator++
        )
      } 

      acc[curr.date] = numerator/denominator
      
      return acc;
      }, {});

    const today_completion = Object.keys(todayHabitCompletions).map(key => ({
      x:  key,
      y:  todayHabitCompletions[key]
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
      "habit_occurancy":habit_frequency,
      "days_remaining":habit_remaining_days,
      "habits_occurance_per_date": day_completions,
      "completion_to_goal": recorded_metric_goal,
      "percent_to_ultimate_goal": recorded_major_goal,
      "improvement_per_day_major": timeImprovement,
      "improvement_per_day_minor": timeImprovementMinor,
      "habits_done_today":today_completion
    }

    function renderStep(step){
        const formSteps = [
          // chart 0
            <VictoryChart
            domainPadding={20}
            >
                <VictoryAxis
                    dependentAxis
                    domain={[0,1.5]}
                    label="days"

                />
                <VictoryAxis
                    crossAxis
                    label="Days left in habit"
                    style={{
                      axisLabel: { padding: 30}
                    }}
                />
                <VictoryBar data={habitValues.improvement_per_day_minor} />
            </VictoryChart>
            ,

          // Chart 1
            <VictoryPie data={habit_frequency}/>
        ];

        return step < formSteps.length ? formSteps[step] : null;
        }

    return (
        <>
        <div className='chart'>
            {renderStep(step)}
        </div>
        </>
        
    )
}