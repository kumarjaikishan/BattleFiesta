import { FormLabel, RadioGroup, Radio, Box, TextField, FormControlLabel, Switch } from '@mui/material';
import './TournaFormSetting.css'
import LoadingButton from '@mui/lab/LoadingButton';
import { FaSave } from "react-icons/fa";

const TournaFormSetting = ({ all, handleChange, submit, isloading }) => {

    const renderSwitch = (label, field) => (
        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 1, px: 1 }}>
            <FormLabel>{label}</FormLabel>
            <Switch
                checked={Boolean(all[field])}
                onChange={(e) =>
                    handleChange({
                        target: { name: field, value: e.target.checked },
                    })
                }
                color="success"
            />
        </Box>
    );

    return (
        <>
            <div className="maine">
                <h2>Form Setting</h2>
                <Box className="box"
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <FormLabel id="demo-row-radio-buttons-group-label">Registration</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="isopen"
                        value={all.isopen}
                        onChange={handleChange}
                    >
                        <FormControlLabel value={true} control={<Radio />} label="Open" />
                        <FormControlLabel value={false} control={<Radio />} label="closed" />

                    </RadioGroup>
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        name="description"
                        className='taxi'
                        size='small'
                        rows={7}
                        inputProps={{ style: { fontSize: "11px", lineHeight: "12px" } }}
                        onChange={handleChange}
                        value={all.description}
                        helperText="Add description or message to show on registration page."
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Successful  Message"
                        multiline
                        className='taxi'
                        size='small'
                        value={all.success_message}
                        inputProps={{ style: { fontSize: 11 } }}
                        rows={1}
                        name="success_message"
                        onChange={handleChange}
                        placeholder="Add description or message to show after Successful Registration"
                    />

                    <h3>Options:</h3>
                    {renderSwitch("Ask for Email", "ask_email")}
                    {renderSwitch("Ask for Phone Number", "ask_phone")}
                    {renderSwitch("Ask for Discord ID", "ask_discord")}
                    {renderSwitch("Ask for Team Logo", "ask_teamlogo")}
                    {renderSwitch("Ask for Player Logo", "ask_playerlogo")}
                    {renderSwitch("Ask for Payment Screenshot Upload", "ask_payment_ss")}
                    {renderSwitch("Show Payment Option", "show_payment")}
                   

                    {all.show_payment && <>
                        <TextField
                            id="outlined-number"
                            label="Upi Id"
                            className='taxi'
                            value={all.upi_id}
                            name="upi_id"
                            size='small'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleChange}
                            helperText="Enter upi to receive Payment"
                        />
                        <TextField
                            id="outlined-number"
                            label="Amount"
                            type="tel"
                            className='taxi'
                            onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                            value={all.amount}
                            name="amount"
                            size='small'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleChange}
                            helperText="Enter Amount to be received"
                        />
                    </>}

                     {renderSwitch("Ask for OS", "ask_os")}
                    {renderSwitch("Ask for FPS", "ask_fps")}
                    {renderSwitch("Ask for Device Name", "ask_devicename")}
                    

                    <LoadingButton
                        onClick={submit}
                        loading={isloading}
                        loadingPosition="start"
                        startIcon={<FaSave />}
                        variant="contained"
                        type="submit"
                    >
                        SAVE
                    </LoadingButton>
                </Box>
            </div>
        </>
    )
}
export default TournaFormSetting;