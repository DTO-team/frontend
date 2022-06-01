import { Theme } from '@material-ui/core/styles';
import { SxProps } from '@material-ui/system';

// ----------------------------------------------------------------------

type Products = {
  name: string;
  image: string;
  path: string;
};

type Tags = {
  name: string;
  path: string;
};

export type MegaMenuCarouselProps = {
  products: Products[];
  numberShow?: number;
  sx?: SxProps<Theme>;
};

export type MenuHotProductsProps = {
  tags: Tags[];
};

export type ParentItemProps = {
  title: string;
  path?: string;
  icon?: JSX.Element;
  open?: boolean;
  hasSub?: boolean;
  onClick?: VoidFunction;
  onMouseEnter?: VoidFunction;
  onMouseLeave?: VoidFunction;
};

export type MegaMenuItemProps = {
  title: string;
  path: string;
  icon: JSX.Element;
  more?: {
    title: string;
    path: string;
  };
  products?: Products[];
  tags?: Tags[];
  children?: {
    subheader: string;
    items: {
      title: string;
      path: string;
    }[];
  }[];
};
