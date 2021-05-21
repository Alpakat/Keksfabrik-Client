import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import LoginPage from "./pages/Login"
import CookiesPage from "./pages/Cookies"
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <Route render={({ location }) => (
      <AnimatePresence exitBeforeEnter initial={true}>
        <Switch location={location} key={location.pathname}>
          <Route exact path="/" key="lip" >
            <LoginPage />
          </Route>
          <Route path="/cookie" key="cp" >
            <CookiesPage />
          </Route>
        </Switch>
      </AnimatePresence>
    )} />
  );
}

export default App;
