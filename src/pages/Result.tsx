import { useEffect } from "react";
import locationSlice from "../redux/locationSlice";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import bmiSlice from "../redux/BmiSlice";
import { IoIosArrowBack } from "react-icons/io";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bmiSelector = useSelector((state: any) => state.bmi);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    dispatch(locationSlice.actions.addLocation([{
      pathName: location.pathname,
      isLoaded: true
    }]));
  }, [])

  const handleToNavigate = () => {
    dispatch(bmiSlice.actions.setResult(''));
    navigate('/info')
  }

  const handleNavigateBack = () => {
    dispatch(bmiSlice.actions.setResult(''));
    navigate('/home')
  }

  return (
    <div className="flex flex-col gap-4 bg-slate-100 dark:bg-slate-900 py-4 px-4">
      <div className="flex flex-row items-center justify-between mx-4">
        <span></span>
        <h1 className="h2">{t('bmi_result')}</h1>
        <IoIosArrowBack onClick={handleNavigateBack} className='bg-action w-12 h-12' />
      </div>

      <div className="flex flex-col">

      </div>

      <button onClick={handleToNavigate} className="btn-primary col-span-2 text-xl">
        {t('show_info')}
      </button>
    </div>
  )
}

export default Result