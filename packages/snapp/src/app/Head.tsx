import { FunctionComponent } from 'react';
import { createUniversalPortal } from 'react-portal-universal';

const Head: FunctionComponent = props =>
  createUniversalPortal(props.children, 'head');

export default Head;
