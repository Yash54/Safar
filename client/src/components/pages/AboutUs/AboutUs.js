import React from 'react'
import AboutUsContent from '../../components/AboutUsContent/AboutUsContent'
import Team from './../../components/MeetTheTeam/Team'
import './AboutUs.css'

export default function AboutUs() {
    return (
      <div className="about-us">
        <div className="about-us-container">
          <AboutUsContent/>
          <Team />  
        </div>
      </div>
    )
}
