import { useEffect, ReactNode } from 'react';
// rtl
import rtl from 'jss-rtl';
import { create } from 'jss';
import rtlPlugin from 'stylis-plugin-rtl';
// emotion
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
// material
import { StylesProvider, jssPreset } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

type RtlLayoutProps = {
  children?: ReactNode;
};

export default function RtlLayout({ children }: RtlLayoutProps) {
  const theme = useTheme();

  const jss = create({
    plugins: [...jssPreset().plugins, rtl()]
  });

  useEffect(() => {
    document.dir = theme.direction;
  }, [theme.direction]);

  const cache = createCache({
    key: theme.direction === 'rtl' ? 'rtl' : 'css',
    prepend: true,
    // @ts-ignore
    stylisPlugins: theme.direction === 'rtl' ? [rtlPlugin] : []
  });

  cache.compat = true;

  return (
    <CacheProvider value={cache}>
      <StylesProvider jss={jss}>{children}</StylesProvider>
    </CacheProvider>
  );
}
