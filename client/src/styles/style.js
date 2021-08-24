import styled from "styled-components";

export const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5% auto;
`;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding:1% 5%;
`;

export const MutedLink = styled.a`
  color: rgba(170, 170, 170, 1);
  font-size: 15px;
  font-weight: 500;
  margin: 10px 0;
  text-decoration: none;
`;

export const BoldLink = styled.a`
  color: #5963c3;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  margin: 0 3px;
`;

export const Input = styled.input`
  margin-bottom:10px;
  width: 100%;
  font-size:3vh;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.03);
  padding: 2% 5%;
  margin: 2% 0%;
  transition: all, 200ms ease-in-out;
  box-sizing: border-box;
  border-bottom: 1.4px solid transparent;
  &::placeholder {
    color: rgba(170, 170, 170, 1);
  }
  &:not(:last-of-type) {
    border-bottom: 1.4px solid rgba(200, 200, 200, 0.4);
  }
  &:focus {
    outline: none;
    box-shadow: 0px 0px 2px rgba(200, 200, 200, 1);
    border-bottom: 2px solid #5963c3;
  }
  box-shadow : 0px 0px 2.5px rgb(185, 185, 185);
`;

export const SubmitButton = styled.button`
  background-color: transparent;
  padding: 2.5% 40%;
  margin: 5% 0%;
  width: 100%;
  color: #151515;
  font-size: 3vh;
  font-weight: 600;
  border: 1px solid #151515;
  border-radius: 2px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: #fff; /* fallback for old browsers */
  
  
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
  
  &:focus {
    outline: none;
  }
  &:hover {
    filter: brightness(1.03);
	  transition: all 0.3s ease-out;
  	background: #151515;
  	color: #fff;
  	transition: 250ms;
  }
  &:disabled{
    opacity:0.25;
    pointer-events:none;
  }
`;

export const DisplayError = styled.p`
  color: #c2372d;
  font-size: 15px;
  font-weight: 500;
  margin: 10px 0;
  text-decoration: none;
`;