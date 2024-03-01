
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';

const Admindashboard = () => {
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
            if(responsee.status == 403){
                toast.warn(data.msg, {autoClose:1700})
            }
        } catch (error) {
            console.log(error);
        }

    }
    return <>
        <h1>Admindashboard</h1>
    </>
}
export default Admindashboard;