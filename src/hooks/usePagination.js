import { useState, useEffect } from 'react';
import { useResize } from "./useResize";
import { CONSTANTS } from "../utils";

export function usePagination() {

  const [pagination, setPagination] = useState(CONSTANTS.PAGINATION_MAX);
  const { typeScreen } = useResize();

  useEffect(() => {
    if (typeScreen === "desktop") {
      setPagination(CONSTANTS.PAGINATION_MAX);
    } else {
      setPagination(CONSTANTS.PAGINATION_MIN);
    }
  }, [typeScreen]);

  return { pagination };

}