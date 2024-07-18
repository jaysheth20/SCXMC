import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

import CategoryMenu from 'src/components/Product/ProductCategory/CategoryMenu';
import { fetchTopMenuData } from 'src/store/Category';
import { useAppDispatch, useAppSelector } from 'src/store/StoreHook';

const ProductCategory = () => {
  const dispatcher = useAppDispatch();
  const topMenu = useAppSelector((state) => state.topMenu);

  useEffect(() => {
    if (topMenu.Loading == true) {
      dispatcher(fetchTopMenuData());
    }
  }, [topMenu]);

  return topMenu.Loading == false ? (
    <>
      <Box
        className="site-header__btn-cat-menu"
        sx={{
          display: 'block',
          alignItems: 'center',
          borderColor: 'divider',
          cursor: 'pointer',
          '& svg': {
            m: 1,
          },
        }}
      >
        {topMenu.Categories?.Categories?.map((item) => (
          <CategoryMenu key={item.Id} menuItem={item}></CategoryMenu>
        ))}
      </Box>
    </>
  ) : (
    <Skeleton sx={{ height: 50 }} />
  );
};
export default ProductCategory;
