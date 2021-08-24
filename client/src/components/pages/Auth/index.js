import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Login } from "./Login";
import { AccountContext } from "./context";
import { Signup } from "./Signup";

const BoxContainer = styled.div`
  margin-left:auto;
  margin-right:auto;
  margin-top : 2%;
  margin-bottom : 2%;
  width: 45%;
  transition : width 1s;
  @media (max-width : 900px){
    width:75%;
    transition : width 1s;
  }
  @media (max-width : 640px){
    width:94%;
    transition : width 0.5s;
  }
  min-height: 530px;
  height:90%;
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);
  position: relative;
  overflow: hidden;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 0 2em;
  padding-bottom: 3.5em;
`;

const BackDrop = styled(motion.div)`
  position: absolute;
  width: 50%;
  height: 250px;
  border-radius: 50%;
  transform: rotate(60deg);
  background: #151515; /* fallback for old browsers */
  
  /* Chrome 10-25, Safari 5.1-6 */
  ${'' /* background: -webkit-linear-gradient(
    to right,
    #2ebf91,
    #8360c3
  );  */}
  
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  ${'' /* background: linear-gradient(
    to right,
    #2ebf91,
    #8360c3
  );  */}
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
  margin-left: 3%;
`;

const HeaderText = styled.h2`
  font-weight: 600;
  color: #fff;
  z-index: 10;
  margin: 0;
  font-size: 32px;
  line-height: 1.24;
`;

const SmallText = styled.h5`
  font-weight: 500;
  color: #fff;
  z-index: 10;
  margin: 0;
  margin-left: 3%;
  font-size: 15px;
  line-height: 1.24;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1.7em;
  padding-top: 0.5em;
  padding-bottom:0.5em;
`;

const backdropVariants = {
	expanded: {
		width: "133%",
		height: "1150px",
		borderRadius: "20%",
		transform: "rotate(-5deg)",
		top: 0,
		left: 0,
		zIndex : 1,
	},
	collapsed: {
		width: "50%",
		height: "240px",
		borderRadius: "50%",
		transform: "rotate(-20deg)",
		top: 10,
		left: 10,
		zIndex : 1,
	},
};

const expandingTransition = {
	type: "spring",
	duration: 2.5,
	stiffness: 40,
};

export const Authenticate = (props) => {
	const initialActive = props.signup;
	const [isExpanded, setExpanded] = useState(false);
	const [active, setActive] = useState(
		initialActive ? "signup" : "signin"
	);

	const playExpandingEffect = () => {
		setExpanded(true);
		/*
		  Collapse it after short amount of time
		  To Finish transition 
		*/
		setTimeout(() => {
			setExpanded(false);
		}, expandingTransition.duration * 1000 - 1500);
	};

	const switchActive = (active) => {
		setTimeout(() => setActive(active), 400);
	};

	const switchToSignup = () => {
		playExpandingEffect();
		switchActive("signup");
	};

	const switchToSignin = () => {
		playExpandingEffect();
		switchActive("signin");
	};

	const contextValue = {
		switchToSignup,
		switchToSignin,
		playExpandingEffect,
	};

	return (
		<AccountContext.Provider value={contextValue}>
			<BoxContainer>
				<TopContainer>
					<BackDrop
						variants={backdropVariants}
						transition={expandingTransition}
						initial={false}
						animate={isExpanded ? "expanded" : "collapsed"}
					/>
					{active === "signin" && (
						<>
							<HeaderContainer>
								<HeaderText>Welcome</HeaderText>
								<HeaderText>Back</HeaderText>
							</HeaderContainer>
							<SmallText>Please sign-in to continue!</SmallText>
						</>
					)}
					{active === "signup" && (
						<>
							<HeaderContainer>
								<HeaderText>Create </HeaderText>
								<HeaderText>Account</HeaderText>
							</HeaderContainer>
							<SmallText>Please sign-up to continue!</SmallText>
						</>
					)}
				</TopContainer>
				<InnerContainer>
					{active === "signin" && <Login />}
					{active === "signup" && <Signup />}
				</InnerContainer>
			</BoxContainer>
		</AccountContext.Provider>
	);
}