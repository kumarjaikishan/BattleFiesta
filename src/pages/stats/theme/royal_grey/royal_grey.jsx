import React from 'react'
import './royal_grey.css'
import Sametable from '../sametable'

const Royal_grey = ({kuch, title, tablerow,teamlogo,defaultlogo}) => {
  return (
     <Sametable cname={'royal_grey'} defaultlogo={defaultlogo} teamlogo={teamlogo} tablerow={tablerow} title={title} kuch={kuch} />
  )
}

export default Royal_grey
