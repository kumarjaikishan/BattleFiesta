import { useEffect, useState } from "react";
import { Button } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import html2canvas from "html2canvas";

const Fragger = ({ topplayer, matches, teamdeatil, log }) => {
    const [top, settop] = useState([])
    const [topteam, settopteam] = useState([]);
    const group = 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1718950087/battlefiesta/assets/icon/group_a3fhyv.webp'
    const user = 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1718950087/battlefiesta/assets/icon/user_p5egd9.webp'
    useEffect(() => {
        // console.log("teamdetail -", teamdeatil);
        // console.log("topplayers :", topplayer);
        settop(topplayer.filter((val, ind) => {
            return ind < 5;
        }))
    }, [topplayer])
    useEffect(() => {
        functione();
    }, [matches])

    const functione = () => {
        let dfvefr = [];
        matches.length > 0 && matches.map((match, ind) => {
            match.points.map((val, ind) => {

                if (dfvefr.length < 1) {
                    let dv = {
                        team: val.team,
                        teamid: val.teamid,
                        kills: val.kills
                    }
                    dfvefr.push(dv)
                } else {
                    let karnahai = true;
                    dfvefr.map((dfd, ffg) => {
                        if (dfd.teamid == val.teamid) {
                            karnahai = false;
                            dfd.kills += val.kills
                        }
                    })
                    let dv = {
                        team: val.team,
                        teamid: val.teamid,
                        kills: val.kills
                    }
                    karnahai && dfvefr.push(dv)
                }
            })
        })

        dfvefr.map((ggh, yu) => {
            teamdeatil.map((fdfggh, fggf) => {
                if (ggh.teamid == fdfggh._id) {
                    ggh.logo = fdfggh.teamLogo
                }
            })
        })
        dfvefr.sort((a, b) => {
            return b.kills - a.kills
        })

        // console.log(dfvefr);
        settopteam(dfvefr)
    }
    const [disable, setdisable] = useState(false);

    const imagedownload = () => {
        setdisable(true);
        const timenow = new Date();
        const rand = timenow.getMinutes();

        // Override mobile layout by temporarily simulating a large screen size
        const boxElement = document.querySelector('#fragger');

        // Save the current style
        const originalWidth = boxElement.style.width;
        const originalHeight = boxElement.style.height;

        // Force the element to behave like a desktop size
        boxElement.style.width = '1680px'; // Set desired desktop width
        boxElement.style.minHeight = '945px'; // Set desired desktop height

        let quality = 3; // Adjust this if needed
        html2canvas(boxElement, { scale: quality, useCORS: true })
            .then((canvas) => {
                const dataUrl = canvas.toDataURL(); // Get the data URL of the canvas
                const anchor = document.createElement('a');
                anchor.href = dataUrl;
                anchor.download = `Fraggers @${rand}.png`; // Change the filename as needed
                document.body.appendChild(anchor);
                anchor.click();
                document.body.removeChild(anchor);
                setdisable(false);

                // Restore the original styles after capturing
                boxElement.style.width = originalWidth;
                boxElement.style.minHeight = originalHeight;
            })
            .catch((error) => {
                console.error('Error generating image:', error);
                setdisable(false);

                //Restore the original styles if an error occurs
                boxElement.style.width = originalWidth;
                boxElement.style.minHeight = originalHeight;
            });
    };

    return (
        <>
            <div className="fragger" id="fragger">
                <h2>Top Fraggers</h2>
                {matches.length < 1 && <div><h3 style={{ color: 'white', textAlign: 'center' }}>No Match Found</h3></div>}
                {matches.length && <><div className="boxes">
                    {top && top.map((player, ind) => {
                        return <div className="box" key={ind}>
                            <div className="img">
                                <img src={player.logo ? player.logo : user} alt="" />
                                <span>{player.name}</span>
                            </div>
                            <div className="below">
                                {player.kills} kills
                            </div>
                            <div className="below">Team- {player.team}</div>
                        </div>
                    })}
                </div>
                    <div className="table">
                        <div className="tabledata">
                            <h2>Top 10 Player</h2>
                            <div className="tablehead">
                                <span>PLAYER</span>
                                <span>KILLS</span>
                            </div>
                            {topplayer.slice(0, 10).map((player, ind) => {
                                return <div key={ind}>
                                    <span>
                                        <span>#{ind + 1}</span>
                                        <span><img src={player.logo ? player.logo : user} alt="" /> </span>
                                        <span>{player.name}</span>
                                    </span>
                                    <span>{player.kills}</span>
                                </div>
                            })}
                        </div>
                        <div className="tabledata">
                            <h2>Top 10 Team</h2>
                            <div className="tablehead">
                                <span>Team</span>
                                <span>KILLS</span>
                            </div>
                            {topteam.slice(0, 10).map((team, ind) => {
                                return <div key={ind}>
                                    <span> <span>#{ind + 1}</span> <span><img src={team.logo ? team.logo : group} alt="" /> </span><span>{team.team}</span></span>
                                    <span>{team.kills}</span>
                                </div>
                            })}
                        </div>
                    </div>

                </>}
            </div>
            {log.islogin &&
                <div style={{ textAlign: 'center' }}>
                    <Button disabled={disable} onClick={imagedownload} title='Download Fraggers Stat' sx={{ mt: 1, width: "150px" }} component="label" variant="contained" startIcon={<CloudDownloadIcon />}>
                        Download
                    </Button>
                </div>
            }
        </>
    )
}
export default Fragger;