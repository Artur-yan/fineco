import * as React from "react";
import { NavbarComponent } from "@components/Navbar";

const NavbarPreview = ({ entry }: any) => {
  const options = entry.getIn(["data"]).toJS();
  const [ref, setRef] = React.useState<HTMLDivElement | null>(null);

  return (
    <>
      <div ref={(ref) => setRef(ref)} className="menu-list-wrapper"></div>

      <NavbarComponent
        onHomeClick={() => undefined}
        options={options}
        menuWrapper={ref}
      />
    </>
  );
};

export default NavbarPreview;
