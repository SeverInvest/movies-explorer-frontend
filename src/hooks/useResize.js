import { useState, useEffect } from 'react';
import {
  CONSTANTS
} from "../utils";

export function useResize() {
  const [width, setWidth] = useState(window.innerWidth);
  const [typeScreen, setTypeScreen] = useState("desktop");

  useEffect(() => {
      const handleResize = (event) => {
        setWidth(event.target.innerWidth);
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    useEffect(() => {
      const defineScreen = () => {
        let typeScr;
        switch (true) {
          case (width <= CONSTANTS.SCREEN_MOB) :
            typeScr = "mobile";
            break;
          case (width > CONSTANTS.SCREEN_MOB) && (width <= CONSTANTS.SCREEN_TAB):
            typeScr = "tablet";
            break;
          default:
            typeScr = "desktop";
            break;
        };
        return typeScr;
      };
      setTypeScreen(() => defineScreen());
    }, [width]);

  return { typeScreen };
};