import { useState, useEffect } from 'react';
import { useResize } from "./useResize";
import { PAGINATION_MIN, PAGINATION_MAX } from "../utils/constants";

export function usePagination() {

  const [pagination, setPagination] = useState(PAGINATION_MAX);
  const { typeScreen } = useResize();

  useEffect(() => {
    if (typeScreen === "desktop") {
      setPagination(PAGINATION_MAX);
    } else {
      setPagination(PAGINATION_MIN);
    }
  }, [typeScreen]);

  return { pagination };

}