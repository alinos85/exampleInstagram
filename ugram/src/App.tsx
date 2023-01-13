import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import "./App.scss";
import UsersList from "./components/users-list/users-list.component";
//import UsersProfileRoute from "./components/users-list/users-list-route.component";
import UserPost from "./components/user/user-post.component";
import Header from "./components/layout/header.component";
import Footer from "./components/layout/footer.component";
import Feed from "./components/feed/feed.component";
import ImageDetails from "./components/imageDetails.component";
import UserProfile from "./components/user-profile/user-profile.component";
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path={"/"} exact component={Feed} />
          <Route path={"/users"} exact component={UsersList} />
          <Route path={"/uploads"} exact component={UserPost} />
          <Route path="/details/:id" exact component={ImageDetails} />
          <Route path="/users/:userName" component={UserProfile} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
