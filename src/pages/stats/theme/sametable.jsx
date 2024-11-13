import React from 'react'

const Sametable = ({cname,kuch, title, tablerow, teamlogo, defaultlogo}) => {
    return (
        <div className={cname}>
            <div className='tournlogoo'>
                <img loading="lazy" src={kuch?.tournment_logo || defaultlogo} alt="Tournament Logo" />
            </div>
            <h3>{kuch.title}</h3>
            <h2>{kuch.organiser}</h2>
            <h1>{title}</h1>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th style={{ textAlign: "left" }}>Team</th>
                        <th>M</th>
                        <th style={{ fontSize: "2em" }}>🍗</th>
                        <th>Place Pts</th>
                        <th>Kill Pts</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {tablerow.length > 0 ? tablerow.map((row, ind) => {
                        return <tr key={ind}>
                            <td>{ind + 1}</td>
                            <td style={{ textAlign: "left" }}><span><img loading="lazy" src={teamlogo[row.teamid] || group}
                                alt="TeamLogo" /></span> <span>{row.teamname}</span> </td>
                            <td>{row.matchplayed}</td>
                            <td>{row.matchwon}</td>
                            <td>{row.placepoints}</td>
                            <td>{row.killpoints}</td>
                            <td>{row.total}</td>
                        </tr>
                    }) : <tr>
                        <td colSpan={7}>No Match Found</td>
                    </tr>}
                </tbody>
            </table>
        </div>
    )
}

export default Sametable
