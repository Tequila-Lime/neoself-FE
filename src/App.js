import './App.css';
import { Login } from './components/Login'
import { Header } from './components/Header'
import { Users } from './components/UserList'
import { Friends } from './components/FriendList'
import { Register } from './components/Register'
import { Routes, Route } from "react-router-dom"
import useLocalStorageState from 'use-local-storage-state';
import { CreateReflection } from './components/CreateReflection';
import { AllQuestionnaires } from './components/AllQuestionnaires'
import { SingleQuestionnaire } from './components/SingleQuestionnaire'
import { CreateQuestionnaire } from './components/CreateQuestionnaire'
import { UserRecords } from './components/UserRecords'
import { FriendRecords } from './components/FriendRecords'
import { HabitRecords } from './components/HabitRecords';
import { RecordDetail } from './components/RecordDetail';
import { UpdateRecord } from './components/UpdateRecord';
import { TodayRecords } from './components/TodayRecords';

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
            <Route path="/Reflection" element={<CreateReflection username={username} token={token}/>} />
            <Route path="/create" element={<CreateQuestionnaire username={username} token={token}/>} />
            <Route path="/questionnaire/:questionnaireId" element={<SingleQuestionnaire token={token} isLoggedIn={isLoggedIn}/> }/>
            <Route path="/questionnaires" element={<AllQuestionnaires username={username} token={token}/>} />
            <Route path="/user-records" element={<UserRecords username={username} token={token}/>} />
            <Route path="/friend-records" element={<FriendRecords username={username} token={token}/>} />
            <Route path="/records-today" element={<TodayRecords username={username} token={token}/>} />
            <Route path="/records/habit/:recordId" element={<HabitRecords token={token} isLoggedIn={isLoggedIn}/> }/>
            <Route path="/records/:recordId" element={<RecordDetail username={username} token={token} isLoggedIn={isLoggedIn}/> }/>
            <Route path="/records/update/:recordId" element={<UpdateRecord username={username} token={token} isLoggedIn={isLoggedIn}/> }/>
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