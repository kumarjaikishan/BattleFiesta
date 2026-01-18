import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setlogin } from '../../store/login';
import { userlogout } from '../../store/api';
import { userProfileClear } from '../../store/profile';

const Logout = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    localStorage.clear("token");
    document.title = "AccuSoft";
    dispatch(userlogout());
    dispatch(userProfileClear());
    dispatch(setlogin(false));
    return navigate('/login');
  }, [])
}

export default Logout