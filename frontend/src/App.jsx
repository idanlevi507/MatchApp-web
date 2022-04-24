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
socketService.setup();

const _App = (props) => {

  return (
    <Router>
      <section className="app">
        <header>
          <Header loggedInUser={props.loggedInUser} />
        </header>
        <main className="main-page">
          <Switch>
            <Route component={EventDetails} path="/event/:eventId" />
            <Route component={EventApp} path="/event" />
            <Route component={EventCreate} path="/create/:eventId?" />
            <Route component={MyEvents} path="/myevents" />
            <Route component={LoginSignup} path="/login" />
            <Route component={Home} path="/" />
          </Switch>
        </main>

        <Footer />
      </section>
    </Router>
  );
}

function mapStateToProps(state) {
  return { loggedInUser: state.userModule.loggedInUser };
}

export const mapDispatchToProps = {};

export const App = connect(mapStateToProps, mapDispatchToProps)(_App);
