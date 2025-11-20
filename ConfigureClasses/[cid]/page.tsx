import React from 'react'
import Navigation from './Navigation'
import InfoBox from './InfoBox'

import "./page.scss"

export default function page() {
  return (
    <>
      <Navigation />
      <div className="manage-class-content-wrapper">
        <InfoBox />
        <div className="manage-content">

        </div>
      </div>
    </>
  )
}
