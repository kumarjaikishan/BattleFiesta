import { useEffect, useState } from "react";
import { Button } from '@mui/material';
import { MdDiversity3 } from "react-icons/md";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { IoCloudDownloadSharp } from "react-icons/io5";
import { cloudinaryUrl } from "../../../utils/imageurlsetter";

const Fragger = ({ topplayer, isDesktopMode, topteam }) => {
    const group = 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1718950087/battlefiesta/assets/icon/group_a3fhyv.webp'
    const user = 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1718950087/battlefiesta/assets/icon/user_p5egd9.webp'

    useEffect(() => {
        //  console.log(topplayer)
    }, [topplayer])


    return (
        <>
            <div className={`${isDesktopMode ? 'fragger desktop-mode' : 'fragger'}`} id="fragger">
                <h2>Top Fraggers</h2>
                {!topplayer.length && <div><h3 style={{ color: 'white', textAlign: 'center' }}>No Match Found</h3></div>}
                {topplayer?.length &&
                    <>
                        <div className="boxes">
                            {topplayer && topplayer.slice(0, 5).map((player, ind) => {
                                let { team, playerName, playerLogo, kills } = player;
                                return <div className="box" key={ind}>
                                    <div className="position"># {ind + 1}</div>
                                    <div className="img">
                                        <img
                                            // src={playerLogo ? playerLogo : user}
                                            src={cloudinaryUrl(playerLogo, {
                                                format: "webp",
                                                width: 200,
                                                //   height: 300,
                                            }) || user}
                                            alt="playerLogo" />
                                        <span>{playerName}</span>
                                    </div>
                                    <div className="below">
                                        {kills} kills
                                    </div>
                                    <div className="below"><MdDiversity3 /> <span>-{team}</span></div>
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
                                    let { playerName, playerLogo, kills } = player;
                                    return <div key={ind}>
                                        <span>
                                            <span>#{ind + 1}</span>
                                            <span>
                                                <img
                                                    // src={playerLogo ? playerLogo : user}
                                                    src={cloudinaryUrl(playerLogo, {
                                                        format: "webp",
                                                        width: 150,
                                                        //   height: 300,
                                                    }) || user}
                                                    alt="playerLogo"

                                                />

                                            </span>
                                            <span>{playerName}</span>
                                        </span>
                                        <span>{kills}</span>
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
                                    let { teamname, teamLogo, kills } = team;
                                    return <div key={ind}>
                                        <span> <span>#{ind + 1}</span>
                                            <span>
                                                <img
                                                    // src={teamLogo ? teamLogo : group}
                                                    src={cloudinaryUrl(teamLogo, {
                                                        format: "webp",
                                                        width: 150,
                                                        //   height: 300,
                                                    }) || group}
                                                    alt="teamlogo"
                                                />
                                            </span>
                                            <span>{teamname}</span></span>
                                        <span>{kills}</span>
                                    </div>
                                })}
                            </div>
                        </div>
                    </>}
            </div>
            {/* {log.islogin && tournamentOwner && <p style={{ fontSize: '0.9em', color: 'gray', marginBottom: '0.5em' }}>
            <em>*Note - please switch to desktop view to download the scoreboard in the best quality, if viewing on mobile</em>
            </p>} */}
        </>
    )
}
export default Fragger;