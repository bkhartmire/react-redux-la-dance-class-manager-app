export const fetchDanceClasses = () => {
  return dispatch => {
    dispatch({type: 'LOADING_DANCE_CLASSES'})
    return fetch('/api/dance_classes', {
      accept: 'application/json',
      headers: {
        'Authorization': `Bearer ${sessionStorage.jwt}`
      }
    }).then(resp => resp.clone().json())
      .then(danceClasses => dispatch({type: 'FETCH_DANCE_CLASSES', payload: danceClasses}))
  }
}
