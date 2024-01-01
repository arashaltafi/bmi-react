import { useEffect, useState } from "react";
import locationSlice from "../redux/locationSlice";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import bmiSlice from "../redux/BmiSlice";
import { FaAngleRight } from "react-icons/fa6";
import { MdOutlineNightlight } from "react-icons/md";
import { WiDaySunny } from "react-icons/wi";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bmiSelector = useSelector((state: any) => state.bmi);
  const { t, i18n } = useTranslation();
  const [bmi, setBmi] = useState<number>(0);
  const [bmiResult, setBmiResult] = useState<string>('');

  useEffect(() => {
    dispatch(locationSlice.actions.addLocation([{
      pathName: location.pathname,
      isLoaded: true
    }]));

    calculateBMI()
    getBmiMessage()
  }, [])

  const calculateBMI = () => {
    const weight = bmiSelector.weight
    const height = bmiSelector.height

    const heightInMeters = height / 100;
    const bmiValue = parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(2));

    dispatch(bmiSlice.actions.setBmi(bmiValue));
    setBmi(bmiValue)
  };

  const getBmiMessage = () => {
    let result = '';

    if (bmi == 0) {
      result = '';
    } else if (bmi < 18.5) {
      result = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      result = 'Normal weight';
    } else if (bmi >= 25 && bmi < 29.9) {
      result = 'Overweight';
    } else {
      result = 'Obese';
    }

    dispatch(bmiSlice.actions.setResult(result));
    setBmiResult(result)
  };

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

  const handleToNavigate = (address: string | null) => {
    dispatch(bmiSlice.actions.setResult(''));
    navigate(address || '/')
  }

  return (
    <div className="w-full h-screen flex flex-col gap-4 bg-slate-100 dark:bg-slate-900 py-4 px-4">
      <div className="div-row mx-4">
        <FaAngleRight onClick={() => handleToNavigate(null)} className='bg-action' />
        <h1 className="h2 flex-1">{t('bmi_result')}</h1>
        <div className="flex flex-row">
          <MdOutlineNightlight onClick={changeTheme} className='bg-action dark:hidden' />
          <WiDaySunny onClick={changeTheme} className='bg-action hidden dark:block' />
        </div>
      </div>

      <section className="flex flex-col flex-1 gap-12 items-center justify-center">
        <div className="flex items-center justify-center w-72 h-72 rounded-full shadow-2xl shadow-slate-300 dark:shadow-slate-950">
          <div className="flex items-center justify-center w-64 h-64 border-[16px] border-solid border-amber-400 rounded-full shadow-lg shadow-amber-500">
            <p className="h1 text-5xl font-bold">{bmi}</p>
          </div>
        </div>

        <p className="h5">{bmiResult}</p>
      </section>

      <button onClick={() => handleToNavigate('/info')} className="btn-primary col-span-2 text-xl">
        {t('show_info')}
      </button>
    </div>
  )
}

export default Result