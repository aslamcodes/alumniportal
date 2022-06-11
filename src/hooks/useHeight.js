import { useLayoutEffect, useRef, useState } from "react";

function useHeight({ isOn = true } = {}) {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);
  const heightRef = useRef(height);

  useLayoutEffect(() => {}, [isOn]);

  return [ref, height];
}

export default useHeight;
