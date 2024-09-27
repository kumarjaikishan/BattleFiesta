import { FormLabel, RadioGroup, Radio, Box, TextField, FormControlLabel } from '@mui/material';
import './TournaFormSetting.css'
import { useEffect } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { FaSave } from "react-icons/fa";

const TournaFormSetting = ({ all, handleChange, submit, isloading }) => {
useEffect(()=>{
// console.log("form setting", all);
},[])
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
                        defaultValue={false}
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
                        rows={4}
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
                        value={all.success_message}
                        inputProps={{ style: { fontSize: 11 } }}
                        rows={1}
                        name="success_message"
                        onChange={handleChange}
                        placeholder="Add description or message to show after Successful Registration"
                    />

                    <h3>Options:</h3>
                    <FormLabel id="demo-row-radio-buttons-group-label">Ask for Email</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="ask_email"
                        defaultValue={false}
                        value={all.ask_email}
                        sx={{ mb: 1 }}
                        onChange={handleChange}
                    >
                        <FormControlLabel value={true} control={<Radio />} label="Enable" />
                        <FormControlLabel value={false} control={<Radio />} label="Disabled" />

                    </RadioGroup>
                    <FormLabel id="demo-row-radio-buttons-group-label">Ask for Phone Number</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="ask_phone"
                        defaultValue={false}
                        value={all.ask_phone}
                        sx={{ mb: 2 }}
                        onChange={handleChange}
                    >
                        <FormControlLabel value={true} control={<Radio />} label="Enable" />
                        <FormControlLabel value={false} control={<Radio />} label="Disabled" />

                    </RadioGroup>
                    <FormLabel id="demo-row-radio-buttons-group-label">Ask for Discord ID</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="ask_discord"
                        defaultValue={false}
                        value={all.ask_discord}
                        sx={{ mb: 1 }}
                        onChange={handleChange}
                    >
                        <FormControlLabel value={true} control={<Radio />} label="Enable" />
                        <FormControlLabel value={false} control={<Radio />} label="Disabled" />

                    </RadioGroup>
                    <FormLabel id="demo-row-radio-buttons-group-label">Ask for Team Logo</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="ask_teamlogo"
                        defaultValue={false}
                        value={all.ask_teamlogo}
                        sx={{ mb: 1 }}
                        onChange={handleChange}
                    >
                        <FormControlLabel value={true} control={<Radio />} label="Enable" />
                        <FormControlLabel value={false} control={<Radio />} label="Disabled" />

                    </RadioGroup>
                    <FormLabel id="demo-row-radio-buttons-group-label">Ask for Player Logo</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="ask_playerlogo"
                        defaultValue={false}
                        value={all.ask_playerlogo}
                        sx={{ mb: 1 }}
                        onChange={handleChange}
                    >
                        <FormControlLabel value={true} control={<Radio />} label="Enable" />
                        <FormControlLabel value={false} control={<Radio />} label="Disabled" />

                    </RadioGroup>
                    <FormLabel id="demo-row-radio-buttons-group-label">Ask for Payment Screenshort</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="ask_payment_ss"
                        defaultValue={false}
                        value={all.ask_payment_ss}
                        sx={{ mb: 1 }}
                        onChange={handleChange}
                    >
                        <FormControlLabel value={true} control={<Radio />} label="Enable" />
                        <FormControlLabel value={false} control={<Radio />} label="Disabled" />

                    </RadioGroup>
                    <FormLabel id="demo-row-radio-buttons-group-label">Show Payment Option</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="show_payment"
                        defaultValue={false}
                        value={all.show_payment}
                        sx={{ mb: 1 }}
                        onChange={handleChange}
                    >
                        <FormControlLabel value={true} control={<Radio />} label="Enable" />
                        <FormControlLabel value={false} control={<Radio />} label="Disabled" />

                    </RadioGroup>
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

                    <TextField
                        id="outlined-number"
                        label="Minimum Players"
                        type="tel"
                        className='taxi'
                        onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                        value={all.minimum_players}
                        name="minimum_players"
                        size='small'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleChange}
                        helperText="Minimum no. of players need to be registered."
                    />
                    <TextField
                        id="outlined-number"
                        label="Maximum Players"
                        className='taxi'
                        type="tel"
                        size='small'
                        onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                        name="maximum_players"
                        value={all.maximum_players}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        helperText="Maximim no. of players need to be registered."
                    />
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