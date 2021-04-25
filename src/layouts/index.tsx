import "../style/global.scss";

import cx from "classnames";
import { withPrefix } from "gatsby";
import * as React from "react";
import { Helmet } from "react-helmet";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";
import useSiteMetadata from "../components/SiteMetadata";
import { Transition } from "../components/Transition";
import "./layout.scss";
import { isServer } from "@utils/isServer";

interface LayoutProps {
  addPaddingToMain: boolean;
  onHomeClick?: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  addPaddingToMain,
  onHomeClick,
  children,
}) => {
  const { title, description } = useSiteMetadata();

  return (
    <>
      <div className="menu-list-wrapper"></div>
      <div className="modal-wrapper"></div>
      <div className="layout">
        <Helmet>
          <html lang="en" />
          <title>{title}</title>
          <meta name="description" content={description} />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`${withPrefix("/")}img/apple-touch-icon.png`}
          />
          <link
            rel="icon"
            type="image/png"
            href={`${withPrefix("/")}img/favicon-32x32.png`}
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href={`${withPrefix("/")}img/favicon-16x16.png`}
            sizes="16x16"
          />

          <link
            rel="mask-icon"
            href={`${withPrefix("/")}img/logo.svg`}
            color="#ff4400"
          />
          <meta name="theme-color" content="#fff" />

          <meta property="og:type" content="business.business" />
          <meta property="og:title" content={title} />
          <meta property="og:url" content="/" />
          <meta
            property="og:image"
            content={`${withPrefix("/")}img/og-image.jpg`}
          />

          <script
            data-ad-client="ca-pub-4402949806743205"
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          ></script>
        </Helmet>

        <Navbar onHomeClick={onHomeClick} />

        <div className={cx("main", { "has-padding": addPaddingToMain })}>
          <Transition location={isServer ? undefined : window.location}>
            {children}
          </Transition>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
