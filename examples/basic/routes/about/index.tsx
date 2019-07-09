import React from 'react';
import Layout from '../../components/Layout';
import Page from '../../components/Page';
import md from './about.md';

export const title = md.title;

const About = () => (
  <Layout>
    <Page { ...md } />
  </Layout>
);

export default About;
