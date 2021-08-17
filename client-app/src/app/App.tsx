import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Route, useLocation, Switch } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';
import ActivityDetials from './components/activity/ActivityDetails';
import LoginForm from './components/form/LoginForm';
import ActivityForm from './components/form/ActivityForm';
import LoadingComponents from './components/LoadingComponents';
import ModalContainer from './components/modals/ModalContainer';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';
import ServerError from './components/ServerError';
import TestError from './components/TestError';
import ActivityDashboard from './pages/ActivityDashboard';
import HomePage from './pages/HomePage';
import { useStore } from './stores/store';

function App() {
  const location = useLocation()
  const {commonStore, userStore} = useStore()

  useEffect(() => {
    if(commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded()
    }
  }, [commonStore, userStore])

  if(!commonStore.appLoaded) return <LoadingComponents content="Loading app..." />

  return (
    <>
      <ToastContainer position="bottom-right" />
      <ModalContainer />
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
              <Route path="/login" component={LoginForm} />
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
