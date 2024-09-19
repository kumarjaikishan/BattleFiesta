import { useEffect, useState } from "react";
import { Button } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Diversity3Icon from '@mui/icons-material/Diversity3';

const Fragger = ({ topplayer,disable, topteam,imagedownload, log }) => {
    const group = 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1718950087/battlefiesta/assets/icon/group_a3fhyv.webp'
    const user = 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1718950087/battlefiesta/assets/icon/user_p5egd9.webp'
    
useEffect(()=>{
//  console.log(topplayer)
},[topplayer])
    // const testing1 = () => {
    //     console.time("minefunc")
    //     let topteam = [];
    //     let topplayers = [];
    //     let logo = [];

    //     teamdeatil.map((team) => {
    //         let vare = {
    //             teamid: team._id,
    //             teamlogo: team.teamLogo,
    //             player: team.player.map((player) => {
    //                 return {
    //                     playerid: player.playerId,
    //                     playerlogo: player.playerLogo
    //                 }
    //             })
    //         }
    //         logo.push(vare);
    //     })

    //     matches.map((val, ind) => {
    //         val.points.map((hey, ind) => {
    //             const existingTeam = topteam.find(item => item.teamid === hey.teamid);
    //             const sablogo = logo.find(item=> item.teamid === hey.teamid);
    //             if (existingTeam) {
    //                 existingTeam.kills += hey.kills;
    //             } else {
    //                 let pre = {
    //                     teamlogo : sablogo.teamlogo,
    //                     teamid: hey.teamid,
    //                     teamname: hey.team,
    //                     kills: hey.kills
    //                 }
    //                 topteam.push(pre);
    //             }
    //             hey.playerKills.map((player, ind) => {
    //                 const existingPlayer = topplayers.find(item => item.playerid === player.playerId);
    //                 const playerlogoe = sablogo.player.find(item=> item.playerid === player.playerId);
    //                 if (existingPlayer) {
    //                     existingPlayer.kills += player.kills;
    //                 } else {
    //                     let pre = {
    //                         team: hey.team,
    //                         playerlogo: playerlogoe.playerlogo,
    //                         playername: player.inGameName,
    //                         playerid: player.playerId,
    //                         kills: player.kills
    //                     }
    //                     topplayers.push(pre)
    //                 }
    //             })

    //         })
    //     })
    //     topteam.sort((a, b) => b.kills - a.kills);
    //     topplayers.sort((a, b) => b.kills - a.kills);
    //     console.timeEnd("minefunc")
    // }

    return (
        <>
            <div className="fragger" id="fragger">
                <h2>Top Fraggers</h2>
                {!topplayer.length && <div><h3 style={{ color: 'white', textAlign: 'center' }}>No Match Found</h3></div>}
                {topplayer.length && <><div className="boxes">
                    {topplayer && topplayer.slice(0,5).map((player, ind) => {
                        let {team, playerName, playerLogo, kills} = player;
                        return <div className="box" key={ind}>
                            <div className="img">
                                <img src={playerLogo ? playerLogo : user} alt="" />
                                <span>{playerName}</span>
                            </div>
                            <div className="below">
                                {kills} kills
                            </div>
                            <div className="below"><Diversity3Icon /> <span>-{team}</span></div>
                            
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
                                let { playerName, playerLogo, kills}= player;
                                return <div key={ind}>
                                    <span>
                                        <span>#{ind + 1}</span>
                                        <span><img src={playerLogo ? playerLogo : user} alt="" /> </span>
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
                                let {teamname, teamLogo, kills}= team;
                                return <div key={ind}>
                                    <span> <span>#{ind + 1}</span> <span><img src={teamLogo ? teamLogo : group} alt="" /> </span><span>{teamname}</span></span>
                                    <span>{kills}</span>
                                </div>
                            })}
                        </div>
                    </div>

                </>}
            </div>
            {log.islogin &&
                <div style={{ textAlign: 'center' }}>
                    <Button disabled={disable} onClick={()=> imagedownload('#fragger',"Fraggers")} title='Download Fraggers Stat' sx={{ mt: 0.3}} component="label" variant="contained" startIcon={<CloudDownloadIcon />}>
                        Download Fraggers
                    </Button>
                </div>
            }
        </>
    )
}
export default Fragger;