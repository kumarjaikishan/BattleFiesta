import React from 'react'
import './red_carpet.css'
import Sametable from '../sametable'

const Red_Carpet = ({ kuch, title, tablerow, teamlogo, defaultlogo }) => {
  return (
    <Sametable cname={'red_carpet'} defaultlogo={defaultlogo} teamlogo={teamlogo} tablerow={tablerow} title={title} kuch={kuch} />
  )
}

export default Red_Carpet
