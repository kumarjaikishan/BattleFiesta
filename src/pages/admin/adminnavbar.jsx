
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import './adminnavbar.css'
import Membershiprequest from "./membershiprequest/membershiprequest";
import Admindashboard from "./dashboard/dashboard";
import Contactform from "./contactform/contactform";

const Adminnavbar = () => {
    useEffect(() => {
        fetche();
    }, [])
    const tournacenter = useSelector((state) => state.tournacenter);
    const fetche = async () => {
        try {
            const token = localStorage.getItem("token");
            const responsee = await fetch(`${tournacenter.apiadress}/isadmin`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            const data = await responsee.json();
            // console.log(data);
            if (responsee.status == 403) {
                toast.warn(data.msg, { autoClose: 1700 })
            }
        } catch (error) {
            console.log(error);
        }
    }
    const [activepage, setactivepage] = useState(0);

    const handleactive = (indexe) => {
        let menu = document.querySelectorAll('.Adminnavbar .navbar div');
        for (let i = 0; i < menu.length; i++) {
           menu[i].classList.remove('active')
        }
        menu[indexe].classList.add('active')
        setactivepage(indexe);
    }

    return <>
        <div className="Adminnavbar">
            <div className="navbar">
                <div className='active' onClick={() => handleactive(0)}>
                    <i className="fa fa-tachometer" aria-hidden="true"></i>
                    <span>Dashboard</span>
                </div>
                <div onClick={() => handleactive(1)}>
                    <i className="fa fa-credit-card" aria-hidden="true"></i>
                    <span>Membership apply</span>
                </div>
                <div onClick={() => handleactive(2)}>
                    <i className="fa fa-address-book-o" aria-hidden="true"></i>
                    <span>Contact Form</span>
                </div>
                <div onClick={() => handleactive(3)}>
                    <i className="fa fa-credit-card" aria-hidden="true"></i>
                    <span>Other</span>
                </div>
            </div>
            {activepage == 0 && <Admindashboard />}
            {activepage == 1 && <Membershiprequest />}
            {activepage == 2 && <Contactform />}
        </div>
    </>
}
export default Adminnavbar;