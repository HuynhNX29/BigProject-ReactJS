import { Typography } from 'antd';
import React from 'react';

const Footer = () => {
  return (
    <div className='appFooter'>
      <Typography.Link href='https://google.com.vn' target={'_blank'}>Privacy Policy </Typography.Link>
      <Typography.Link href='https://google.com.vn' target={'_blank'}>Term & Condition </Typography.Link>
      <Typography.Link href='https://google.com.vn' target={'_blank'}>Return Policy </Typography.Link>
      <Typography.Link href='tel: +84934093243' target={'_blank'}>+84934093243 </Typography.Link>

    </div>
  );
}

export default Footer;

