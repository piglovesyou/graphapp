import React from 'react';
import Layout from '../../components/Layout';
import Page from '../../components/Page';
import md from './privacy.md';

export const { title } = md;

const Privacy = () => (
  <Layout>
    <Page {...md} />
  </Layout>
);

export default Privacy;
