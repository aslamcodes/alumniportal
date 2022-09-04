import { useEffect, useRef } from "react";
import throttle from "lodash/throttle";

const getCurrentScrollPosition = (element) => {
  const { scrollTop } = element;
  return scrollTop;
};

const useScrollPositionThrottled = (callback, element, deps = []) => {
  const currentElement = element ? element : document.documentElement;
  const scrollPosition = useRef(getCurrentScrollPosition(currentElement));

  useEffect(() => {
    const handleScroll = () => {
      scrollPosition.current = getCurrentScrollPosition(currentElement);
      callback({
        currentScrollPosition: scrollPosition.current,
        atBottom:
          currentElement.scrollHeight -
            currentElement.scrollTop -
            currentElement.clientHeight <
          1000,
      });
    };
    // Throttle the function to improve performance
    const handleScrollThrottled = throttle(handleScroll, 200);
    element
      ? element.addEventListener("scroll", handleScrollThrottled)
      : window.addEventListener("scroll", handleScrollThrottled);

    return () => {
      element
        ? element.removeEventListener("scroll", handleScrollThrottled)
        : window.removeEventListener("scroll", handleScrollThrottled);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, element, currentElement, callback]);
};

export default useScrollPositionThrottled;
