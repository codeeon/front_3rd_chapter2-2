import { useState } from 'react';

export const useProductAccordion = () => {
  const [openProductIdList, setOpenProductIdList] = useState<Set<string>>(new Set());

  const toggleProductAccordion = (productId: string) => {
    setOpenProductIdList((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  return { openProductIdList, toggleProductAccordion };
};
