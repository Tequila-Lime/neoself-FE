import { OwnProfile } from "./OwnProfile"
import { OwnHabits } from "./SelfHabits"
import { UserRecords } from './UserRecords';

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
                    <div className="prof-data-visual"></div>
                    <div className="prof-data-visual"></div>
                </div>
            </div>
        </div>
    )
}