import React from 'react';
import { CalendarIcon } from '../icons';
import CommonHeader from './CommonHeader';

const EventHeader = () => {
  return <CommonHeader title="일정" icon={<CalendarIcon />} />;
};

export default EventHeader;
