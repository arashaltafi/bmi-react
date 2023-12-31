import { useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import ScrollToTop from "./Hoc/ScrollToTop";
import Hoc from "./Hoc/Hoc";
import Home from "./components/Home";
import Info from "./components/Info";
import Result from "./components/Result";
import NotFound from "./components/NotFound";

const App = () => {

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (localStorage.getItem('theme') === 'light') {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return (
    <div className="w-full md:w-[70%] lg:w-1/2 xl:w-[40%] h-screen mx-auto">
      <Routes>
        <Route element={<ScrollToTop />}>
          <Route element={<Hoc />}>
            <Route path="/" element={<Home />} />
            <Route path="/info" element={<Info />} />
            <Route path="/result" element={<Result />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
