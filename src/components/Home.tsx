import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import locationSlice from "../redux/locationSlice";
import { Link } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(locationSlice.actions.addLocation([{
      pathName: location.pathname,
      isLoaded: true
    }]));
  }, [])

  const handleToNavigate = () => {
    navigate('/info')
  }

  return (
    <div className="div-col">
      <h1 className="h1">Home</h1>
      <button onClick={handleToNavigate}>Navigate To Info</button>
      <Link to='/result'>Link To Result</Link>
    </div>
  )
}

export default Home