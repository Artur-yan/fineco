import cx from "classnames";
import { Link, navigate, graphql, StaticQuery, GatsbyLinkProps } from "gatsby";
import * as React from "react";
import styled from "styled-components";
import menuIcon from "../../img/icon-nav-plus-black-mobile.svg";
import { useMediaQuery, tabletQuery } from "../../utils";
import { closeMenu, closeModal, openMenu, openModal } from "../../utils/dom";
import Mail from "../icons/Mail";
import { Logo } from "../Logo";
import MenuPortal from "../MenuPortal";
import ContactModal from "./ContactModal";
import "./navbar.scss";

interface NavbarOptions {
  textColor: string;
  textOutlineColor: string;
  textColorHover: string;
  textOutlineColorHover: string;
  textColorActive: string;
  textOutlineColorActive: string;
}

interface NavbarProps {
  onHomeClick?: () => void;
  options: NavbarOptions;
}

const WrappedLink = ({
  textColor,
  textOutlineColor,
  textColorHover,
  textOutlineColorHover,
  textColorActive,
  textOutlineColorActive,
  ref,
  ...rest
}: GatsbyLinkProps<unknown> & NavbarOptions) => <Link {...rest} />;

const StyledLink = styled(WrappedLink)<NavbarOptions>`
  &.navbar-item {
    -webkit-text-stroke-width: 1px;
    color: ${(props) => props.textColor};
    -webkit-text-stroke-color: ${(props) => {
      return props.textOutlineColor;
    }};

    &:hover {
      color: ${(props) => props.textColorHover};
      -webkit-text-stroke-color: ${(props) => props.textOutlineColorHover};
    }

    &.active {
      color: ${(props) => props.textColorActive};
      -webkit-text-stroke-color: ${(props) => props.textOutlineColorActive};
    }
  }
`;

const navItems = [
  {
    url: "/",
    label: "Home",
  },
  {
    url: "/#what-we-do",
    label: "Services",
  },
  {
    url: "/#projects",
    label: "Projects",
  },
  {
    url: "/about",
    label: "About",
  },
  {
    url: "/contact",
    label: "Contacts",
  },
];

export const NavbarComponent: React.FC<NavbarProps> = ({
  onHomeClick,
  options,
}) => {
  const {
    textColor,
    textOutlineColor,
    textColorHover,
    textOutlineColorHover,
    textColorActive,
    textOutlineColorActive,
  }: NavbarOptions = options;

  const [activeTab, setActiveTab] = React.useState("/home");
  const [menuActive, setMenuActive] = React.useState(false);
  const [contactModalActive, setContactModalActive] = React.useState(false);
  const isTablet = useMediaQuery(tabletQuery);

  React.useEffect(() => setActiveTab(window.location.pathname), []);

  const changeRoute = (route: string) => {
    setMenuActive(false);
    setActiveTab(route);
  };

  return (
    <nav
      className="navbar is-fixed-top is-transparent"
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="navbar-brand">
        <a
          className="navbar-item logo"
          onClick={async (e) => {
            e.preventDefault();
            changeRoute("/");

            if (onHomeClick !== undefined) {
              onHomeClick();
            } else {
              await navigate("/");
            }
          }}
        >
          <Logo
            width={isTablet ? "120" : "220"}
            height={isTablet ? "50" : "80"}
            ballColor="#E91A3C"
            textColor="#fff"
          />
        </a>

        <div className="mail">
          <Mail
            width={40}
            color="#FFF"
            onClick={() => {
              setContactModalActive(true);
              openModal("contact");
            }}
          />
        </div>

        <button
          onClick={() => {
            setMenuActive(!menuActive);
            menuActive ? closeMenu() : openMenu();
          }}
          style={{
            backgroundImage: `url(${menuIcon})`,
          }}
          className={cx("menu-button", {
            burger: true,
            "is-active": menuActive,
          })}
          aria-label="Navigation Menu"
        ></button>
      </div>

      {contactModalActive && (
        <ContactModal
          onClose={() => {
            setContactModalActive(false);
            closeModal("contact");
          }}
        />
      )}

      {menuActive && (
        <MenuPortal>
          <div className="menu-list is-active">
            {navItems.map((navItem) => (
              <StyledLink
                key={navItem.url}
                className={cx(
                  `navbar-item is-uppercase`,
                  {
                    active: activeTab === navItem.url,
                  },
                  `has-text-right`
                )}
                to={navItem.url}
                onClick={() => {
                  changeRoute(navItem.url);
                  setMenuActive(false);
                  closeMenu();
                }}
                textColor={textColor}
                textOutlineColor={textOutlineColor}
                textColorHover={textColorHover}
                textOutlineColorHover={textOutlineColorHover}
                textColorActive={textColorActive}
                textOutlineColorActive={textOutlineColorActive}
              >
                {navItem.label}
              </StyledLink>
            ))}
          </div>
        </MenuPortal>
      )}
    </nav>
  );
};

const Navbar: React.FC<Pick<NavbarProps, "onHomeClick">> = (props) => {
  return (
    <StaticQuery
      query={graphql`
        query NavbarQuery {
          options: file(name: { eq: "navbar" }) {
            childMarkdownRemark {
              frontmatter {
                textColor
                textOutlineColor
                textColorHover
                textOutlineColorHover
                textColorActive
                textOutlineColorActive
              }
            }
          }
        }
      `}
      render={(data) => (
        <NavbarComponent
          options={data.options.childMarkdownRemark.frontmatter}
          onHomeClick={props.onHomeClick}
        />
      )}
    />
  );
};

export default Navbar;
