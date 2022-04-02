import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { EventListEdit } from '../cmps/EventListEdit';
import { loadEvents, removeEvent } from '../store/actions/eventActions';

const _MyEvents = (props) => {
  const {loadEvents,removeEvent,loggedInUser,userEvents,attendingsEvents} = props
 
  useEffect(()=>{
    window.scrollTo(0, 0)
    loadEvents()   
  },[])

  const onRemoveEvent = (eventId) => {
    removeEvent(eventId);
  };

    if (!userEvents) return <h1>Loading...</h1>;
    return (
      <main className="user-main-container">
        <div className="user-details-container">
          <div className="my-event-left-container">
            <div className="user-details">
              <h1 className="to-center">
                Welcome Back,{' '}
                <span className="light-blue-text">{loggedInUser.fullname}</span>
              </h1>
              <div className="profile-details">
                <img
                  className="profile-img"
                  src={loggedInUser.imgUrl}
                  alt=""
                ></img>
                <div className="user-details-container">
                  <h2>Events Created : {userEvents.length}</h2>
                  <h2>Events Attending : {attendingsEvents.length}</h2>
                  <h2>Followers : 0</h2>
                  <h2>Reviews : 0</h2>
                </div>
                <div className="profile-rating">
                  <div>Rating: ⭐⭐⭐⭐⭐</div>
                </div>
              </div>
            </div>
          </div>
          <div className="event-right-container">
            <div className="user-events-list">
              <div className="my-events-title no-padding">
                <h1 className="to-center ">My Events</h1>
                <h4 className="light-blue-text to-center ">
                  Change or Delete your events.
                </h4>
              </div>
              <EventListEdit
                onRemoveEvent={onRemoveEvent}
                events={userEvents}
                isEditable={true}
              />
            </div>
            <div className="my-events-title bottom  no-padding">
              <h1 className="to-center">Joined Events</h1>
              <h4 className="light-blue-text to-center ">
                See all the events you're attending.
              </h4>
            </div>
            <div className="user-events-list">
              <EventListEdit events={attendingsEvents} />
            </div>
          </div>
        </div>
      </main>
    );
}

function mapStateToProps(state) {
  const events = state.eventModule.events;
  const userId = state.userModule.loggedInUser._id;
  const userEvents = events.filter((event) => event.createdBy._id === userId);
  const attendingsEvents = events.filter((event) => {
    if (event.createdBy._id === userId) return false; // its my event;
    return event.members.find((member) => member._id === userId);
  });

  return {
    userEvents: userEvents,
    attendingsEvents: attendingsEvents,
    loggedInUser: state.userModule.loggedInUser,
  };
}

const mapDispatchToProps = {
  loadEvents,
  removeEvent
};

export const MyEvents = connect(mapStateToProps, mapDispatchToProps)(_MyEvents);
