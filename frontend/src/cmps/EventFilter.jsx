import {useState, useEffect, useRef} from "react";
import {connect, useDispatch} from 'react-redux';
import { loadEvents, setFilter } from "../store/actions/eventActions";

const _EventFilter = (props) => {
  const dispatch  = useDispatch(); 
  const isMounted = useRef(false);
  const [filterBy, setFilterBy] = useState({ type: props.type, location: '', date: '', time: '' })
 
  const handleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    setFilterBy({ ...filterBy, [field]: value });
  };

  useEffect(()=>{
    if (isMounted.current){
      dispatch(setFilter(filterBy));
      dispatch(loadEvents(filterBy));
    } else {
      isMounted.current = true;
    }
  }, [filterBy,dispatch]);

  useEffect(()=>{
    // componentwillunmount
    return cleanFilter;
  },[])
  
  const cleanFilter = () => {
    console.log("clearfilter");
    const emptyFilter = {
      type: '',
      location: '',
      date: '',
      time: ''
    }
    setFilter(emptyFilter);
  }

  const options = [
    {value: '', label: 'Show All'},
    {value: 'Football', label: 'Football'},
    {value: 'Basketball', label: 'Basketball'},
    {value: 'Volleyball', label: 'Volleyball'},
    {value: 'Running', label: 'Running'}
  ]
  .map(({value, label}) => {
    const isSelected = value === filterBy.type;
    const option = (<option selected={isSelected} value={value}>{label}</option>);
    return option;
  })

  const { events, locations } = props;
  if (!events || !locations) return <h1>Loading</h1>;
  return (
    <section className="filter-container">
      <div className="type-filter-container">
        <label htmlFor="filter-type">By Sport:</label>
        <select className="filter-button"
          // variant=""
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
          {locations.map((location, index) => {
            return (
              <option value={location} key={index}>
                {location}
              </option>
            );
          })}
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

function mapStateToProps(state) {
  return {
    locations: state.eventModule.locations,
  };
}

const mapDispatchToProps = {
  setFilter,
  loadEvents
};

export const EventFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(_EventFilter);