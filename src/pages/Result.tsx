import { useEffect } from "react";
import locationSlice from "../redux/locationSlice";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";

const Result = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const bmiSelector = useSelector((state: any) => state.bmi);

  useEffect(() => {
    dispatch(locationSlice.actions.addLocation([{
      pathName: location.pathname,
      isLoaded: true
    }]));
  }, [])

  return (
    <div className="div-col">

    </div>
  )
}

export default Result