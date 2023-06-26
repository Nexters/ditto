import theme from '@/styles/theme';
import styled from '@emotion/styled';

export const Badge = styled.div<{ variant?: 'default' | 'outline'; square?: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  min-width: ${({ square }) => (square ? '24px' : '40px')};
  font-size: 12px;
  line-height: 1;
  font-weight: 600;

  padding: 6px;
  border-radius: 6px;

  background-color: ${({ variant }) => badgeVariants[variant || 'default'].backgroundColor};
  color: ${({ variant }) => badgeVariants[variant || 'default'].color};
`;

const badgeVariants = {
  default: {
    backgroundColor: theme.colors.orange,
    color: theme.colors.white,
  },
  outline: {
    backgroundColor: theme.colors.orangeAlpha,
    color: theme.colors.orange,
    border: `1px solid ${theme.colors.orange}`,
  },
};
