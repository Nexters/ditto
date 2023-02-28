import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import ArrowRightIcon from '../icons/ArrowRightIcon';

export const PAGE_HEADER_HEIGHT = 42;

const PageHeader = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Header>
      <BackButton onClick={handleBack}>
        <ArrowRightIcon width={28} height={28} rotate={'1'} />
      </BackButton>
    </Header>
  );
};

const Header = styled.header`
  width: 100%;
  height: ${PAGE_HEADER_HEIGHT}px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 16px;
`;
const BackButton = styled.button``;

export default PageHeader;
