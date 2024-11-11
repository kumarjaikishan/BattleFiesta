import './unique.css'
import wood from '../../../assets/wood.png'

const Unique = ({ tablerow, teamlogo, kuch }) => {
    const logourl = 'https://res.cloudinary.com/dusxlxlvm/image/upload/v1731223081/battlefiesta/teamlogo/papvdyttgvonksceujen.jpg'
    console.log(tablerow)

    return (
        <div className='unique'>
            <h2>BCS</h2>
            <h2>Season 1</h2>
            <h3>Leader Board</h3>
            <div className="main">
                <div className="top">
                    {tablerow && tablerow.slice(0, 3).map((team, ind) => {
                        return <div className="card" key={ind}>
                            <div className="upper">
                                <span className="position">#{ind + 1}</span>
                                <span className="name">{team.teamname}</span>
                            </div>
                            <div className="bottom">
                                <div className="logo">
                                    <img src={teamlogo[team.teamid]} alt="logo" />
                                </div>
                                <div className="stat">
                                    <div className="headerr">
                                        <span>M</span>
                                        <span>win</span>
                                        <span>PP</span>
                                        <span>KP</span>
                                        <span>Tp</span>
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
                        </div>
                    })}
                </div>
                <div className="bottomtable">
                    <div className="divider">
                        <div className="headere">
                            <span>#</span>
                            <span>team</span>
                            <span>M</span>
                            <span>Win</span>
                            <span>PP</span>
                            <span>KP</span>
                            <span>TP</span>
                        </div>
                        {Array.from({ length: 11 }).map((_, ind) => {
                            const team = tablerow.slice(3, 14)[ind] || null; // Use an empty object if the entry does not exist
                            return (
                                <div key={ind} className="bodre">
                                    <span>{team && ind + 3}</span>
                                    <span>
                                        {team && <img src={team && teamlogo[team.teamid] || 'default-logo.png'} alt="" />}
                                        {team && team?.teamname}
                                    </span>
                                    <span>{team && team?.matchplayed}</span>
                                    <span>{team && team?.matchwon}</span>
                                    <span>{team && team?.placepoints}</span>
                                    <span>{team && team?.killpoints}</span>
                                    <span>{team && team?.total}</span>
                                </div>
                            );
                        })}
                    </div>
                    <div className="divider">
                        <div className="headere">
                            <span>#</span>
                            <span>team</span>
                            <span>M</span>
                            <span>Win</span>
                            <span>PP</span>
                            <span>KP</span>
                            <span>TP</span>
                        </div>
                        {Array.from({ length: 11 }).map((_, ind) => {
                            const team = tablerow.slice(15, 26)[ind] || null; // Use an empty object if the entry does not exist
                            return (
                                <div key={ind} className="bodre">
                                    <span>{team && ind + 15}</span>
                                    <span>
                                        {team && <img src={team && teamlogo[team.teamid] || 'default-logo.png'} alt="" />}
                                        {team && team?.teamname}
                                    </span>
                                    <span>{team && team?.matchplayed}</span>
                                    <span>{team && team?.matchwon}</span>
                                    <span>{team && team?.placepoints}</span>
                                    <span>{team && team?.killpoints}</span>
                                    <span>{team && team?.total}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
            <div className="foterr">
                <img src={wood} alt="" />
                <div className="orgname">
                    <i>Organiser</i>
                    <p>{kuch.organiser}</p>
                </div>
            </div>
        </div>
    )
}

export default Unique
