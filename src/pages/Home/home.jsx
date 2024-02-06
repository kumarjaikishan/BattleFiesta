import './home.css'
import { useSelector, useDispatch } from 'react-redux';
import { setloader } from '../../store/login';
import { useEffect } from 'react';

const Home=()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setloader(false))
    },[])
  return(
    <>
        <div className="home">
            <div className="left">

            </div>
            <div className="right">

            </div>
        </div>
    </>
  )
}
export default Home;