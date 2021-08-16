import { observer } from 'mobx-react-lite';
import { Route, useLocation, Switch } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';
import ActivityDetials from './components/activity/ActivityDetails';
import ActivityForm from './components/forms/ActivityForm';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';
import ServerError from './components/ServerError';
import TestError from './components/TestError';
import ActivityDashboard from './pages/ActivityDashboard';
import HomePage from './pages/HomePage';

function App() {
  const location = useLocation()

  return (
    <>
      <ToastContainer position="bottom-right" />
      <Route exact path="/" component={HomePage} />
      <Route 
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
          <Container style={{marginTop: "7em"}}>
            <Switch>
              <Route exact path="/activities" component={ActivityDashboard} />
              <Route path="/activities/:id" component={ActivityDetials} />
              <Route key={location.key} path={["/createActivity", "/manage/:id"]} component={ActivityForm} />
              <Route path="/errors" component={TestError} />
              <Route path="/server-error" component={ServerError} />
              <Route component={NotFound} />
            </Switch>
          </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
