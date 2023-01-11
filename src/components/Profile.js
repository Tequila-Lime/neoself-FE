import { OwnProfile } from "./OwnProfile"
import { OwnHabits } from "./SelfHabits"
import { UserRecords } from './UserRecords';
import { DataVisualization } from "./DataAllRecord";

export const Profile = ({ token }) => {

    return (
        <div className="profile-cont">
            <OwnProfile token={token}/>
            <OwnHabits token={token}/>
            <div className="record-data">
                <div className="record-data-l ">
                    <h3>User Records</h3>
                    <UserRecords token={token}/>
                </div>
                <div className="record-data-r">
                    <DataVisualization token={token} step={5} />
                    <DataVisualization token={token} step={6}/>
                    <DataVisualization token={token} step={7}/>
                </div>
            </div>
        </div>
    )
}