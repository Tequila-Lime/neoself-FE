import { FriendRecords } from './FriendRecords'; 
import { UserSearchBar } from './UserSearchBar';
import { Friends } from './FriendList';

export const FriendDashboard = ({ token }) => {

    return (
        <div className="dashboard-cont">
            <div className="side-cont">
                    <UserSearchBar token={token}/>
            </div>
            <div className="middle-cont">
                <div className="dash-component">
                    <div className='indent'>
                        <h3>Friends Records</h3>
                        <FriendRecords token={token}/>
                    </div>
                </div>
            </div>
            <div className="side-cont">
                <div className="dash-component">
                    <Friends token={token}/>
                </div>
            </div>
            
        </div>
    )
}