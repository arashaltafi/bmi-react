import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import locationSlice from "../redux/locationSlice";
import { IoIosFemale } from "react-icons/io";
import { IoIosMale } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";

const Home = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [height, setHeight] = useState<number>(170)
  const inputHeight = useRef<any>(null)

  useEffect(() => {
    dispatch(locationSlice.actions.addLocation([{
      pathName: location.pathname,
      isLoaded: true
    }]));

    if (inputHeight) {
      inputHeight.current.value = height.toString();
    }
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

  const updateHeight = (e: any) => {
    setHeight(e.target.value)
  }

  return (
    <div className="flex flex-col gap-4 bg-slate-100 dark:bg-slate-900 py-4 px-4 overflow-hidden">
      <h1 className="h2">BMI Calculator</h1>
      <div className="w-full h-[calc(100vh-6rem)] grid grid-cols-2 grid-rows-5 gap-x-6 gap-y-4">
        <div className="bg-item flex items-center justify-center gap-x-4 hover:scale[101%] hover:bg-sky-600 rounded-tr-3xl cursor-pointer">
          <div className="h1 flex flex-row gap-4">
            <IoIosFemale />
            <p className="h1">زن</p>
          </div>
        </div>
        <div className="bg-item flex items-center justify-center gap-x-4 hover:scale[101%] hover:bg-sky-600 rounded-tl-3xl cursor-pointer">
          <div className="h1 flex flex-row gap-4">
            <IoIosMale />
            <p className="h1">مرد</p>
          </div>
        </div>
        <div className="bg-item row-span-2">
          <p className="h5">وزن</p>
        </div>
        <div className="bg-item row-span-4 rounded-bl-3xl flex flex-col overflow-hidden items-center justify-center gap-4">
          <p className="h5">قد</p>
          <input ref={inputHeight} onChange={(e) => updateHeight(e)} min={0} max={250} className="bg-slate-100 dark:bg-slate-800 flex-1 rotate-90" type="range" />
          <div className="flex-row flex gap-2">
            <p className="h5 font-bold">{height}</p>
            <p className="h5">سانتی متر</p>
          </div>
        </div>
        <div className="bg-item row-span-2 rounded-br-3xl flex flex-col">
          <p className="flex-1 h5">سن</p>
          <p className="flex-1 h1">25</p>
          <div className="flex-1 flex flex-row gap-6 items-center justify-center">
            <button className="bg-slate-300 dark:bg-slate-900 p-6 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
              <FaPlus />
            </button>
            <button className="bg-slate-300 dark:bg-slate-900 p-6 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
              <FaMinus />
            </button>
          </div>
        </div>

        <button onClick={changeTheme} className="btn-primary col-span-2 text-xl">
          برو بریم!
        </button>
      </div>
    </div>
  )
}

export default Home