import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { EventListEdit } from '../cmps/EventListEdit';
import { loadAllEvents, removeEvent } from '../store/actions/eventActions';

const _MyEvents = (props) => {
  const { removeEvent, loggedInUser, userEvents, attendingEvents } = props

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                className="profile-user-img"
                src={loggedInUser.imgUrl}
                alt=""
              ></img>
              <div className="user-details-container">
                <h2>Events Created : {userEvents.length}</h2>
                <h2>Events Attending : {attendingEvents.length}</h2>
                <h2>Followers : {loggedInUser.followers}</h2>
                <h2>Reviews : {loggedInUser.reviews}</h2>
              </div>
              <div className="profile-rating">
                <div>Rating: {loggedInUser.stars}</div>
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
            <EventListEdit events={attendingEvents} />
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
  const attendingEvents = events.filter((event) => {
    if (event.createdBy._id === userId) return false; // its my event;
    return event.members.find((member) => member._id === userId);
  });

  return {
    userEvents,
    attendingEvents,
    loggedInUser: state.userModule.loggedInUser,
  };
}

const mapDispatchToProps = {
  removeEvent
};

export const MyEvents = connect(mapStateToProps, mapDispatchToProps)(_MyEvents);
