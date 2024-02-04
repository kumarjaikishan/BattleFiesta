import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import './TournaFormSetting.css'
import { useEffect } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

const TournaFormSetting = ({ all, handleChange, submit, isloading }) => {

    useEffect(() => {
        //  console.log(all);
    }, [])
    return (
        <>
            <div className="maine">
                <h2>Form Setting</h2>
                <Box className="box"
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '35%' },
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
                        rows={2}
                        inputProps={{ style: { fontSize: 11 } }}
                        onChange={handleChange}
                        value={all.description}
                        placeholder="Add description or message to show on registration page."
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Successful  Message"
                        multiline
                        value={all.success_msg}
                        inputProps={{ style: { fontSize: 11 } }}
                        rows={1}
                        name="success_msg"
                        onChange={handleChange}
                        placeholder="Add description or message to show after Successful Registration"
                    />
                    <br /><br />
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
                        name="ask_team_logo"
                        defaultValue={false}
                        value={all.ask_team_logo}
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
                        name="ask_player_logo"
                        defaultValue={false}
                        value={all.ask_player_logo}
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
                    <TextField
                        id="outlined-number"
                        label="Minimum Players"
                        type="tel"
                        onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                        value={all.min_player}
                        name="min_player"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleChange}
                        helperText="Minimum no. of players need to be registered."
                    />
                    <TextField
                        id="outlined-number"
                        label="Maximum Players"
                        type="tel"
                        onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                        name="max_player"
                        value={all.max_player}
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
                        startIcon={<SaveIcon />}
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