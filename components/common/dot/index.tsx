import theme from '@/styles/theme';
import styled from '@emotion/styled';

// ref: https://developer.semrush.com/intergalactic/components/dot/
export type DotProps = {
  size?: 'm' | 'l';
};

export const Dot = styled.div<DotProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;

  ${({ size, children }) => (children ? 'min-width: 16px' : size === 'l' ? 'width: 16px' : 'width: 6px')};
  height: ${({ size, children }) => (children || size === 'l' ? '16px' : '6px')};
  padding: ${({ children }) => (children ? '2px 4px' : '0')};
  border-radius: ${({ children }) => (children ? '8px' : '50%')};
  background-color: ${theme.colors.orange};
  color: ${theme.colors.white};
`;
