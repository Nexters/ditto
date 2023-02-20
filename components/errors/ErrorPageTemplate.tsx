import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { ErrorRabbitIcon } from '../icons';

export type ErrorPageTemplateProps = {
  title: string;
  description: ReactNode;
  children: ReactNode;
};

export const ErrorPageTemplate = ({ title, description, children }: ErrorPageTemplateProps) => {
  return (
    <Container>
      <ErrorRabbitIcon />
      <Title>{title}</Title>
      <Description>{description}</Description>
      {children}
    </Container>
  );
};

const Container = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin-top: 30px;
  font-size: 20px;
  line-height: 20px;
  font-weight: 700;
  text-align: center;
`;

const Description = styled.p`
  margin: 14px 0 30px;
  font-size: 14px;
  text-align: center;
  color: #777777;
  white-space: pre-line;
`;
