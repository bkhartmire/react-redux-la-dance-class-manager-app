import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import DanceClass from '../components/DanceClass'

class DanceClassList extends Component {
  render(){
    return(
      <div>
        <h1>This is the Dance Class List</h1>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    danceClasses: state.danceClasses.all
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchDanceClasses
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(DanceClassList)