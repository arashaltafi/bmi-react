import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
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

const Home = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [height, setHeight] = useState<number>(170)
  const inputHeight = useRef<any>(null)
  const { t, i18n } = useTranslation();

  useEffect(() => {
    dispatch(locationSlice.actions.addLocation([{
      pathName: location.pathname,
      isLoaded: true
    }]));

    if (inputHeight) {
      inputHeight.current.value = height.toString();
    }

    i18n.changeLanguage(localStorage.getItem('lang') || 'fa');
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

  const changeLang = () => {
    if (i18n.language === 'en') {
      localStorage.setItem('lang', 'fa');
      i18n.changeLanguage('fa');
    } else {
      localStorage.setItem('lang', 'en')
      i18n.changeLanguage('en');
    }
    // window.location.reload()
  }

  return (
    <div className="flex flex-col gap-4 bg-slate-100 dark:bg-slate-900 py-4 px-4">
      <div className="div-row mx-4">
        <MdLanguage onClick={changeLang} className='bg-action' />
        <h1 className="h2 flex-1">{t('bmi_calculator')}</h1>
        <div className="flex flex-row">
          <MdOutlineNightlight onClick={changeTheme} className='bg-action dark:hidden' />
          <WiDaySunny onClick={changeTheme} className='bg-action hidden dark:block' />
        </div>
      </div>
      <section className="w-full h-[calc(100vh-7rem)] grid grid-cols-2 grid-rows-5 gap-x-6 gap-y-4">
        <div className="bg-item flex items-center justify-center gap-x-4 hover:scale[101%] hover:bg-sky-600 rounded-tr-3xl cursor-pointer">
          <div className="h1 flex flex-row gap-4">
            <IoIosFemale />
            <p className="h1">{t('female')}</p>
          </div>
        </div>
        <div className="bg-item flex items-center justify-center gap-x-4 hover:scale[101%] hover:bg-sky-600 rounded-tl-3xl cursor-pointer">
          <div className="h1 flex flex-row gap-4">
            <IoIosMale />
            <p className="h1">{t('male')}</p>
          </div>
        </div>

        <div className="bg-item row-span-2 flex flex-col">
          <p className="flex-1 h5">{t('weight')}</p>
          <p className="flex-1 h1">25</p>
          <div className="flex-1 flex flex-row gap-6 items-center justify-center">
            <button className="bg-slate-300 dark:bg-slate-900 p-6 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95">
              <FaPlus />
            </button>
            <button className="bg-slate-300 dark:bg-slate-900 p-6 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95">
              <FaMinus />
            </button>
          </div>
        </div>

        <div className="bg-item row-span-4 rounded-bl-3xl flex flex-col overflow-hidden items-center justify-center gap-4">
          <p className="h5">{t('height')}</p>
          <input ref={inputHeight} onChange={(e) => updateHeight(e)} min={0} max={250} className="bg-slate-100 dark:bg-slate-800 flex-1 rotate-90" type="range" />
          <div className="flex-row flex gap-2">
            <p className="h5 font-bold">{height}</p>
            <p className="h5">{t('cm')}</p>
          </div>
        </div>

        <div className="bg-item row-span-2 rounded-br-3xl flex flex-col">
          <p className="flex-1 h5">{t('age')}</p>
          <p className="flex-1 h1">25</p>
          <div className="flex-1 flex flex-row gap-6 items-center justify-center">
            <button className="bg-slate-300 dark:bg-slate-900 p-6 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95">
              <FaPlus />
            </button>
            <button className="bg-slate-300 dark:bg-slate-900 p-6 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95">
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