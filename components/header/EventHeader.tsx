import React from 'react';
import GroupMenu from '../groupMenu/GroupMenu';
import { CalendarIcon } from '../icons';
import CommonHeader from './CommonHeader';

const EventHeader = () => {
  return (
    <CommonHeader>
      <CommonHeader.Left>
        <GroupMenu />
        <h1>일정</h1>
      </CommonHeader.Left>
      <CommonHeader.Right>
        <CalendarIcon />
      </CommonHeader.Right>
    </CommonHeader>
  );
};

export default EventHeader;
