import axios from 'axios'
// ✅
export const requestNewUser = (username, password) => {
    const url = 'https://neoself-be-service.onrender.com/auth/users/'

    const response = axios.post(url, {
        username: username,
        password: password})
        return response
}
// ✅
export const requestLogin = (username, password) => {
    const url = 'https://neoself-be-service.onrender.com/auth/token/login'

    const response = axios.post(url, {
        username: username,
        password: password})
        return response
}
// ✅
export const requestLogout = (token) => {
    const url = 'https://neoself-be-service.onrender.com/auth/token/logout'

    const response = axios.post(url,
        { headers: { Authorization: `Token ${token}`, }, })
        return response
    }

// ✅
export const requestAllUsers = (token) => {
    const url = 'https://neoself-be-service.onrender.com/user/all/'
    
    const response = axios.get(url,
        { headers: { Authorization: `Token ${token}`}})
        return response
    }

// ✅
export const requestFriends = (token) => {
    const url = 'https://neoself-be-service.onrender.com/friends/'

    const response = axios.get(url,
        { headers: { Authorization: `Token ${token}`}})
        return response
}

export const requestUserInfo = (token, username) => {
    const url = `https://neoself-be-service.onrender.com/profile/search/?q=${username}`

    const response = axios.get(url,
        { headers: { Authorization: `Token ${token}`}})
        return response
}

// ✅
export const requestAddFriend = (token, friendId) => {
    const url = 'https://neoself-be-service.onrender.com/friends/'

    const response = axios.post(url,

        {friend: friendId},
    
        {headers: { Authorization: `Token ${token}`}})
        return response
}

// ✅
export const requestRemoveFriend = (token, friendshipId) => {
    const url = `https://neoself-be-service.onrender.com/friends/${friendshipId}`

    const response = axios.delete(url,
        {headers: { Authorization: `Token ${token}`}})
        return response
}

export const requestCreateReflection = (token, reflectionContainer) => {
    const url = `https://neoself-be-service.onrender.com/reflection/`

    const response = axios.post(url, reflectionContainer,
        {headers: { Authorization: `Token ${token}`}})
        return response
}

export const requestAllReflections = (token) => {
    const url = 'https://neoself-be-service.onrender.com/reflection/'

    const response = axios.get(url,
        { headers: { Authorization: `Token ${token}`, }, })
        return response
}

export const requestReflectionsForHabit = (token, reflectionId) => {
    const url = `https://neoself-be-service.onrender.com/questionnaire/${reflectionId}/reflection/`

    const response = axios.get(url,
        { headers: { Authorization: `Token ${token}`, }, })
        return response
}

export const requestReflectionDetail = (token, reflectionId) => {
    const url = `https://neoself-be-service.onrender.com/reflection/${reflectionId}`

    const response = axios.get(url,
        { headers: { Authorization: `Token ${token}`, }, })
        return response
}

// ✅
export const requestAllQuestionnaires = (token) => {
    const url = 'https://neoself-be-service.onrender.com/questionnaire/'

    const response = axios.get(url,
        { headers: { Authorization: `Token ${token}`, }, })
        return response
}
// ✅
export const requestCreateQuestionnaire = (token, questionnaireCont ) => {
    const url = 'https://neoself-be-service.onrender.com/questionnaire/'

    const response = axios.post(url,

        questionnaireCont,

        { headers: { Authorization: `Token ${token}`, }, })
        return response
}

// ✅
export const requestSingleQuestionnaire = (token, questionnaireId) => {
    const url = `https://neoself-be-service.onrender.com/questionnaire/${questionnaireId}`

    const response = axios.get(url,
        { headers: { Authorization: `Token ${token}`}  
    })
        return response
}
// ✅ 
export const requestUserRecords = (token) => {
    const url = 'https://neoself-be-service.onrender.com/record/user/'

    const response = axios.get(url,
        { headers: { Authorization: `Token ${token}`, }, })
        return response
}

// ✅ ...
export const requestAllRecords = (token) => {
    const url = 'https://neoself-be-service.onrender.com/record/all/'

    const response = axios.get(url,
        { headers: { Authorization: `Token ${token}`, }, })
        return response
}

// ✅ 
export const requestFriendRecords = (token) => {
    const url = 'https://neoself-be-service.onrender.com/record/friends/'

    const response = axios.get(url,
        { headers: { Authorization: `Token ${token}`, }, })
        return response
}

export const requestHabitRecords = (token, questionnaireId) => {
    const url = `https://neoself-be-service.onrender.com/habit/${questionnaireId}/records/`

    const response = axios.get(url,
        { headers: { Authorization: `Token ${token}`, }, })
        return response
}

export const requestRecordDetail = (token, recordId) => {
    const url = `https://neoself-be-service.onrender.com/record/${recordId}/`

    const response = axios.post(url,
        { headers: { Authorization: `Token ${token}`, }, })
        return response
}

export const requestReactionDetail = (token, reactionId) => {
    const url = `https://neoself-be-service.onrender.com/habit/${reactionId}/records/`

    const response = axios.get(url,
        { headers: { Authorization: `Token ${token}`, }, })
        return response
}

export const requestUpdateReaction = (token, reactionId) => {
    const url = `https://neoself-be-service.onrender.com/habit/${reactionId}/records/`

    const response = axios.patch(url,
        { headers: { Authorization: `Token ${token}`, }, })
        return response
}

export const requestDeleteReaction = (token, reactionId) => {
    const url = `https://neoself-be-service.onrender.com/habit/${reactionId}/records/`

    const response = axios.delete(url,
        { headers: { Authorization: `Token ${token}`, }, })
        return response
}

export const requestWeeklogs = (token) => {
    const url = 'https://neoself-be-service.onrender.com/weeklogs/'

    const response = axios.get(url,
        { headers: { Authorization: `Token ${token}`, }, })
        return response
}

export const requestWeeklogsDetail = (token, logId) => {
    const url = `https://neoself-be-service.onrender.com/weeklogs/${logId}`

    const response = axios.get(url,
        { headers: { Authorization: `Token ${token}`, }, })
        return response
}

export const requestResults = (token) => {
    const url = 'https://neoself-be-service.onrender.com/results/'

    const response = axios.get(url,
        { headers: { Authorization: `Token ${token}`, }, })
        return response
}

export const requestResultDetail = (token, resultId) => {
    const url = `https://neoself-be-service.onrender.com/results/${resultId}`

    const response = axios.get(url,
        { headers: { Authorization: `Token ${token}`, }, })
        return response
}

