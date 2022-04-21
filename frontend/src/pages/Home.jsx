import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import football from '../assets/imgs/football7.jpg';
import volleyball from '../assets/imgs/volleyball-hero.jpg';
import running from '../assets/imgs/runningnoa.jpg';
import explore from '../assets/imgs/explore.jpg';
import basketball from '../assets/imgs/basketballfriends.jpg';
import profie from '../assets/imgs/profieblack.jpg';
import { Hero } from '../cmps/Hero';
import { EventPreview } from '../cmps/EventPreview';
import { loadEvents, removeEvent,loadAllEvents } from '../store/actions/eventActions';
import {login} from '../store/actions/userActions.js';
import { EventListHome } from '../cmps/EventListHome';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@material-ui/core';
import { EventMenu } from '../cmps/EventMenu';
// import InputBase from '@material-ui/core/InputBase'
class _Home extends Component {
  componentDidMount() {
    // this.props.loadEvents();
    this.props.loadAllEvents();
    this.props.login({password:"" , username:"IdanL"}) // in order to auto log in with user
  }
  onRemoveEvent = (eventId) => {
    this.props.removeEvent(eventId);
  };
  render() {
    return (
      <div className="main-app-container">
        
        <Hero />
        <div className="menu-container">
          <EventMenu />
        </div>
        <div className="main-list-container">
          <h1 className="featured-event-header ">
            Main Events
          </h1>
          <section className="event-list-container">
            <EventListHome
              events={this.props.allEvents}
              onRemoveEvent={this.onRemoveEvent}
            />
          </section>
        </div>
        <section className="categories-gallery ">
          <div className="gallery-item football-gallery" 
          onClick={()=>this.props.history.push('/event?type=Football')} >
            <h2>Football</h2>
            <h3 className="see-more">See more!</h3>
            <div className="overlay"></div>
            <img src={football} alt="bemo" />
          </div>
          <div className="gallery-item basketball-gallery"
          onClick={()=>this.props.history.push('/event?type=Basketball')}>
            <h2>Basketball</h2>
            <h3 className="see-more">See more!</h3>
            <div className="overlay"></div>
            <img src={basketball} alt="" />
          </div>
          <div className="gallery-item volleyball-gallery"
          onClick={()=>this.props.history.push('/event?type=Volleyball')}>
            <h2 className="gallery-h2">Volleyball</h2>
            <h3 className="see-more">See more!</h3>
            <div className="overlay"></div>
            <img src={volleyball} alt="bemo" />
          </div>
          <div className="gallery-item running-gallery"
          onClick={()=>this.props.history.push('/event?type=Running')}>
            <h2>Running</h2>
            <h3 className="see-more">See more!</h3>
            <div className="overlay"></div>
            <img src={running} alt="" />
          </div>
          <div className="gallery-item profile-gallery"
          onClick={()=>this.props.history.push('/myevents')}>
            <h2>My Profile</h2>
            <h3 className="see-more">See more!</h3>
            <div className="overlay"></div>
            <img src={profie} alt="" />
          </div>
          <div className="gallery-item explore-gallery"
          onClick={()=>this.props.history.push('/event')}>
            <h2>Explore</h2>
            <h3 className="see-more">See more!</h3>
            <div className="overlay"></div>
            <img src={explore} alt="" />
          </div>
        </section>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    allEvents:state.eventModule.allEvents,
    gEvents: state.eventModule.events,
    filterBy: state.eventModule.filterBy,
  };
}
const mapDispatchToProps = {
  loadEvents,
  removeEvent,
  loadAllEvents,
  login
};
export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home);
