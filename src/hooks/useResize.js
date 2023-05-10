import { useState, useEffect } from 'react';
import {
  SCREEN_MOB, SCREEN_TAB
} from "../utils/constants";

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
          case (width <= SCREEN_MOB) :
            typeScr = "mobile";
            break;
          case (width > SCREEN_MOB) && (width <= SCREEN_TAB):
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