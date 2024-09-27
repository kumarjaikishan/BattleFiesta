import { MdCancel } from "react-icons/md";

const Imagemodal = ({ paymentss, setshowmodal }) => {
    return (
        <>
            <div className="ssimage">
                <div className="inner">
                    <span onClick={() => setshowmodal(false)}><MdCancel className='cancel' /></span>
                    <img src={paymentss} alt="" />
                </div>
            </div>
        </>
    )
}
export default Imagemodal;