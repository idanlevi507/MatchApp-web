import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { loadEvents, setFilter, updateFilter } from '../store/actions/eventActions';
import { EventPreview } from '../cmps/EventPreview'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { EventFilter } from '../cmps/EventFilter';
// import { removeEvent } from '../store/actions/eventActions';
// import { useLocation } from "react-router-dom";


const _EventApp = (props) => {
  const [startDate, setStartDate] = useState(null);
  const { filterBy, updateFilter } = props;

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const type = query.get('type') || "";
  // const dispatch = useDispatch();
  // const isMounted = useRef(false);

  useEffect(() => {
    console.log('didmount');
    window.scrollTo(0, 0);
    updateFilter({ ...filterBy, type });
    // willunmounte ->
    // return cleanFilter;
  }, []);

  const handleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    updateFilter({ ...filterBy, [field]: value });
  };

  const handleChangeDate = (date) => {
    setStartDate(date);
    date = (date) ? date.toLocaleDateString() : "";
    props.updateFilter({ ...filterBy, date });
  }

  const typeOptions = [
    { value: '', label: 'Show All' },
    { value: 'Football', label: 'Football' },
    { value: 'Basketball', label: 'Basketball' },
    { value: 'Volleyball', label: 'Volleyball' },
    { value: 'Running', label: 'Running' }
  ].map(({ value, label }) => {
    const option = (<option value={value} key={label}>{label}</option>);
    return option;
  })

  const { events } = props;
  if (!events) return <h1>Loading</h1>;
  return (
    <section className="events-main-container">
      <section className="filter-container ">
        <div className="type-filter-container">
          <label htmlFor="filter-type">By Sport:</label>
          <select className="filter-button"
            // variant=""
            value={filterBy.type}
            name="type"
            id="filter-type"
            onChange={handleChange}
          >
            {typeOptions}
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
          >
          </input>
        </div>
        <div className="type-filter-container">
          <label htmlFor="filter-date">By Date:</label>
          <DatePicker
            className='filter-button'
            selected={startDate}
            locale="en-GB"
            onChange={(date) => { console.log(date); handleChangeDate(date) }}
            isClearable
            placeholderText="Click to select date"
          />
        </div>
      </section>
      <div className="list-preview-container">
        {events.map((event) => {
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
  );
}

function mapStateToProps(state) {

  return {
    locations: state.eventModule.locations,
    events: state.eventModule.events,
    filterBy: state.eventModule.filterBy,
    loggedinUser: state.userModule.loggedinUser,
  };
}

const mapDispatchToProps = {
  loadEvents,
  setFilter,
  updateFilter
};

export const EventApp = connect(mapStateToProps, mapDispatchToProps)(_EventApp);
