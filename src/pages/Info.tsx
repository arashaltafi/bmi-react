import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import locationSlice from "../redux/locationSlice";
import { useTranslation } from "react-i18next";
import { FaAngleRight } from "react-icons/fa6";
import { MdOutlineNightlight } from "react-icons/md";
import { WiDaySunny } from "react-icons/wi";

const Info = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bmiSelector = useSelector((state: any) => state.bmi);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(locationSlice.actions.addLocation([{
      pathName: location.pathname,
      isLoaded: true
    }]));
  }, [])

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

  const handleNavigateBack = () => {
    navigate(-1);
  }

  return (
    <div className="w-full h-screen flex flex-col gap-8 bg-slate-100 dark:bg-slate-900 py-4 px-4">
      <div className="div-row mx-4">
        <FaAngleRight onClick={handleNavigateBack} className='bg-action' />
        <h1 className="h2 flex-1">{t('bmi_info')}</h1>
        <div className="flex flex-row">
          <MdOutlineNightlight onClick={changeTheme} className='bg-action dark:hidden' />
          <WiDaySunny onClick={changeTheme} className='bg-action hidden dark:block' />
        </div>
      </div>

      <section className="bg-item flex flex-row items-center justify-center gap-2 py-8 mt-4">
        <span className="text-red-500 h4">{bmiSelector.result}</span><span className="h1 px-1.5 font-bold">{bmiSelector.bmi}</span><p className="h4">Your BMI </p>
      </section>

      <section className='bg-item flex-1 flex flex-col items-center justify-start gap-4 py-8 child:w-full child:px-4'>
        <div className="flex flex-row items-center justify-between">
          <p className="h5">test 1</p>
          <p className="h5">test 1</p>
        </div>

        <span className="w-full h-[1px] opacity-50 bg-slate-900 dark:bg-slate-100 my-2"></span>

        <div className="flex flex-row items-center justify-between">
          <p className="h5">test 1</p>
          <p className="h5">test 1</p>
        </div>

        <span className="w-full h-[1px] opacity-50 bg-slate-900 dark:bg-slate-100 my-2"></span>

        <div className="flex flex-row items-center justify-between">
          <p className="h5">test 1</p>
          <p className="h5">test 1</p>
        </div>

        <span className="w-full h-[1px] opacity-50 bg-slate-900 dark:bg-slate-100 my-2"></span>

        <div className="flex flex-row items-center justify-between">
          <p className="h5">test 1</p>
          <p className="h5">test 1</p>
        </div>
      </section>
    </div>
  )
}

export default Info