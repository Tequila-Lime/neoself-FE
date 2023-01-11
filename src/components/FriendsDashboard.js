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
                
                <div className="dash-component-nb">
                    <div className='indent'>
                        <h3>Friends Records</h3>
                        <FriendRecords token={token}/>
                    </div>
                </div>
            </div>
            <div className="side-cont">
                
                <div className="dash-component-nb">
                    <h3>Friends</h3>
                    <Friends token={token}/>
                </div>
            </div>
            
        </div>
    )
}