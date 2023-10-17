import React from 'react';

const TableBody = ({ data }) => {
  const [displayStart, setDisplayStart] = React.useState(0);
  const [displayEnd, setDisplayEnd] = React.useState(0);
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const itemRowHeight = 32; // same height as each row (mine are 32px)
  const screenHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  ); // get the height of the screen
  const offset = screenHeight; // We want to render more than we see, or else we will see nothing when scrolling fast
  const rowsToRender = Math.floor((screenHeight + offset) / itemRowHeight);
  const rows = []; // this will be filled in later
  const setDisplayPositions = React.useCallback(
    scroll => {
      // we want to start rendering a bit above the visible screen
      const scrollWithOffset = Math.floor(scroll - rowsToRender - offset / 2);
      // start position should never be less than 0
      const displayStartPosition = Math.round(
        Math.max(0, Math.floor(scrollWithOffset / itemRowHeight))
      );

      // end position should never be larger than our data array
      const displayEndPosition = Math.round(
        Math.min(displayStartPosition + rowsToRender, data.length)
      );

      setDisplayStart(displayStartPosition);
      setDisplayEnd(displayEndPosition);
    },
    [data.length]
  );
  React.useEffect(() => {
    const onScroll = throttle(() => {
      const scrollTop = window.scrollY;
      if (data.length !== 0) {
        setScrollPosition(scrollTop);
        setDisplayPositions(scrollTop);
      }
    }, 100);

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [setDisplayPositions, data.length]);

  React.useEffect(() => {
    setDisplayPositions(scrollPosition);
  }, [scrollPosition, setDisplayPositions]);
  return <tbody>{rows}</tbody>;
};

export default TableBody;
