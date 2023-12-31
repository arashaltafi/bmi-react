import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import locationSlice from "../redux/locationSlice";

const Home = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(locationSlice.actions.addLocation([{
      pathName: location.pathname,
      isLoaded: true
    }]));
  }, [])

  return (
    <h1 className="h1">Home</h1>
  )
}

export default Home