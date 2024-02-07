import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import "./detail.css";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect } from 'react';

const Detail = ({ submit, upload, handleChange, loading, inp }) => {
    useEffect(() => {
        // console.log(inp);
    })
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    return (
        <>
            <div className="tournawrapper">
                <div className="tournainfo">
                    <h2>Tournament Info</h2>
                    <FormControl sx={{ m: 1,width:"96%" }}>
                        <TextField
                            helperText="Name of your tournament"
                            id="demo-helper-text-misaligned"
                            label="Tournament Name*"
                            sx={{ mb: 3 }}
                            value={inp.title}
                            name='title'
                            onChange={handleChange}
                        />
                        <TextField
                            helperText="Organiser Name of your tournament"
                            id="demo-helper-text-misaligned"
                            label="Organiser*"
                            sx={{ mb: 3 }}
                            name='organiser'
                            value={inp.organiser}
                            onChange={handleChange}
                        />
                        <TextField
                            helperText="Organiser Name of your tournament"
                            id="demo-helper-text-misaligned"
                            label="Slots*"
                            sx={{ mb: 3 }}
                            type='tel'
                            onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }}
                            name='slots'
                            value={inp.slots}
                            onChange={handleChange}
                        />

                    </FormControl>
                    <FormControl sx={{ m: 1, mb: 3,  Width:"98%"}}>
                        <InputLabel id="demo-simple-select-helper-label">Type*</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={inp.type}
                            label="type "
                            name='type'
                            onChange={handleChange}
                        >
                            <MenuItem value={1}>SOLO</MenuItem>
                            <MenuItem value={2}>DUO</MenuItem>
                            <MenuItem value={4}>SQUAD</MenuItem>
                        </Select>
                        <FormHelperText>The type: SOLO,DUO, SQUAD etc</FormHelperText>
                    </FormControl>
                    <FormControl sx={{ m: 1, mb: 3,  Width:"96%" }}>
                        <InputLabel id="demo-simple-select-helper-label">Status*</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={inp.status}
                            label="Status"
                            name='status'
                            onChange={handleChange}
                        >
                            <MenuItem value={"upcoming"}>UPCOMING</MenuItem>
                            <MenuItem value={"ongoing"}>ONGOING</MenuItem>
                            <MenuItem value={"completed"}>COMPLETED</MenuItem>
                        </Select>
                        <FormHelperText>Status of your tournament</FormHelperText>
                    </FormControl>
                    <FormControl sx={{ m: 1, mb: 3, Width:"96%" }}>
                        <InputLabel id="demo-simple-select-helper-label">Visibility*</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={inp.visibility}
                            label="Visibility"
                            name='visibility'
                            onChange={handleChange}
                        >
                            <MenuItem value={true}>PUBLISHED</MenuItem>
                            <MenuItem value={false}>HIDDEN</MenuItem>
                        </Select>
                        <FormHelperText>Should your tournament be visible in website'stournament list?</FormHelperText>
                        <TextField
                            helperText="Add labels to your tournament, keep it short"
                            id="demo-helper-text-misaligned"
                            label="Label"
                            sx={{ mt: 3 }}
                            name='label'
                            value={inp.label}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <LoadingButton
                        loading={loading}
                        loadingPosition="start"
                        startIcon={<CloudUploadIcon />}
                        variant="contained"
                        onClick={submit}
                    >
                        UPDATE
                    </LoadingButton>
                </div>
                <div className="right">
                    <div className="logos">
                        <div className="tourn_banner">
                            <h2>Tournament Banner</h2>
                            {inp.banner ? <img src={inp.banner} alt="" /> : <h3>No Banner has been uploaded for the tournament</h3>}
                            <Button disabled={loading} component="label" variant="contained"
                                startIcon={<CloudUploadIcon />}>
                                Upload
                                <VisuallyHiddenInput type="file" id='tournbanner' onChange={() => upload("tournbanner")} />
                            </Button>
                            <p>A cover image for the tournament. Tip: you could include sponsership in the cover image</p>
                        </div>
                        <div className="tourna_logo"><h2>Tournament Logo</h2>
                            {inp.logo ? <img src={inp.logo} alt="" /> : <h3>No Logo has been uploaded for the tournament</h3>}
                            <Button disabled={loading} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                Upload
                                <VisuallyHiddenInput type="file" id='tournlogo' accept="image/*" onChange={() => upload("tournlogo")} />
                            </Button>
                            <p>Tips: The Image should be in Square</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Detail