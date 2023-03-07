import { getRandomColor } from '@/utils/getRandomColor';
import { RabbitWithCakeIcon, RabbitWithCarIcon, RandomRabbitIcon } from '@/components/icons';
import React, { useMemo } from 'react';
import PartialLoader from '@/components/loading/PartialLoader';
import styled from '@emotion/styled';

const PlaceKeywordList = ['여행', '여행지', '장소', '곳'];
const FoodKeywordList = ['음식', '맛집', '먹을거리', '카페', '음식점', '먹을거리'];

const ConditionalRabbitIcon = ({ folderTitle }: { folderTitle: string }) => {
  const isPlace = useMemo(() => {
    return PlaceKeywordList.some((keyword) => folderTitle.includes(keyword));
  }, [folderTitle]);

  const isFood = useMemo(() => {
    return FoodKeywordList.some((keyword) => folderTitle.includes(keyword));
  }, [folderTitle]);

  const conditionalRender = () => {
    if (!folderTitle) return <PartialLoader />;
    if (isPlace) return <RabbitWithCarIcon />;
    if (isFood) return <RabbitWithCakeIcon />;

    return <RandomRabbitIcon rabbitColor={getRandomColor()} />;
  };

  return <RabbitWrapper>{conditionalRender()}</RabbitWrapper>;
};

const RabbitWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 145px;
`;

export default ConditionalRabbitIcon;
