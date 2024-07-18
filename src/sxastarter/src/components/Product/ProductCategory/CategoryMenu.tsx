import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { Category } from 'src/components/Product/Models/CategoryType';

interface CategoryMenuProps {
  menuItem: Category;
}

const CategoryMenu = (props: CategoryMenuProps) => {
  const { menuItem } = props;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleSubCate = (itemid: number) => {
    setOpen(false);
    router.push('/productlist?cid=' + itemid);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);

  return (
    <Stack direction="row" spacing={1}>
      <div
        className="col p-2"
        onMouseEnter={() => handleToggle()}
        onMouseLeave={() => handleToggle()}
      >
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={() =>
            menuItem.SubCategories.length > 0
              ? handleToggle()
              : router.push('/productlist?cid=' + menuItem.Id)
          }
        >
          {menuItem.Name}
        </Button>
        {menuItem.SubCategories ? (
          <Popper
            sx={{ zIndex: 9 }}
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      {menuItem.SubCategories.map((item) => (
                        <MenuItem key={item.Id} onClick={() => handleSubCate(item.Id)}>
                          {item.Name}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        ) : null}
      </div>
    </Stack>
  );
};

export default CategoryMenu;
