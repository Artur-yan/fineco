import React, { useState, useEffect } from "react";
import { StyleSheetManager } from "styled-components";

const StyleInjector: React.FunctionComponent = ({ children }) => {
  const [iframeRef, setIframeRef] = useState<HTMLHeadElement | null>(null);

  useEffect(() => {
    const iframe = document.getElementsByTagName("iframe")[0];
    const iframeHeadElem = iframe?.contentDocument?.head;
    setIframeRef(iframeHeadElem ?? null);
  }, []);

  return iframeRef === null ? null : (
    <StyleSheetManager target={iframeRef}>{children}</StyleSheetManager>
  );
};

export default function withStyledComponentsRendered(MyComponent: any) {
  const WrappedElement = (props: any) => (
    <StyleInjector>
      <MyComponent {...props} />
    </StyleInjector>
  );

  return WrappedElement;
}
