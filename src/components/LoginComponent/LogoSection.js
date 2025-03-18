import React from 'react';
import styled from 'styled-components';

export const LogoSection = () => {
    return (
        <LeftSide>
            <Logo>
                <LogoImage src="/assets/icons/logo_blue.png" alt="Logo" />
            </Logo>
            <WelcomeText>WELCOME TO</WelcomeText>
            <Description>Sign in to the Administration Panel to use its services.</Description>
            <LanguageToggleContainer>
                <LanguageButton>عربي</LanguageButton>
                <LanguageButton>English</LanguageButton>
            </LanguageToggleContainer>
            <FooterContainer>
                <Copyright>COPYRIGHT © YOUR COMPANY</Copyright>
            </FooterContainer>
        </LeftSide>
    );
};

const LeftSide = styled.div`
  background-color: #282c34;
  color: white;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.div`
  margin-bottom: 20px;
`;

const LogoImage = styled.img`
  width: 80px;
  height: auto;
`;

const WelcomeText = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
`;



const FooterContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const Copyright = styled.p`
  font-size: 12px;
`;



const LanguageToggleContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const LanguageButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 14px;
  cursor: pointer;
  margin: 0 5px;
  padding: 5px 10px;

  &:hover {
    text-decoration: underline;
  }
`;
