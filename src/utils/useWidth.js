import { useState, useEffect } from 'react';

function useWidth() {

  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);

  useEffect(() => {
    function _handleResize() {
      setCurrentWidth(window.innerWidth);
    }
    window.addEventListener('resize', _handleResize);
    return () => window.removeEventListener('resize', _handleResize);
  }, [window.innerWidth]);
  return currentWidth;
};

export default useWidth;