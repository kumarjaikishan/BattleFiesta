import { useEffect, useState } from "react";
import user from '../../../assets/user.webp'
import group from '../../../assets/group.webp'

const Fragger = ({ topplayer, matches, teamdeatil }) => {
    const [top, settop] = useState([])
    const [topteam, settopteam] = useState([]);
    useEffect(() => {
        console.log("teamdetail -", teamdeatil);
        console.log("topplayers :", topplayer);
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

        // console.log(dfvefr);
        settopteam(dfvefr)
    }

    return (
        <>
            <div className="fragger">
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
        </>
    )
}
export default Fragger;