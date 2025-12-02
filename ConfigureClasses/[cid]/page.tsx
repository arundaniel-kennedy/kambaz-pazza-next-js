import React from 'react'
import Navigation from './Navigation'

import "./page.scss";
import ClassInfo from './ClassInfo';

export default function page() {
  return (
    <>
      <Navigation />
      <div className="manage-class-content-wrapper">
        <ClassInfo />
      </div>
    </>
  )
}
