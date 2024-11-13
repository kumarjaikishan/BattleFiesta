import React from 'react'
import './droplets.css'
import Sametable from '../sametable'

const Droplets = ({ kuch, title, tablerow, teamlogo, defaultlogo }) => {
  return (
    <Sametable cname={'droplets'} defaultlogo={defaultlogo} teamlogo={teamlogo} tablerow={tablerow} title={title} kuch={kuch} />
  )
}

export default Droplets
