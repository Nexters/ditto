'use client';
import { Inter } from '@next/font/google'
import styled from "styled-components";

const inter = Inter({ subsets: ['latin'] })

const Button = styled.button`
  width: 200px;
  padding: 30px;
`;

export default function Home() {
  return (
    <Button>test</Button>
  )
}
