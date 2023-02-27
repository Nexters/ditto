import theme from '@/styles/theme';
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin-top: 20px;
  text-align: center;
  ${theme.textStyles.h3};
`;

const Description = styled.p`
  margin: 8px 0 24px;
  text-align: center;
  white-space: pre-line;
  ${theme.textStyles.multiBody2};
`;
