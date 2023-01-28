import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const PageHeader = ({ useBackButton = false }: { useBackButton?: boolean }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return <Header>{useBackButton && <button onClick={handleBack}>←</button>}</Header>;
};

const Header = styled.div`
  display: flex;
  height: 60px;
  align-items: center;
`;
export default PageHeader;
