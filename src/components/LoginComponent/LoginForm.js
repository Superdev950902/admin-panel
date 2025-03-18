import React from 'react';
import styled from 'styled-components';

export const LoginForm = ({ login, setLogin, password, setPassword, handleLogin }) => {
  return (
    <Form onSubmit={handleLogin}>
      <Title>SIGN IN</Title>
      <Input
        type="text"
        placeholder="Username"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <SignInButton type="submit">SIGN IN</SignInButton>
      <Links>
        <Link>Sign up</Link>
        <Link>Remind password</Link>
      </Links>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 15px;
  background-color: #383c44;
  border: none;
  color: white;
  border-radius: 5px;
`;

const SignInButton = styled.button`
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;

const Links = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Link = styled.a`
  color: #007bff;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;
