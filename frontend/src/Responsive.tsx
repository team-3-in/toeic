import { ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';

interface MediaQueryConfig {
  label: string;
  query: { maxWidth?: number; minWidth?: number };
}

const mediaQueries: MediaQueryConfig[] = [
  { label: 'smallMobile', query: { maxWidth: 360 } },
  { label: 'largeMobile', query: { minWidth: 361, maxWidth: 768 } },
  { label: 'tablet', query: { minWidth: 769, maxWidth: 1024 } },
  { label: 'desktop', query: { minWidth: 1025 } },
];

const useResponsive = (children: ReactNode) => {
  return mediaQueries.map(({ query }) =>
    useMediaQuery(query) ? children : null,
  );
};

export default useResponsive;
