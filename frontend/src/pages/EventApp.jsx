import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadEvents } from '../store/actions/eventActions';
import { setFilter } from '../store/actions/eventActions';
import { EventPreview } from '../cmps/EventPreview'
import { EventFilter } from '../cmps/EventFilter';
// import { removeEvent } from '../store/actions/eventActions';
// import { useLocation } from "react-router-dom";


const _EventApp=(props)=> {

  useEffect(()=>{
    window.scrollTo(0, 0)
    const query = new URLSearchParams(props.location.search);
    const type = (query.get('type'))? query.get('type') : '' 
    const newFilter = { ...props.filterBy, type };
    props.setFilter(newFilter);
    props.loadEvents(newFilter);
  },[])

  // const onRemoveEvent = (eventId) => {
  //   props.removeEvent(eventId);
  // };
     
    return (
      <section className="events-main-container">
        <section className="list-main-containers">
      <div className="list-filter-container">
        <EventFilter events={props.gEvents} />
      </div>
      <div className="list-preview-container">
        {props.gEvents.map((event) => {
          return (
            <EventPreview
              key={event._id}
              event={event}
              //  onRemoveEvent={onRemoveEvent}
            />
          );
        })}
      </div>
    </section>
      </section>
    );
  }

function mapStateToProps(state) {

  return {

    gEvents: state.eventModule.events,
    filterBy: state.eventModule.filterBy,
    loggedinUser: state.userModule.loggedinUser,
  };
}

const mapDispatchToProps = {
  loadEvents,
  // removeEvent,
  setFilter
};

export const EventApp = connect(mapStateToProps, mapDispatchToProps)(_EventApp);
