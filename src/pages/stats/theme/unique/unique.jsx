import './unique.css'

const Unique = ({ tablerow, teamlogo, kuch, title }) => {
    const logourl = 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1731223081/battlefiesta/teamlogo/papvdyttgvonksceujen.jpg'
    const user = 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1718950087/battlefiesta/assets/icon/user_p5egd9.webp'
    const group = 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1718950087/battlefiesta/assets/icon/group_a3fhyv.webp'

    // console.log(tablerow)

    return (
        <div className='unique'>
        <div className="tite">

            <h1>{kuch.title}</h1>
        </div>
            <h3>{title}</h3>
            <div className="maine">
                <div className="top">
                    {tablerow && tablerow.slice(0, 3).map((team, ind) => {
                        return (
                            <div className="card" key={ind}>
                                <div className="upper">
                                    <span className="position">#{ind + 1}</span>
                                    <span className="name">{team.teamname}</span>
                                </div>
                                <div className="bottom">
                                    <div className="logo">
                                        <img src={teamlogo[team.teamid] || group} alt="logo" />
                                    </div>
                                    <div className="stat">
                                        <div className="headerr">
                                            <span>M</span>
                                            <span>🏆</span>
                                            <span>PP</span>
                                            <span>KP</span>
                                            <span>TP</span>
                                        </div>
                                        <div className="statss">
                                            <span>{team.matchplayed}</span>
                                            <span>{team.matchwon}</span>
                                            <span>{team.placepoints}</span>
                                            <span>{team.killpoints}</span>
                                            <span>{team.total}</span>
                                        </div>
                                    </div>
                                </div>
                                <span className="cut"></span>
                            </div>
                        )
                    })}
                </div>
                <div className="bottomtable">
                    <div className="divider">
                        <div className="headere">
                            <span>#</span>
                            <span>TEAM NAME</span>
                            <span>M</span>
                            <span style={{fontSize:'1.4em'}}>🏆</span>
                            <span>PP</span>
                            <span>KP</span>
                            <span>TP</span>
                        </div>
                        {tablerow.length > 0 ? Array.from({ length: 11 }).map((_, ind) => {
                            const team = tablerow.slice(3, 14)[ind] || null; // Use an empty object if the entry does not exist
                            return (
                                <div key={ind} className="bodre">
                                    <span>{team && String(ind + 4).padStart(2, 0)}</span>
                                    <span>
                                        {team && <img src={team && teamlogo[team.teamid] || 'default-logo.png'} alt="" />}
                                        {team && team?.teamname}
                                    </span>
                                    <span>{team ? String(team.matchplayed).padStart(2, '0') : '\u00A0'}</span>
                                    <span>{team ? String(team.matchwon).padStart(2, '0') : '\u00A0'}</span>
                                    <span>{team ? String(team.placepoints).padStart(2, '0') : '\u00A0'}</span>
                                    <span>{team ? String(team.killpoints).padStart(2, '0') : '\u00A0'}</span>
                                    <span>{team && String(team.total).padStart(2, '0')}</span>
                                    <span className="cut"></span>
                                </div>
                            );
                        }) : <div className='bodre' style={{paddingLeft:'30px', margin:'0 auto'}} > No Match Found</div> }
                    </div>
                    <div className="divider">
                        <div className={tablerow.length > 14 ? "headere":"headere off" }>
                            <span>#</span>
                            <span>TEAM NAME</span>
                            
                            <span>M</span>
                            <span style={{fontSize:'1.4em'}}>🏆</span>
                            <span>PP</span>
                            <span>KP</span>
                            <span>TP</span>
                        </div>
                        {tablerow.length > 0 ? Array.from({ length: 11 }).map((_, ind) => {
                            const team = tablerow.slice(15, 26)[ind] || null; // Use an empty object if the entry does not exist
                            return (
                                <div key={ind} className={team ? "bodre":"bodre off"}>
                                    <span>{team && ind + 16}</span>
                                    <span>
                                        {team && <img src={team && teamlogo[team.teamid] || 'default-logo.png'} alt="" />}
                                        {team && team?.teamname}
                                    </span>
                                    <span>{team ? String(team.matchplayed).padStart(2, '0') : '\u00A0'}</span>
                                    <span>{team ? String(team.matchwon).padStart(2, '0') : '\u00A0'}</span>
                                    <span>{team ? String(team.placepoints).padStart(2, '0') : '\u00A0'}</span>
                                    <span>{team ? String(team.killpoints).padStart(2, '0') : '\u00A0'}</span>
                                    {/* use this for no border visible */}
                                    {/* <span>{team && String(team.matchplayed).padStart(2, '0')}</span>
                                    <span>{team && String(team.matchwon).padStart(2, '0')}</span>
                                    <span>{team && String(team.placepoints).padStart(2, '0')}</span>
                                    <span>{team ? String(team.killpoints).padStart(2, '0') : '\u00A0'}</span> */}
                                    <span>{team && String(team.total).padStart(2, '0')}</span>
                                    <span className="cut"></span>
                                </div>
                            );
                        }) : <div className={tablerow.length > 14 ? "bodre":"bodre off"} style={{ margin:'0 auto', paddingLeft:'30px'}} > No Match Found</div>  }
                    </div>
                </div>
            </div>
            <div className="foterr">
                <img src={'https://res.cloudinary.com/dusxlxlvm/image/upload/v1731486558/battlefiesta/assets/themes/beach/wood_ytbjgt_lwbvni.webp'} alt="" />
                <div className="orgname">
                    <i>Organiser</i>
                    <p>{kuch.organiser}</p>
                </div>
            </div>
        </div>
    )
}

export default Unique
