import { connect } from 'react-redux';
import { EventList } from '../cmps/EventList';
import { loadEvents } from '../store/actions/eventActions';
import { setFilter } from '../store/actions/eventActions';
import React from 'react';
import { removeEvent } from '../store/actions/eventActions';
import { useLocation } from "react-router-dom";

class _EventApp extends React.Component {

  async componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const type = query.get('type')
    const newFilter = { ...this.props.filterBy, type }
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

  async componentWillUnmount() {
    await this.cleanFilter()
    console.log('unmount')
  }

  render() {
    console.log(this.props.gEvents);
    // if (this.props.gEvents.length === 0) return <h1>Loading...</h1>;
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
