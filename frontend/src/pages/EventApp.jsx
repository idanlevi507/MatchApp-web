import React, { useState, useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { loadEvents, setFilter, filterEvents } from '../store/actions/eventActions';
import { EventPreview } from '../cmps/EventPreview'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { EventFilter } from '../cmps/EventFilter';
// import { removeEvent } from '../store/actions/eventActions';
// import { useLocation } from "react-router-dom";


const _EventApp = (props) => {
  const {search} = useLocation();
  const query = new URLSearchParams(search);
  let type = query.get('type');

  useEffect(() => {
    window.scrollTo(0, 0);
    // console.log('2eventApp useEffect');
    if (type) {
      // console.log('2eventApp allEvents', props.allEvents);
      props.filterEvents({ ...props.filterBy, type },props.events);
    } 
  }, [])

  const EventFilter = (props) => {
    // const dispatch = useDispatch();
    const filterBy = props.filterBy;
    // const isMounted = useRef(false);
    const [startDate, setStartDate] = useState(null);

    const handleChange = (ev) => {
      if (ev){
        const field = ev.target.name;
        const value = ev.target.value;
        props.filterEvents({ ...filterBy, [field]: value },props.events);
      }else{
      }
    };

    useEffect(()=>{
      if (startDate){
        let newDate = startDate.toLocaleDateString();
        props.filterEvents({ ...filterBy, date: newDate},props.events);
      };
    },startDate)

    useEffect(() => {
      // console.log('didmount');
      // componentwillunmount
      return cleanFilter;
    }, [])

    const cleanFilter = () => {
      const emptyFilter = {
        type: '',
        location: '',
        date: '',
        time: ''
      }
      setFilter(emptyFilter);
    }

    const typeOptions = [
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
    // console.log(startDate);
    if (!events) return <h1>Loading</h1>;
    return (
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
            onChange={(date) =>{
              setStartDate(date);
              }}
             />
        </div>
      </section>
    );
  }
  //end of filter render.

  //events list render
  return (
    <section className="events-main-container">
      <section className="list-main-containers">
        <div className="list-filter-container">
          <EventFilter events={props.events} filterBy={props.filterBy} loadEvents={props.loadEvents} filterEvents={props.filterEvents} />
        </div>
        <div className="list-preview-container">
          {props.events.map((event) => {
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
    events: state.eventModule.events,
    filterBy: state.eventModule.filterBy,
    loggedinUser: state.userModule.loggedinUser,
  };
}

const mapDispatchToProps = {
  loadEvents,
  setFilter,
  filterEvents
};

export const EventApp = connect(mapStateToProps, mapDispatchToProps)(_EventApp);
