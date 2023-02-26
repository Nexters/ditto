import { useRouter } from 'next/router';

const Testing = () => {
  const router = useRouter();
  const { id } = router.query;
  return <div style={{ fontSize: '100px' }}>{id}</div>;
};

export default Testing;
