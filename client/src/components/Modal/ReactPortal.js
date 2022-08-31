import { createPortal } from "react-dom";
import { useLayoutEffect, useRef, useState } from "react";

export const ReactPortal = ({
  children,
  scrollable = false,
  wrapperId = "react-portal-wrapper",
}) => {
  const [wrapperElement, setWrapperElement] = useState(null);

  const systemCreated = useRef(false);

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    if (!element) {
      systemCreated.current = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }
    if (!scrollable) {
      document.body.style.overflow = "hidden";
    }
    setWrapperElement(element);
    return () => {
      if (systemCreated.current && element.parentNode) {
        element.parentNode.removeChild(element);
      }
      document.body.style.overflow = "unset";
    };
  }, [wrapperId, scrollable]);

  if (!wrapperElement) return null;
  return createPortal(children, wrapperElement);
};

function createWrapperAndAppendToBody(wrapperId) {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

export default ReactPortal;
