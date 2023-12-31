import { useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import ScrollToTop from "./Hoc/ScrollToTop";
import Hoc from "./Hoc/Hoc";
import Home from "./pages/Home";
import Info from "./pages/Info";
import Result from "./pages/Result";
import NotFound from "./pages/NotFound";
import './localiztion/i18nextSetting';

const App = () => {

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (localStorage.getItem('theme') === 'light') {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return (
    <div className="w-full md:w-[70%] lg:w-1/2 xl:w-[40%] h-screen mx-auto overflow-hidden">
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
