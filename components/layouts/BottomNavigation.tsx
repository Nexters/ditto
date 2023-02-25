import theme from '@/styles/theme';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const BottomNavBarHeight = 60;

const BottomNavigation = () => {
  const router = useRouter();

  const createLinkProps = (href: string) => ({
    href,
    selected: router.asPath.startsWith(href),
  });

  return (
    <BottomNavBar>
      <NavContainer>
        <NavItem>
          <NavLink {...createLinkProps('/event')}>일정</NavLink>
        </NavItem>
        <NavDivider />
        <NavItem>
          <NavLink {...createLinkProps('/bucketlist')}>버킷리스트</NavLink>
        </NavItem>
        <NavDivider />
        <NavItem>
          <NavLink {...createLinkProps('/mypage')}>MY</NavLink>
        </NavItem>
      </NavContainer>
    </BottomNavBar>
  );
};

const BottomNavBar = styled.nav`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${BottomNavBarHeight}px;

  background-color: ${theme.colors.grey[10]};
`;

const NavContainer = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
`;

const NavItem = styled.li`
  height: 100%;
  flex: 1;

  padding: 10px;
`;

const NavLink = styled(Link)<{ selected: boolean }>`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 700;
  font-size: 14px;
  line-height: 14px;
  text-align: center;

  ${({ selected }) =>
    selected
      ? `color: ${theme.colors.primary};`
      : `color: ${theme.colors.white};
         opacity: 0.6`};
`;

const NavDivider = styled.li`
  width: 1px;
  height: 24px;
  background-color: ${theme.colors.grey[8]};
`;

export default BottomNavigation;
