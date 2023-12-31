import { useEffect } from "react";
import { Provider } from "react-redux"
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { store } from "./redux/Store";
import ScrollToTop from "./Hoc/ScrollToTop";
import Hoc from "./Hoc/Hoc";
import Home from "./components/Home";

const App = () => {

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (localStorage.getItem('theme') === 'light') {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return (
    <Router basename='/'>
      <Provider store={store}>
        <Routes>
          <Route element={<ScrollToTop />}>
            <Route element={<Hoc />}>
              <Route path='/' element={<Home />} />
            </Route>
          </Route>
        </Routes>
      </Provider>
    </Router>
  )
}

export default App
