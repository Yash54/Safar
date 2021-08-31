import React from 'react'

function TeamMember({name, imgsrc, position, github, linkedin,instagram}) {
    return (
         <li class="team-member">
            <div class="our-team" data-aos="zoom-in" data-aos-duration="3000ms">
                <div class="pic">
                    <img src={imgsrc} alt="team"/>
                </div>
                <div class="team-content">
                    <h3 class="title">{name}</h3>
                    <span class="post">{position}</span>
                </div>
                <ul class="social">
                    <li><a href={github} class="fab fa-github"></a></li>
                    <li><a href={instagram} class="fa fa-instagram"></a></li>
                    <li><a href={linkedin} class="fa fa-linkedin"></a></li>
                </ul>
                
            </div>
        </li>
    )
}

export default React.memo(TeamMember);