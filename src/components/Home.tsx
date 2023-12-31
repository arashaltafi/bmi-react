import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import locationSlice from "../redux/locationSlice";
import { Link } from "react-router-dom";
import { IoIosFemale } from "react-icons/io";
import { IoIosMale } from "react-icons/io";

const Home = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(locationSlice.actions.addLocation([{
      pathName: location.pathname,
      isLoaded: true
    }]));
  }, [])

  const handleToNavigate = () => {
    navigate('/info')
  }

  const changeTheme = () => {
    if (localStorage.getItem('theme') === 'light') {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    } else if (localStorage.getItem('theme') === 'dark') {
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark')
    } else {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    }
  }

  return (
    <div className="bg-slate-100 dark:bg-slate-950 py-4 px-4">
      <h1 className="h2">BMI Calculator</h1>
      <div className="w-full h-[calc(100vh-6rem)] grid grid-cols-2 grid-rows-5 gap-x-4 gap-y-4">
        <div className="bg-item flex items-center justify-center gap-x-4">
          <IoIosMale />
          <p className="h2">Male</p>
        </div>
        <div className="bg-item flex items-center justify-center gap-x-4">
          <IoIosFemale />
          <p className="h2">Female</p>
        </div>
        <div className="bg-item row-span-4">Weight</div>
        <div className="bg-item row-span-2">Height</div>
        <div className="bg-item row-span-2">Age</div>
        <button onClick={changeTheme} className="btn-primary col-span-2">Let's Begin</button>
      </div>
    </div>
  )
}

export default Home