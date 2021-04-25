import cx from "classnames";
import { navigate } from "gatsby";
import * as React from "react";
import { Column as ColumnModel } from "@models/Column";
import { ImageFile } from "@models/Image";
import { Link } from "gatsby";

import "./project-section.scss";

interface ProjectProps {
  slug: string;
  title: string;
  titleColor: string;
  image: ImageFile;
  subtitle: string;
  rows: ColumnModel[][];
  projectIndex: number;
  className?: string;
}

export const ProjectSection: React.FC<ProjectProps> = ({
  image,
  slug,
  title,
  titleColor,
  subtitle,
  className,
}) => {
  const imageDiv = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <Link
        to={`/projects/${slug}`}
        id={slug}
        className={cx(className, "project-section")}
      >
        <div
          className="project-image"
          ref={imageDiv}
          style={{
            backgroundImage: `url(${image.childImageSharp.fluid.src})`,
          }}
        />

        <div className="container">
          <div className="project-title has-text-centered-mobile">
            <div>
              <h2
                style={{
                  color: titleColor,
                }}
              >
                {title}
              </h2>
              <h4 className="is-uppercase">{subtitle}</h4>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
