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
    <div className="flex flex-col gap-4 bg-slate-100 dark:bg-slate-900 py-4 px-4">
      <h1 className="h2">BMI Calculator</h1>
      <div className="w-full h-[calc(100vh-6rem)] grid grid-cols-2 grid-rows-5 gap-x-6 gap-y-4">
        <div className="bg-item flex items-center justify-center gap-x-4 hover:bg-sky-600 rounded-tl-3xl cursor-pointer">
          <div className="h1 flex flex-row gap-4">
            <IoIosMale />
            <p className="h1">Male</p>
          </div>
        </div>
        <div className="bg-item flex items-center justify-center gap-x-4 hover:bg-sky-600 rounded-tr-3xl cursor-pointer">
          <div className="h1 flex flex-row gap-4">
            <IoIosFemale />
            <p className="h1">Female</p>
          </div>
        </div>
        <div className="bg-item row-span-4 rounded-bl-3xl">Weight</div>
        <div className="bg-item row-span-2">Height</div>
        <div className="bg-item row-span-2 rounded-br-3xl">Age</div>
        <button onClick={changeTheme} className="btn-primary col-span-2 text-xl">
          Let's Begin
        </button>
      </div>
    </div>
  )
}

export default Home