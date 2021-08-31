import React from 'react'
import './Team.css'
import TeamMember from "./../../assets/TeamMember/TeamMember"

function Team(){
    return (
        <div className="team">
            <div className="team-title">
                <p> Meet the Team</p>
            </div>
            <hr className="hrline" />
            <div className="team-container" >
                <div className="team-wrapper">
                    <div className="team-content-container">
                        <div className="team-content-wrapper">
                            <ul className="team-row">
                                <TeamMember 
                                    name="Yash Patel" 
                                    imgsrc="team-members/170761.jpg"
                                    position="Front-End Developer"
                                    github="https://github.com/Yash54"
                                    instagram="https://www.instagram.com/yashpatel.2145/"
                                    linkedin="https://www.linkedin.com/in/yash-patel-7155a6192/"
                                    
                                />
                                <TeamMember 
                                    name="Krishil Patel" 
                                    imgsrc="team-members/4564011.jpg"
                                    position="Back-End Developer"
                                    github="https://github.com/KRISHIL-cyber"
                                    instagram="https://www.instagram.com/krishil005/"
                                    linkedin="https://www.linkedin.com/in/krishil-patel-62730a1a5/"
                                />

                                <TeamMember 
                                    name="Luv Patel" 
                                    imgsrc="team-members/naruto-shippuuden-blood-uchiha-sasuke-wallpaper-preview.jpg"
                                    position="Front-End Developer"
                                    github="https://github.com/LuvPatel"
                                    instagram="https://www.instagram.com"
                                    linkedin="https://www.linkedin.com/in/luv-p-50b9ab199/"
                                    
                                />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Team);