import CancelIcon from '@mui/icons-material/Cancel';

const Imagemodal = ({ paymentss, setshowmodal }) => {
    return (
        <>
            <div className="ssimage">
                <div className="inner">
                    <span onClick={() => setshowmodal(false)}><CancelIcon className='cancel' /></span>
                    <img src={paymentss} alt="" />
                </div>
            </div>
        </>
    )
}
export default Imagemodal;