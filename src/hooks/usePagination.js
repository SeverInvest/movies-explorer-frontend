import { useState, useEffect } from 'react';
import { useResize } from "./useResize";

export function usePagination() {

  const [pagination, setPagination] = useState(7);
  const { typeScreen } = useResize();

  useEffect(() => {
    if (typeScreen === "desktop") {
      setPagination(7);
    } else {
      setPagination(5);
    }
  }, [typeScreen]);

  return { pagination };

}