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
  const { t } = useTranslation();
  const [bmi, setBmi] = useState<number>(0);
  const [bmiResult, setBmiResult] = useState<string>('');
  const [bmiColor, setBmiColor] = useState<string>('');

  useEffect(() => {
    dispatch(locationSlice.actions.addLocation([{
      pathName: location.pathname,
      isLoaded: true
    }]));

    calculateBMI()
  }, [])

  const calculateBMI = () => {
    const weight = bmiSelector.weight
    const height = bmiSelector.height

    const heightInMeters = height / 100;
    const bmiValue = parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(2));

    dispatch(bmiSlice.actions.setBmi(bmiValue));
    setBmi(bmiValue)

    getBmiMessage(bmiValue)
  };

  const getBmiMessage = (bmiValue: number) => {
    let result = '';
    let color = '';

    if (bmiValue == 0) {
      result = '';
      color = 'white';
    } else if (bmiValue < 18.5) {
      result = t('underweight');
      color = 'blue';
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      result = t('normal_weight');
      color = 'green';
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      result = t('overweight');
      color = 'yellow';
    } else {
      result = t('obese');
      color = 'red';
    }

    dispatch(bmiSlice.actions.setResult(result));
    setBmiResult(result)
    setBmiColor(color)
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
        <div className="flex items-center justify-center w-72 h-72 rounded-full shadow-2xl shadow-slate-400 dark:shadow-slate-950">
          <div
            className={`
            flex items-center justify-center w-64 h-64 border-[16px] border-solid rounded-full shadow-lg
            ${bmiColor == 'white' ? 'border-white shadow-white' : ''}
            ${bmiColor == 'blue' ? 'border-blue-400 shadow-blue-500' : ''} 
            ${bmiColor == 'green' ? 'border-green-400 shadow-green-500' : ''} 
            ${bmiColor == 'red' ? 'border-red-400 shadow-red-500' : ''} 
            ${bmiColor == 'yellow' ? 'border-yellow-400 shadow-yellow-500' : ''}
        `}
          >
            <p className="h1 text-5xl font-bold">{bmi}</p>
          </div>
        </div>

        <p className="h3">{bmiResult}</p>
      </section >

      <button onClick={() => handleToNavigate('/info')} className="btn-primary col-span-2 text-xl">
        {t('show_info')}
      </button>
    </div >
  )
}

export default Result