import axios from 'axios'

export const requestNewUser = (username, password) => {
    const url = 'https://neoself-be-service.onrender.com/auth/users/'

    const response = axios.post(url, {
        username: username,
        password: password})
        return response
}

export const requestLogin = (username, password) => {
    const url = 'https://neoself-be-service.onrender.com/auth/token/login'

    const response = axios.post(url, {
        username: username,
        password: password})
        return response
}

export const requestLogout = (token) => {
    const url = 'https://neoself-be-service.onrender.com/auth/token/logout'

    const response = axios.post(url,
        { headers: { Authorization: `Token ${token}`, }, })
        return response
    }


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

export const requestAddFriend = (token, friendId) => {
    const url = 'https://neoself-be-service.onrender.com/friends/'

    const response = axios.post(url,

        {friend: friendId},
    
        {headers: { Authorization: `Token ${token}`}})
        return response
}

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

export const requestAllQuestionnaires = (token) => {
    const url = 'https://neoself-be-service.onrender.com/questionnaire/'

    const response = axios.get(url,
        { headers: { Authorization: `Token ${token}`, }, })
        return response
}

export const requestCreateQuestionnaire = (token, questionnaireCont ) => {
    const url = 'https://neoself-be-service.onrender.com/questionnaire/'

    const response = axios.post(url,

        questionnaireCont,

        { headers: { Authorization: `Token ${token}`, }, })
        return response
}

export const requestSingleQuestionnaire = (token, questionnaireId) => {
    const url = `https://neoself-be-service.onrender.com/questionnaire/${questionnaireId}`

    const response = axios.get(url,
        { headers: { Authorization: `Token ${token}`}  
    })
        return response
}