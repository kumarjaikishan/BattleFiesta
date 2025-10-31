import { FormLabel, Switch, Box, TextField, FormControlLabel, Button, RadioGroup, Radio } from '@mui/material';
import './TournaFormSetting.css';
import { useEffect } from 'react';
import { FaSave } from "react-icons/fa";
import { toast } from 'react-toastify';

const TournaFormSetting = ({ all, handleChange, submit, isloading }) => {

    useEffect(() => {
        // console.log("form setting", all);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // --- Basic custom validation ---
        if (!all.description || all.description.trim() === "") {
            toast.warn('Description is required', { autoClose: 2900 });
            return;
        }

        if (all.show_payment) {
            if (!all.upi_id || all.upi_id.trim() === "") {
                toast.warn('UPI ID is required when payment is enabled', { autoClose: 2900 });
                return;
            }
            if (!all.amount || isNaN(all.amount) || Number(all.amount) <= 0) {
                toast.warn('Please enter a valid payment amount', { autoClose: 2900 });
                return;
            }
        }

        if (
            !all.minimum_players ||
            isNaN(all.minimum_players) ||
            Number(all.minimum_players) < 1 ||
            Number(all.minimum_players) > 10
        ) {
            toast.warn('Minimum players must be between 1 and 10', { autoClose: 2900 });
            return;
        }

        if (
            !all.maximum_players ||
            isNaN(all.maximum_players) ||
            Number(all.maximum_players) < all.minimum_players ||
            Number(all.maximum_players) > 10
        ) {
            toast.warn('Maximum players must be between minimum players and 10', { autoClose: 3900 });
            return;
        }

        // ✅ Call parent submit only if validations pass
        submit();
    };

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
        <div className="maine">
            <h2>Form Setting</h2>
            <Box
                className="box"
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1 } }}
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <FormLabel>Registration Open</FormLabel>
                <RadioGroup
                    sx={{ mb: 2 }}
                    row
                    name="isopen"
                    value={all.isopen}
                    onChange={handleChange}
                >
                    <FormControlLabel value={true} control={<Radio />} label="Open" />
                    <FormControlLabel value={false} control={<Radio />} label="Closed" />
                </RadioGroup>
                {/* <Switch
                    checked={Boolean(all.isopen)}
                    onChange={(e) =>
                        handleChange({
                            target: { name: 'isopen', value: e.target.checked },
                        })
                    }
                    color="success"
                    sx={{ mb: 2 }}
                /> */}

                <TextField
                    label="Description"
                    multiline
                    name="description"
                    size="small"
                    className="taxi"
                    rows={7}
                    required
                    inputProps={{ style: { fontSize: "11px", lineHeight: "12px" } }}
                    onChange={handleChange}
                    value={all.description}
                    helperText="Add description or message to show on registration page."
                />

                <TextField
                    label="Success Message"
                    multiline
                    size="small"
                    className="taxi"
                    name="success_message"
                    inputProps={{ style: { fontSize: 11 } }}
                    rows={1}
                    onChange={handleChange}
                    value={all.success_message}
                    helperText="Add message to show after successful registration"
                />

                <h3>Options:</h3>

                {renderSwitch("Ask for Email", "ask_email")}
                {renderSwitch("Ask for Phone Number", "ask_phone")}
                {renderSwitch("Ask for Discord ID", "ask_discord")}
                {renderSwitch("Ask for Team Logo", "ask_teamlogo")}
                {renderSwitch("Ask for Player Logo", "ask_playerlogo")}
                {renderSwitch("Ask for Payment Screenshot Upload", "ask_payment_ss")}
                {renderSwitch("Show Payment Option", "show_payment")}

                {all.show_payment && (
                    <>
                        <TextField
                            label="UPI ID"
                            className="taxi"
                            name="upi_id"
                            size="small"
                            required
                            value={all.upi_id}
                            onChange={handleChange}
                            helperText="Enter UPI ID to receive payment"
                        />
                        <TextField
                            label="Amount"
                            type="tel"
                            className="taxi"
                            required
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) event.preventDefault();
                            }}
                            value={all.amount}
                            name="amount"
                            size="small"
                            onChange={handleChange}
                            helperText="Enter amount to be received"
                        />
                    </>
                )}

                <TextField
                    label="Minimum Players"
                    type="tel"
                    className="taxi"
                    required
                    onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) event.preventDefault();
                    }}
                    value={all.minimum_players}
                    name="minimum_players"
                    size="small"
                    inputProps={{ min: 1, max: 10 }}
                    onChange={handleChange}
                    helperText="Minimum number of players to register (1–10)."
                />

                <TextField
                    label="Maximum Players"
                    type="tel"
                    className="taxi"
                    required
                    onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) event.preventDefault();
                    }}
                    value={all.maximum_players}
                    name="maximum_players"
                    size="small"
                    inputProps={{ min: 1, max: 10 }}
                    onChange={handleChange}
                    helperText="Maximum number of players to register (1–10)."
                />

                <Button
                    variant="contained"
                    type="submit"
                    disabled={isloading}
                    startIcon={<FaSave />}
                    sx={{
                        mt: 2,
                        bgcolor: isloading ? 'grey.400' : 'primary.main',
                        '&:hover': {
                            bgcolor: isloading ? 'grey.400' : 'primary.dark',
                        },
                    }}
                >
                    {isloading ? 'Saving...' : 'Save'}
                </Button>
            </Box>
        </div>
    );
};

export default TournaFormSetting;
