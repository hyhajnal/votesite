import React from 'react';
import MainLayout from '../components/MainLayout/MainLayout';

function About({ location }) {
  return (
    <MainLayout location={location}>
      <div>关于这个网站的使用说明</div>
    </MainLayout>
  );
}

export default About;
