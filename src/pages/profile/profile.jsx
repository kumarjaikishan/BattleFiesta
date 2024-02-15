import './profile.css'
import TextField from '@mui/material/TextField';
import photo from '../../assets/user.webp'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { toast } from "react-toastify";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Profile = () => {
    const tournacenter = useSelector((state) => state.tournacenter);
    const init = {
        name: '',
        username: '',
        email: '',
        phone: '',
        bio: '',
        publicemail: '',
        publicphone: '',
        profile:'',
        sociallinks: []
    }
    const [inp, setinp] = useState(init)
    useEffect(() => {
        fetche();
    }, [])
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

    const fetche = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`${tournacenter.apiadress}/profile`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
            let data = await res.json();
            data = data.data;
            if (res.ok) {
                // console.log(data);
                setinp({
                    ...inp,
                    name: data.name,
                    username: data.username,
                    email: data.email,
                    phone: data.phone,
                    bio: data.bio,
                    publicemail: data.publicemail,
                    publicphone: data.publicphone,
                    sociallinks: data.sociallinks,
                    profile:data.imgsrc
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    const newlink = () => {
        let newe = {
            name: '',
            link: ''
        }
        setinp({
            ...inp, sociallinks: [...inp.sociallinks, newe]
        })
    }
    const deletelink = (index) => {
        let newsociallink = inp.sociallinks.filter((val, ind) => {
            return ind != index
        })
        setinp({
            ...inp,
            sociallinks: newsociallink
        })
    }

    const handleChange = (e, index) => {
        // setAge(event.target.value);
        const naam = e.target.name;
        const value = e.target.value;
        const updated = [...inp.sociallinks];
        updated[index] = { ...updated[index], [naam]: value };

        setinp({
            ...inp, sociallinks: updated
        })
    };
    const handlechangee = (e) => {
        const naam = e.target.name;
        const value = e.target.value;
        setinp({ ...inp, [naam]: value });
    }
    const submit = async (e) => {
        e.preventDefault();
        // console.log(inp);
        const id = toast.loading("Please wait...")
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${tournacenter.apiadress}/updateprofile`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(inp)
            })
            const data = await res.json();
            if (res.ok) {
                toast.update(id, { render: data.msg, type: "success", isLoading: false, autoClose: 1600 });
                // console.log(data);
            }
        } catch (error) {
            toast.update(id, { render: error, type: "warn", isLoading: false, autoClose: 1600 });
            console.log(error);
        }
    }

    const handleimage = (event) => {
        let WIDTH = 500;
        let image_file = event.target.files[0] || event;
        let newimage = "";
        let name = Date.now() + image_file.name;
        // console.log(name);
        let reader = new FileReader
        reader.readAsDataURL(image_file)
        reader.onload = async (event) => {
            let image_url = event.target.result
            let image = document.createElement('img');
            image.src = image_url;
            // document.querySelector("#wrapper").appendChild(image)
            image.onload = async (e) => {
                let canvas = document.createElement("canvas")
                let ratio = WIDTH / e.target.width
                canvas.width = WIDTH
                canvas.height = e.target.height * ratio
                //    console.log(canvas.height)
                const context = canvas.getContext("2d")
                context.drawImage(image, 0, 0, canvas.width, canvas.height)

                let new_image_url = context.canvas.toDataURL("image/jpeg", 100)

                newimage = urlToFile(new_image_url, name);

                // console.log(newimage);

                const id = toast.loading("Uploading Please wait...")
                try {
                    const token = localStorage.getItem("token");
                    const formData = new FormData();
                    formData.append(`profilepic`,newimage );
                    const res = await fetch(`${tournacenter.apiadress}/updateprofilepic`, {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        },
                        body: formData
                    })
                    const data = await res.json();
                    if (res.ok) {
                        toast.update(id, { render: data.msg, type: "success", isLoading: false, autoClose: 1600 });
                        console.log(data);
                        setinp({...inp,profile:data.url});
                    }
                } catch (error) {
                    toast.update(id, { render: error, type: "warn", isLoading: false, autoClose: 1600 });
                    console.log(error);
                }
            }
        }
    }
    const urlToFile = (url, naam) => {
        let arr = url.split(",");
        let mime = arr[0].match(/:(.*?);/)[1]
        let data = arr[1]
        let dataStr = atob(data)
        let n = dataStr.length
        let dataArr = new Uint8Array(n)

        while (n--) {
            dataArr[n] = dataStr.charCodeAt(n)
        }
        let file = new File([dataArr], naam, { type: mime })
        // console.log(file);
        return file;
    }
    return (
        <div className="profile">
            <div className="circle circle1"></div>
            <div className="circle circle2"></div>
            <div className="menu">
                <div>
                    <i className="fa fa-user-o" aria-hidden="true"></i>
                    <span>Profile</span>
                </div>
                <div className='active'>
                    <i className="fa fa-credit-card" aria-hidden="true"></i>
                    <span>Membership</span>
                </div>
                <div>
                    <i className="fa fa-superpowers" aria-hidden="true"></i>
                    <span>Profile</span>
                </div>
            </div>
            <div className="materials">
                <div className="profilepic glass">
                    <h2>Profile Picture</h2>
                    <div className="img">
                        <img src={inp.profile ? inp.profile : photo}
                            alt="" />
                    </div>
                    <div> <h2>{inp.name}</h2></div>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload file
                        <VisuallyHiddenInput onChange={handleimage} type="file" />
                    </Button>
                </div>
                <div className="profiledeatil glass">
                    <h2>Profile</h2>
                    <form onSubmit={submit}>
                        <div className="input">
                            <TextField onChange={handlechangee} name="name" value={inp.name} className="half" id="outlined-basic" label="Display Name" variant="outlined" />
                            <TextField onChange={handlechangee} name='username' value={inp.username} className="half" id="outlined-basic" label="UserName" variant="outlined" />
                            <TextField contentEditable={false} name='email' value={inp.email} className="half" id="outlined-basic" label="Email" variant="outlined" />
                            <TextField onChange={handlechangee} name='phone' value={inp.phone} type='number' className="half" id="outlined-basic" label="Phone" variant="outlined" />
                            <TextField onChange={handlechangee} name='bio' value={inp.bio} multiline rows={2} className="full" id="outlined-basic" label="Bio" variant="outlined" />
                        </div>
                        <button type='submit'>Save</button>
                    </form>
                </div>
                <div className="social glass">
                    <h2>Social Links</h2>
                    <form onSubmit={submit}>
                        {inp.sociallinks && inp.sociallinks.map((val, ind) => {
                            return <div key={ind} className='link'>
                                <span>
                                    <FormControl fullWidth size='small'>
                                        <InputLabel id="demo-simple-select-label">Name*</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={val.name}
                                            required
                                            label="Name"
                                            name='name'
                                            onChange={(e) => handleChange(e, ind)}
                                        >
                                            <MenuItem value={'facebook'}><i className="fa fa-whatsapp" aria-hidden="true"> </i> &nbsp; Facebook</MenuItem>
                                            <MenuItem value={'youtube'}><i className="fa fa-youtube-play" aria-hidden="true"></i> &nbsp; Youtube</MenuItem>
                                            <MenuItem value={'instagram'}><i className="fa fa-instagram" aria-hidden="true"></i>&nbsp; Instagram</MenuItem>
                                            <MenuItem value={'discord'}><i className="fa fa-gamepad" aria-hidden="true"></i>&nbsp; Discord</MenuItem>
                                            <MenuItem value={'telegram'}><i className="fa fa-telegram" aria-hidden="true"></i>&nbsp; Telegram</MenuItem>
                                            <MenuItem value={'twitter'}><i className="fa fa-twitter" aria-hidden="true"></i>&nbsp; Twitter</MenuItem>
                                            <MenuItem value={'website'}><i className="fa fa-link" aria-hidden="true"></i>&nbsp; Website</MenuItem>
                                        </Select>
                                    </FormControl>
                                </span>
                                <span>
                                    <TextField required value={val.link} name='link' fullWidth size='small'
                                        onChange={(e) => handleChange(e, ind)}
                                        className="half" id="outlined-basic" label=" Url*.. " variant="outlined" />
                                </span>
                                <span title='Remove This' onClick={() => deletelink(ind)}> <CloseIcon /> </span>
                            </div>
                        })}

                        <div>
                            <Button variant="outlined" onClick={newlink} startIcon={<AddIcon />}>
                                Add
                            </Button>
                        </div>
                        <button type='submit'>Save</button>
                    </form>
                </div>
                <div className="privacy glass">
                    <h2>Privacy</h2>
                    <div className="input">
                        <TextField onChange={handlechangee} name='publicemail' value={inp.publicemail} className="full" id="outlined-basic"
                            helperText="This emaill will be visible on your profile page"
                            label="Public Email" variant="outlined" />
                        <TextField onChange={handlechangee} type='number' name='publicphone' value={inp.publicphone} className="full" id="outlined-basic"
                            helperText="This phone number will be visible on your profile page"
                            label="Public Phone" variant="outlined" />
                    </div>
                    <button>Save</button>
                </div>
            </div>
        </div>
    )
}
export default Profile;