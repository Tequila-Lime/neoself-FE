import './App.css';
import { Login } from './components/Login'
import { Header } from './components/Header'
import { Users } from './components/UserList'
import { Friends } from './components/FriendList'
import { Register } from './components/Register'
import { Routes, Route } from "react-router-dom"
import useLocalStorageState from 'use-local-storage-state';
import { AllReflections } from './components/AllReflections';
import { CreateReflection } from './components/CreateReflection';
import { SingleReflection } from './components/SingleReflection';
import { UpdateReflection } from './components/UpdateReflection';
import { AllQuestionnaires } from './components/AllQuestionnaires'
import { SingleQuestionnaire } from './components/SingleQuestionnaire'
import { CreateQuestionnaire } from './components/CreateQuestionnaire'
import { UserRecords } from './components/UserRecords'
import { FriendRecords } from './components/FriendRecords'
import { HabitRecords } from './components/HabitRecords';
import { RecordDetail } from './components/RecordDetail';
import { UpdateRecord } from './components/UpdateRecord';
import { TodayRecords } from './components/TodayRecords';
import { OtherUserRecords } from './components/OtherUserRecords';
import { Weeklogs } from './components/WeekLogs';
import { HabitWeeklogs } from './components/HabitWeeklogs';
import { WeeklogsDetail } from './components/WeekLogDetail';
import { Results } from './components/Results';
import { ResultDetail } from './components/ResultDetail';
import { Dashboard } from './components/Dashboard';
import { FriendDashboard } from './components/FriendsDashboard';
import { UserSearchBar } from './components/UserSearchBar';

function App({ cardData }) {
  const [token, setToken] = useLocalStorageState("token", null)
  const [username, setUsername] = useLocalStorageState("username", '') 

  const setAuth = (token, username) => {
    setToken(token)
    setUsername(username)
  }

  const isLoggedIn = token

  return (

    <section className="container">

      {isLoggedIn ? (
        <div>
          <Header token={token} setAuth={setAuth} username={username}/>
          <Routes>
            <Route path="/UserList" element={<Users username={username} token={token}/>} />
            <Route path="/FriendList" element={<Friends token={token}/>} />
            <Route path="/createReflection" element={<CreateReflection username={username} token={token}/>} />
            <Route path="/reflection" element={<AllReflections username={username} token={token}/>} />
            <Route path="/reflection/:reflectionId" element={<SingleReflection token={token} isLoggedIn={isLoggedIn}/> }/>
            <Route path="/reflection/update/:reflectionId" element={<UpdateReflection username={username} token={token} isLoggedIn={isLoggedIn}/> }/>
            <Route path="/create" element={<CreateQuestionnaire username={username} token={token}/>} />
            <Route path="/questionnaire/:questionnaireId" element={<SingleQuestionnaire token={token} isLoggedIn={isLoggedIn}/> }/>
            <Route path="/questionnaires" element={<AllQuestionnaires username={username} token={token}/>} />
            <Route path="/user-records" element={<UserRecords username={username} token={token}/>} />
            <Route path="/friend-records" element={<FriendRecords username={username} token={token}/>} />
            <Route path="/records-today" element={<TodayRecords username={username} token={token}/>} />
            <Route path="/profile-records/:recordId" element={<OtherUserRecords username={username} token={token}/>} />
            <Route path="/records/habit/:recordId" element={<HabitRecords token={token} isLoggedIn={isLoggedIn}/> }/>
            <Route path="/records/:recordId" element={<RecordDetail username={username} token={token} isLoggedIn={isLoggedIn}/> }/>
            <Route path="/records/update/:recordId" element={<UpdateRecord username={username} token={token} isLoggedIn={isLoggedIn}/> }/>
            <Route path="/weeklogs" element={<Weeklogs username={username} token={token}/>} />
            <Route path="/habit-weeklogs/:id" element={<HabitWeeklogs username={username} token={token}/>} />
            <Route path="/weeklogs/:id" element={<WeeklogsDetail username={username} token={token}/>} />
            <Route path="/results" element={<Results username={username} token={token}/>} />
            <Route path="/results/:id" element={<ResultDetail username={username} token={token}/>} />
            <Route path="/dashboard" element={<Dashboard username={username} token={token}/>} />
            <Route path="/friends" element={<FriendDashboard username={username} token={token}/>} />
            <Route path="/user-search-bar" element={<UserSearchBar username={username} token={token}/>} />
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      ) : (
        <div>
          <Routes>
          <Route path="/" element={<Login setAuth={setAuth} />} />
          <Route path="/register" element={<Register setAuth={setAuth}/>} />
          </Routes>
        </div>)}


    </section>

  );
}

export default App;