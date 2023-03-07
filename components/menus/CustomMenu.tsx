import theme from '@/styles/theme';
import { forwardRef, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Fragment } from 'react';
import { GrayDownIcon, PawIconPrimaryColor } from '../icons';

export type CustomMenuItem = {
  id: number;
  name: string;
  selected: boolean;
};

export type CustomMenuProps = {
  items?: Array<CustomMenuItem>;
  onClickItem?: (id: CustomMenuItem['id']) => void;
};

export const CustomMenu = ({ items, onClickItem }: CustomMenuProps) => {
  const selectedName = items?.find((item) => item.selected)?.name;

  const ForwardedCustomMenuButton = forwardRef((props, ref) => (
    <CustomMenuButton ref={ref} {...props}>
      {selectedName}
      <GrayDownIcon />
    </CustomMenuButton>
  ));

  return (
    <Menu>
      <MenuButton as={ForwardedCustomMenuButton} />
      <CustomMenuList>
        {items?.map(({ id, name, selected }, index) => {
          const last = index === items.length - 1;
          return (
            <Fragment key={id}>
              <CustomMenuItem onClick={() => onClickItem?.(id)} selected={selected}>
                <CustomGroupName>{name}</CustomGroupName>
                {selected && <PawIconPrimaryColor />}
              </CustomMenuItem>
              {!last && <CustomMenuDivider />}
            </Fragment>
          );
        })}
      </CustomMenuList>
    </Menu>
  );
};

const CustomMenuButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  ${theme.textStyles.buttonSmall}
  color: ${theme.colors.grey[6]};
`;
const CustomMenuList = styled(MenuList)`
  width: 160px;
  min-width: 160px;
  padding: 0;
  margin-top: -4px;
  border-radius: 8px;
  background-color: ${theme.colors.white};
  overflow: hidden;
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.06);
`;
const CustomMenuItem = styled(MenuItem)<{ selected: boolean }>`
  padding: 12px;
  justify-content: space-between;

  ${theme.textStyles.buttonSmall};
  color: ${({ selected }) => (selected ? theme.colors.primary : theme.colors.grey[6])};

  svg {
    flex-shrink: 0;
  }

  &:focus,
  &:active {
    --menu-bg: none;
  }
`;
const CustomGroupName = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const CustomMenuDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${theme.colors.grey[2]};
`;
