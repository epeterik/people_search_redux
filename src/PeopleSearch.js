import React from 'react';
import './App.css';
import { } from 'redux';
import { connect } from 'react-redux';
import {USER_SEARCH_INPUT, BACK_TO_USER_SEARCH, USER_SELECTED} from './types';
import './action';
import './reducer';
import PropTypes from 'prop-types';

export class PeopleSearch extends React.Component {
    constructor (props) {
  
      super(props);

      //bind functions/objects outside of class to class so they have the same scope/this
      this.mapUserList = this.mapUserList.bind(this);
      this.userListFilter = this.userListFilter.bind(this);
      this.userPageFilter = this.userPageFilter.bind(this);
      this.userPageFilterSingleUser = this.userPageFilterSingleUser.bind(this);
  
    } //end consturctor
  
    userPageFilter(userObject) {
      if (userObject.id.includes(this.state.userToDisplay))
        return true;
      else
        return false;
    }
  
    //create mapping callback method for displaying user list
    //  JS Array Map: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map 
    mapUserList(userObject, arrayIndex) {
      return (
        <div id={"UserRow" + arrayIndex} key={"UserRow" + arrayIndex} onClick={() => this.props.handleUserSelected(userObject.id)}>
          {userObject.name}
        </div>
      )
    }
  
    //create filter for user list based upon the current user search input in state
    //  use Contains instead of Includes: https://www.w3schools.com/jsref/jsref_includes.asp
    //  JS Array Filter: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter 
    //  Uppercase to make case insensitive: https://www.w3schools.com/jsref/jsref_touppercase.asp
    userListFilter(userObject) {
      if (userObject.name.toUpperCase().includes(this.props.input.toUpperCase()))
        return true;
      else
        return false;
    }

    //Sort array
    //  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    userListSort(userObjectA, userObjectB) {
        var userNameA = userObjectA.name.toUpperCase(); // ignore upper and lowercase
        var userNameB = userObjectB.name.toUpperCase(); // ignore upper and lowercase
        if (userNameA < userNameB) {
          return -1;
        }
        if (userNameA > userNameB) {
          return 1;
        }
      
        // if we made it here they should be equal?
        return 0;
    }

    //create mapping callback method for displaying user list
    //  JS Array Map: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map 
    mapUserPage(userObject, arrayIndex) {
      return (
        <div id={"UserRow" + arrayIndex} key={"UserRow" + arrayIndex} >
          <h1>{userObject.name}</h1>
          <p>City: {userObject.city}</p>
          <p>Industry: {userObject.industry}</p>
          <p>Hobbies: {userObject.hobbies}</p>
          <p>Email: {userObject.email}</p>
        </div>
      )
    }

    //create filter for user list based upon the current user search input in state
    //  use Contains instead of Includes: https://www.w3schools.com/jsref/jsref_includes.asp
    //  JS Array Filter: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter 
    //  Uppercase to make case insensitive: https://www.w3schools.com/jsref/jsref_touppercase.asp
    userPageFilterSingleUser(userObject) {
      
      if (userObject.id.includes(this.props.userPage))
        return true;
      else
        return false;
    }
  
    render() {
  
      let displayOutput = "";
      
      //if (this.state.displayState === "user")
      if (this.props.userPage === undefined)
      {
          console.log(this.props.users);
        displayOutput = <RenderUserSearchPage onInputChange={this.props.handleUserSearchInput}
                                              searchInputValue={this.props.input} 
                                              userListDisplay={this.props.users.filter(this.userListFilter).sort(this.userListSort).map(this.mapUserList)}
                                              />
      }
      else
      {
        displayOutput = <RenderUserPage UserToDisplay={this.props.users.filter(this.userPageFilterSingleUser).map(this.mapUserPage)} 
                                        BackButton={this.props.handleBackToSearchPage} />
      }
  
      return (
        displayOutput
      )
    }
  
  } //end PeopleSearch

  //check incoming props, make sure we are getting the right stuff! 
  PeopleSearch.propTypes = {
    handleUserSearchInput: PropTypes.func,
    input: PropTypes.string,
    users: PropTypes.array,
    handleBackToSearchPage: PropTypes.func,
    handleUserSelected: PropTypes.func,
    userPage: PropTypes.string
  };
  
  const RenderUserSearchPage = (props) => {
    return (
      <div id="userSearchPageRender">
        <p className="App-intro">
            Filter names by entering text in the box below and click a name for more information.
        </p>
        <div id="userSearchPage">
          <div id="userSearchRow">
            <input id="searchInput" onChange={props.onInputChange} value={props.searchInputValue} />
          </div>
          <div id="userSearchList">
            {props.userListDisplay}
          </div>
        </div>
      </div>
    );
  }

//check incoming props, make sure we are getting the right stuff! 
  RenderUserSearchPage.propTypes = {
    onInputChange: PropTypes.func,
    searchInputValue: PropTypes.string
  };
  
  const RenderUserPage = (props) => {

    console.log(props);
    return (
      <div id="userPage">
        <p onClick={props.BackButton} style={{color: "blue"}}>Click Here to Go Back</p>
        {props.UserToDisplay}
      </div>
    )
  }

  //check incoming props, make sure we are getting the right stuff! 
  RenderUserSearchPage.propTypes = {
    BackButton: PropTypes.func
  };

 const mapStateToProps = (state) => { 
     console.log(state);
    return { 
    ...state //performing spread operation returns a new instance with the same contents of state
    //could also have returns like {userPage: state.userPage, users: state.users} <-- userPage and users become props
    } 
  } 
 
  const mapDispatchToProps = (dispatch) => { 
    console.log(dispatch);
    return { 
      handleUserSearchInput(event) {
        dispatch({type: USER_SEARCH_INPUT, payload: event.target.value});
      },
      handleBackToSearchPage() {
        dispatch({type: BACK_TO_USER_SEARCH})
      },
      handleUserSelected(userId) {
        dispatch({type: USER_SELECTED, payload: userId})
      }
    } //end return
  } // end mapDispatchToProps
  
  export default connect(mapStateToProps, mapDispatchToProps)(PeopleSearch); //the following PeopleSearch is am immediate invocation