import Auth from '../modules/Auth'

export const fetchDanceClasses = () => {
  return dispatch => {
    dispatch({type: 'LOADING_DANCE_CLASSES'})
    return fetch('/api/dance_classes', {
      accept: 'application/json',
    }).then(resp => resp.clone().json())
      .then(danceClasses => dispatch({type: 'FETCH_DANCE_CLASSES', payload: danceClasses}))
  }
}

export const fetchUserDanceClasses = () => {
  return dispatch => {
    dispatch({type: 'LOADING_USER_DANCE_CLASSES'})
    fetch('/api/profile', {
      method: 'GET',
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`,
      }
    }).then(res => res.json())
    .then(user_profile_info => user_profile_info.dance_classes)
    .then(dance_classes => dispatch({type: 'FETCH_USER_DANCE_CLASSES', payload: dance_classes}))
  }

}
export const addToUserSchedule = (danceClassId) => {
  return dispatch => {
    fetch('/api/user_dance_classes', {
      method: 'POST',
      body: JSON.stringify({dance_class_id: danceClassId}),
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`,
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())
    .then(userDanceClass => dispatch({
      type: 'ADD_TO_SCHEDULE',
      payload: userDanceClass
    }))
    .catch(error => console.error('Error:', error))
    .then(alert("Class added to your schedule."))
  }
}

export const removeFromUserSchedule = (danceClassId) => {
  return dispatch => {
    fetch(`/api/user_dance_classes/${danceClassId}`, {
      method: 'DELETE',
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(res => res.json())
    .then(userDanceClass => dispatch({
      type: 'REMOVE_FROM_SCHEDULE',
      payload: userDanceClass
    }))
    .then(alert("Class removed from your schedule."))
    .catch(error => console.error('Error:', error))
  }
}
