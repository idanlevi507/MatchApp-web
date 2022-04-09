import React, { useState, useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { loadEvents, setFilter } from '../store/actions/eventActions';
import { EventPreview } from '../cmps/EventPreview'
// import { EventFilter } from '../cmps/EventFilter';
// import { removeEvent } from '../store/actions/eventActions';
// import { useLocation } from "react-router-dom";


const _EventApp = (props) => {
  const query = new URLSearchParams(props.location.search);
  const [type] = useState(query.get('type'));
  useEffect(() => {
    window.scrollTo(0, 0);
    const newFilter = { ...props.filterBy, type };
    console.log(type);
    props.loadEvents(newFilter);
  }, [])


  const EventFilter = (props) => {
    // const dispatch = useDispatch();
    const filterBy = props.filterBy;
    // const isMounted = useRef(false);

    const handleChange = (ev) => {
      const field = ev.target.name;
      const value = ev.target.value;
      props.loadEvents({ ...filterBy, [field]: value });
    };

    // useEffect(()=>{
    //   if (isMounted.current){
    //     dispatch(setFilter(filterBy));
    //     dispatch(loadEvents(filterBy));
    //   } else {
    //     isMounted.current = true;
    //   }
    // }, [filterBy,dispatch]);

    useEffect(() => {
      // componentwillunmount
      return cleanFilter;
    }, [])

    const cleanFilter = () => {
      const emptyFilter = {
        type: "",
        location: "",
        date: "",
        time: ""
      }
      setFilter(emptyFilter);
    }

    const options = [
      { value: '', label: 'Show All' },
      { value: 'Football', label: 'Football' },
      { value: 'Basketball', label: 'Basketball' },
      { value: 'Volleyball', label: 'Volleyball' },
      { value: 'Running', label: 'Running' }
    ]
      .map(({ value, label }) => {
        const option = (<option value={value} key={label}>{label}</option>);
        return option;
      })
    // console.log(filterBy.type);
    const { events } = props;
    // console.log(events);
    if (!events) return <h1>Loading</h1>;
    return (
      <section className="filter-container font-style2">
        <div className="type-filter-container">
          <label htmlFor="filter-type">By Sport:</label>
          <select className="filter-button"
            // variant=""
            value={filterBy.type}
            name="type"
            id="filter-type"
            onChange={handleChange}
          >
            {options}
          </select>
        </div>
        <div className="type-filter-container">
          <label htmlFor="filter-location">Location:</label>
          <select className="filter-button"
            // variant="standard"
            name="location"
            id="filter-location"
            onChange={handleChange}
          >
            <option value="">Show All</option>
          </select>
        </div>
        <div className="type-filter-container">
          <label htmlFor="filter-time">By Time:</label>

          <input className="filter-button" variant="standard"
            type="time"
            name="time"
            id="filter-time"
            onChange={handleChange}>
          </input>
        </div>
        <div className="type-filter-container">
          <label htmlFor="filter-date">By Date:</label>
          <input className="filter-button"
            variant="standard"
            type="date"
            name="date"
            id="filter-date"
            onChange={handleChange}
          />
        </div>
      </section>
    );
  }


  return (
    <section className="events-main-container">
      <section className="list-main-containers">
        <div className="list-filter-container">
          <EventFilter events={props.gEvents} filterBy={props.filterBy} loadEvents={props.loadEvents} />
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
    locations: state.eventModule.locations,
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
