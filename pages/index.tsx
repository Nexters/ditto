import { supabase } from '@/lib/supabase/client';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const ExampleComponentCSS = styled.div`
  // color: red;
  white-space: pre;
`;
export default function Home() {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const sample = async () => {
      const { data } = await supabase.from('users').select();
      console.log(data);
      const str = JSON.stringify(data, null, 2);
      // const date = new Date(data?.[3].created_time ?? '');
      setData(str);
    };
    sample();
  }, []);

  return <ExampleComponentCSS>{data}</ExampleComponentCSS>;
}
