import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { EventDetails } from './pages/EventDetails';
import { EventApp } from './pages/EventApp';
import { Header } from './cmps/Header';
import { Home } from './pages/Home';
import { LoginSignup } from './cmps/LoginSignup.jsx';
import { EventCreate } from './pages/EventCreate';
import { Footer } from './cmps/Footer';
import { MyEvents } from './pages/MyEvents';
import { socketService } from './services/socketService';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { loadAllEvents } from './store/actions/eventActions';
import {login} from './store/actions/userActions.js';
socketService.setup();

const _App = (props) => {
  useEffect(() => {
    // console.log('1app useeffect');
    props.loadAllEvents();
    props.login({password:"" , username:"IdanL"}) // in order to auto log in with user
  },[]);
  // console.log('1app allEvents', props.allEvents);
  return (
    <Router>
      <section className="app">
        <header>
          <Header loggedInUser={props.loggedInUser} />
        </header>
        <main className="main-page">
          <Switch>
            <Route component={EventDetails} path="/event/:eventId" />
            <Route path="/event"><EventApp allEvents={props.allEvents}/></Route>
            <Route component={EventCreate} path="/create/:eventId?" />
            <Route component={MyEvents} path="/myevents" />
            <Route component={LoginSignup} path="/login" />
            <Route path="/"><Home allEvents={props.allEvents}/></Route>
          </Switch>
        </main>

        <Footer />
      </section>
    </Router>
  );
}

function mapStateToProps(state) {
  return {
    loggedInUser: state.userModule.loggedInUser,
    allEvents: state.eventModule.allEvents
  };
}

export const mapDispatchToProps = {
  loadAllEvents,
  login
};

export const App = connect(mapStateToProps, mapDispatchToProps)(_App);
