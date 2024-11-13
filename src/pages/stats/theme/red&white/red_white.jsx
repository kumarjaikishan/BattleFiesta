import React from 'react'
import './red_white.css'
import Sametable from '../sametable'

const Red_white = ({kuch, title, tablerow,teamlogo,defaultlogo}) => {
  return (
     <Sametable cname={'red_white'} defaultlogo={defaultlogo} teamlogo={teamlogo} tablerow={tablerow} title={title} kuch={kuch} />
  )
}

export default Red_white
