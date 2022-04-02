import { connect } from 'react-redux';
import { EventList } from '../cmps/EventList';
import { loadEvents } from '../store/actions/eventActions';
import { setFilter } from '../store/actions/eventActions';
import React from 'react';
import { removeEvent } from '../store/actions/eventActions';
// import { useLocation } from "react-router-dom";

class _EventApp extends React.Component {

  async componentDidMount() {
    window.scrollTo(0, 0)
    const query = new URLSearchParams(this.props.location.search);
    const type = (query.get('type'))? query.get('type') : 'all' 
    // if (!type) type="all";
    const newFilter = { ...this.props.filterBy, type };
    await this.props.setFilter(newFilter)
    this.props.loadEvents(this.props.filterBy);
  }

  onRemoveEvent = (eventId) => {
    this.props.removeEvent(eventId);
  };

  cleanFilter() {
    const emptyFilter = {
      type: "all",
      location: "all",
      date: "",
      time: ""
    }
    this.props.setFilter(emptyFilter);
  }

  componentWillUnmount() {
    this.cleanFilter()
  }

  render() {   
    return (
      <section className="events-main-container">
        <EventList
          gEvents={this.props.gEvents}
          onRemoveEvent={this.onRemoveEvent}
        />
      </section>
    );
  }
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
  removeEvent,
  setFilter
};

export const EventApp = connect(mapStateToProps, mapDispatchToProps)(_EventApp);
