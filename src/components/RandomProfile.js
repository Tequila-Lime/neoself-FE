import { OtherProfile } from "./OtherProfile";
import { OtherUserRecords } from "./OtherUserRecords";
import { useLocation } from "react-router-dom"

export const RandomProfile = ({ token }) => {
    const location = useLocation()

    return (
        <div className="profile-cont">
            <OtherProfile token={token} id={location.state.id}/>
            <div className="record-data">
                <div className="other-user-record-data">
                    <h3>Records</h3>
                    <OtherUserRecords token={token} id={location.state.id}/>
                </div>
                {/* <div className="record-data-r">
                    <div className="prof-data-visual"></div>
                    <div className="prof-data-visual"></div>
                </div> */}
            </div>
        </div>
    )
}