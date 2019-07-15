import React, { ReactNode } from 'react';
import history from '../app/history';

function isLeftClickEvent(event: MouseEvent) {
  return event.button === 0;
}

function isModifiedEvent(event: MouseEvent) {
  return Boolean(
    event.metaKey || event.altKey || event.ctrlKey || event.shiftKey,
  );
}

type PropTypes = {
  to: string;
  tagName?: string;
  onClick?: Function;
  children?: ReactNode;
  className?: string;
};

const Link = ({
  tagName = 'a',
  to,
  children,
  onClick = (event: any) => {
    if (isModifiedEvent(event)) return;
    if (!isLeftClickEvent(event)) return;
    if (event.defaultPrevented === true) return;

    event.preventDefault();
    history.push(to);
  },
  ...restProps
}: PropTypes) => {
  const props = {
    ...(tagName === 'a' ? { href: to } : null),
    onClick,
    ...restProps,
  };

  return React.createElement(tagName, props, children);
};

export default Link;
