import * as React from 'react';

export default props => {
  const { type, className = '' } = props;
  return <i {...props} className={`${className} jgicon jgicon-${type}`.trim()} />
};
