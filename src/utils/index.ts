import { useEffect, useState } from "react";

export const tabletQuery = "(max-width:768px)";

/**
 * @param query the query to match against
 * @returns a boolean set to true if the requested query matches
 *
 * @example const isMobile = useMediaQuery('(max-width:425px)')
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const handler = (e: any) => setMatches(e.matches);
    const mediaMatch = window.matchMedia(query);
    setMatches(mediaMatch.matches);

    mediaMatch.addListener(handler);

    return () => mediaMatch.removeListener(handler);
  }, [query]);

  return matches;
};
