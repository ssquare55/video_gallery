import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import Tvshows from './components/Tvshows';
import Movies from './components/Movies';
import Kids from './components/Kids';
import Front from './components/Front';
import NavBar from "./components/NavBar";
import AddProduct from './components/AddProduct';
import Wishlist from './components/Wishlist';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import EditContent from './components/EditContent';
import SearchResult from './components/SearchResult';

function App() {

  // routing 
  return (
    <BrowserRouter>

      <NavBar />

      <Switch>
        <Route path="/front">
          <Front />
        </Route>

        <Route path="/home">
          <Home />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/home">
          <Home />
        </Route>

        <Route path="/tvshows">
          <Tvshows />
        </Route>

        <Route path="/movies">
          <Movies />
        </Route>

        <Route path="/kids">
          <Kids />
        </Route>

        <Route path="/userdashboard">
          <UserDashboard />
        </Route>

        <Route exact path="/">
          <Front />
        </Route>

        <Route path="/admindashboard/:username">
          <AdminDashboard />
        </Route>

        <Route path="/add-products">
          <AddProduct />
        </Route>

        <Route path="/view-wishlist">
          <Wishlist />
        </Route>

        <Route path="/editcontent/:cid/:index">
          <EditContent />
        </Route>

        <Route path="/searchresult">
          <SearchResult />
        </Route>

      </Switch>

    </BrowserRouter>
  )
}

export default App
