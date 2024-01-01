import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import locationSlice from "../redux/locationSlice";
import { IoIosFemale } from "react-icons/io";
import { IoIosMale } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { MdOutlineNightlight } from "react-icons/md";
import { WiDaySunny } from "react-icons/wi";
import { MdLanguage } from "react-icons/md";
import { useTranslation } from 'react-i18next';
import bmiSlice from "../redux/bmiSlice";
import Swal from 'sweetalert2'

const Home = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const bmiSelector = useSelector((state: any) => state.bmi);
  const navigate = useNavigate();
  const [height, setHeight] = useState<number>(0)
  const [weight, setWeight] = useState<number>(0)
  const [age, setAge] = useState<number>(0)
  const [isMale, setIsMale] = useState<boolean>(true)
  const inputHeight = useRef<any>(null)
  const { t, i18n } = useTranslation();

  useEffect(() => {
    dispatch(locationSlice.actions.addLocation([{
      pathName: location.pathname,
      isLoaded: true
    }]));

    setAge(bmiSelector.age)
    setHeight(bmiSelector.height)
    setWeight(bmiSelector.weight)
    setIsMale(bmiSelector.isMale)

    if (inputHeight) {
      inputHeight.current.value = bmiSelector.height.toString();
    }
  }, [])

  const updateWeight = (isIncrement: boolean) => {
    if (isIncrement) {
      setWeight(weight + 1)
    } else {
      setWeight(weight - 1)
    }
  }

  const updateAge = (isIncrement: boolean) => {
    if (isIncrement) {
      setAge(age + 1)
    } else {
      setAge(age - 1)
    }
  }

  const updateHeightOnce = (isIncrement: boolean) => {
    if (isIncrement) {
      if (height < 250) {
        setHeight(height + 1)
      }
    } else {
      if (height > 0) {
        setHeight(height - 1)
      }
    }

    if (inputHeight) {
      inputHeight.current.value = height.toString();
    }
  }

  const updateHeight = (e: any) => {
    setHeight(parseInt(e.target.value))
  }

  const updateIsMale = (isMale: boolean) => {
    setIsMale(isMale)
  }

  const handleToNavigate = () => {
    if (age > 0 && height > 0 && weight > 0) {
      dispatch(bmiSlice.actions.setAge(age));
      dispatch(bmiSlice.actions.setHeight(height));
      dispatch(bmiSlice.actions.setWeight(weight));
      dispatch(bmiSlice.actions.setIsMale(isMale));
      navigate('/result')
    } else {
      Swal.fire({
        icon: "error",
        title: `${t('fill_all')}`,
        confirmButtonText: `${t('ok')}`,
        showCloseButton: true,
      });
    }
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

  const changeLang = () => {
    if (i18n.language === 'en') {
      localStorage.setItem('lang', 'fa');
      i18n.changeLanguage('fa');
      document.body.classList.remove('font-serif')
      document.body.classList.add('font-vazir')
    } else {
      localStorage.setItem('lang', 'en')
      i18n.changeLanguage('en');
      document.body.classList.remove('font-vazir')
      document.body.classList.add('font-serif')
    }
    window.location.reload()
  }

  return (
    <div className="w-full h-screen flex flex-col gap-3 sm:gap-4 bg-slate-100 dark:bg-slate-900 py-4 px-2 sm:px-4">
      <div className="div-row mx-4">
        <MdLanguage onClick={changeLang} className='bg-action' />
        <h1 className="h2 flex-1">{t('bmi_calculator')}</h1>
        <div className="flex flex-row">
          <MdOutlineNightlight onClick={changeTheme} className='bg-action dark:hidden' />
          <WiDaySunny onClick={changeTheme} className='bg-action hidden dark:block' />
        </div>
      </div>
      <section className="w-full h-[calc(100vh-7rem)] grid grid-cols-2 grid-rows-5 gap-x-5 sm:gap-x-6 gap-y-3 sm:gap-y-4">
        <div onClick={() => updateIsMale(false)} className={`bg-item flex items-center justify-center gap-x-4 hover:scale[101%] hover:bg-sky-600 rounded-tr-3xl cursor-pointer ${isMale ? '' : 'bg-sky-500'}`}>
          <div className="h2 flex flex-row gap-4">
            <IoIosFemale />
            <p className="h2">{t('female')}</p>
          </div>
        </div>

        <div onClick={() => updateIsMale(true)} className={`bg-item flex items-center justify-center gap-x-4 hover:scale[101%] hover:bg-sky-600 rounded-tl-3xl cursor-pointer ${isMale ? 'bg-sky-500' : ''}`}>
          <div className="h2 flex flex-row gap-4">
            <IoIosMale />
            <p className="h2">{t('male')}</p>
          </div>
        </div>

        <div className="bg-item row-span-2 flex flex-col">
          <p className="flex-1 h5">{t('weight')}</p>
          <p className="flex-1 h1">{weight}</p>
          <div className="flex-1 flex flex-row gap-4 sm:gap-6 items-center justify-center">
            <button onClick={() => updateWeight(true)} className="bg-slate-300 dark:bg-slate-900 p-4 sm:p-6 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95">
              <FaPlus />
            </button>
            <button onClick={() => updateWeight(false)} className="bg-slate-300 dark:bg-slate-900 p-4 sm:p-6 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95">
              <FaMinus />
            </button>
          </div>
        </div>

        <div className="bg-item row-span-4 rounded-bl-3xl flex flex-col overflow-x-hidden items-center justify-center gap-2">
          <p className="h5">{t('height')}</p>
          <div className="flex-1 w-full h-full rotate-90 flex flex-row gap-4 items-center justify-center">
            <button onClick={() => updateHeightOnce(true)} className="bg-slate-300 dark:bg-slate-900 p-4 sm:p-6 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95">
              <FaPlus />
            </button>
            <input ref={inputHeight} onChange={(e) => updateHeight(e)} min={0} max={250} className="my-4 bg-slate-100 dark:bg-slate-800" type="range" />
            <button onClick={() => updateHeightOnce(false)} className="bg-slate-300 dark:bg-slate-900 p-4 sm:p-6 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95">
              <FaMinus />
            </button>
          </div>
          <div className="flex-row flex gap-2" style={{
            direction: i18n.language === 'fa' ? 'rtl' : 'ltr'
          }}>
            <p className="h5 font-bold">{height}</p>
            <p className="h6">{t('cm')}</p>
          </div>
        </div>

        <div className="bg-item row-span-2 rounded-br-3xl flex flex-col">
          <p className="flex-1 h5">{t('age')}</p>
          <p className="flex-1 h1">{age}</p>
          <div className="flex-1 flex flex-row gap-4 sm:gap-6 items-center justify-center">
            <button onClick={() => updateAge(true)} className="bg-slate-300 dark:bg-slate-900 p-4 sm:p-6 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95">
              <FaPlus />
            </button>
            <button onClick={() => updateAge(false)} className="bg-slate-300 dark:bg-slate-900 p-4 sm:p-6 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95">
              <FaMinus />
            </button>
          </div>
        </div>

        <button onClick={handleToNavigate} className="btn-primary col-span-2 text-xl">
          {t('lets_go')}
        </button>
      </section>
    </div>
  )
}

export default Home