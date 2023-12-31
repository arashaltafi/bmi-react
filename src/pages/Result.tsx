import { useEffect } from "react";
import locationSlice from "../redux/locationSlice";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";

const Result = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(locationSlice.actions.addLocation([{
      pathName: location.pathname,
      isLoaded: true
    }]));
  }, [])

  return (
    <h1 className="h1">Result</h1>
  )
}

export default Result