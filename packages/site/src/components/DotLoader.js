import React, { useState, useEffect } from 'react';
import Body from './Body';
import './DotLoader.scss'
import { useIntl } from 'react-intl';

const DotLoader = (props) => {
  const intl = useIntl()
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => (prevDots.length < 3 ? prevDots + '.' : ''))
    }, 500)

    return () => clearInterval(interval);
  }, [])

  return (
    <div className='DotLoader'>
			<Body uppercase size={'large'}>{intl.formatMessage({id:props.children}) + dots}</Body>
		</div>
	)
};

export default DotLoader;
