import Auth from '../modules/Auth'

export const loginUser = (user) => {
  return dispatch => {
    fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      }
    }).then(res => res.json())
    .then(res => {
      Auth.authenticateToken(res.token)

      dispatch({
        type: 'SET_USER',
        payload: Auth.isUserAuthenticated()
      })

      document.location.reload()
    }).catch(err => console.log(err))
  }
}

export const signupUser = (formData) => {
  return dispatch => {
    fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        user: formData,
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())
    .then(res => {
      Auth.authenticateToken(res.token)

      dispatch({
        type: 'SET_USER',
        payload: Auth.isUserAuthenticated()
      })

      document.location.reload()


    }).catch(err => console.log(err))
  }
}

export const fetchUser = () => {
  return (dispatch) => {
    dispatch ({type: 'LOADING_USER'})
    return fetch('/api/profile', {
      method: 'GET',
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`,
      }
    }).then(res => res.json())
    // .then(res => {
    //    this.setState({
    //       userDanceClasses: res.dance_classes,
    //       firstname: res.firstname,
    //       lastname: res.lastname,
    //       favorites: res.favorites,
    //       reviews: res.reviews,
    //       id: res.id,
    //     })
    .then(user => dispatch({type: 'FETCH_USER', payload: user}))
      .catch(err => console.log(err))
  }

}

export const fetchUserFavorites = () => {
  return (dispatch) => {
    dispatch({type: 'LOADING_USER_FAVORITES'})
    fetch('/api/favorites', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`,
      }
    }).then(res => res.json())
    .then(favorites => dispatch({type:'FETCH_USER_FAVORITES', payload: favorites}))
  }
}

export const addToUserSchedule = (danceClassId) => {
  debugger
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
  fetch(`/api/user_dance_classes/${danceClassId}`, {
    method: 'DELETE',
    headers: {
      token: Auth.getToken(),
      'Authorization': `Token ${Auth.getToken()}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(res => res.json())
  .then(alert("Class removed from your schedule."))
  .catch(error => console.error('Error:', error))

}
