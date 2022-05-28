import { createPortal } from "react-dom";
import { useLayoutEffect, useState } from "react";

export const ReactPortal = ({
  children,
  wrapperId = "react-portal-wrapper",
}) => {
  const [wrapperElement, setWrapperElement] = useState(null);
  let systemCreated = false;
  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }
    document.body.style.overflow = "hidden";
    setWrapperElement(element);
    return () => {
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
      document.body.style.overflow = "unset";
    };
  }, [wrapperId]);

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
