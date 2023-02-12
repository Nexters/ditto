import styled from '@emotion/styled';
import Link from 'next/link';

export const BottomNavBarHeight = 60;

const BottomNavigation = () => {
  return (
    <BottomNavBar>
      <NavContainer>
        <NavItem>
          <Link href="/event">일정</Link>
        </NavItem>
        <NavItem>
          <Link href="/bucketlist">버킷리스트</Link>
        </NavItem>
        <NavItem>
          <Link href="/mypage">My</Link>
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
  background-color: #fff;
  border: 1px solid #000000;
`;

const NavContainer = styled.ul`
  display: flex;
  height: 100%;
  list-style: none;
`;

const NavItem = styled.li`
  display: inherit;
  flex: 1 1 30%;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  border: 1px solid black;
`;

export default BottomNavigation;
