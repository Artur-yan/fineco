import cx from "classnames";
import { graphql } from "gatsby";
import * as React from "react";
import { Columns } from "@components/Columns/Columns";
import { ProjectSection as ProjectSectionModel } from "@models/Section";
import "./project.scss";

interface ProjectPageTemplateProps {
  data: {
    markdownRemark: { frontmatter: ProjectSectionModel };
  };
}

const ProjectPageTemplate: React.FC<ProjectPageTemplateProps> = ({
  data,
}: any) => {
  const project: ProjectSectionModel = data.markdownRemark.frontmatter;
  const { title, titleColor, subtitle, image, backgroundColor, rows } = project;
  const projectPage = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setTimeout(() => {
      if (projectPage.current !== null) {
        projectPage.current.style.opacity = "1";
      }
    });
  }, []);

  return (
    <div
      className="project"
      ref={projectPage}
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <div
        className="header-image"
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

      <div className={cx("description container")}>
        <Columns
          isMarginless={true}
          isPaddingless={true}
          vertical_alignment={"top"}
          rows={rows}
          backgroundColor={backgroundColor}
        />
      </div>
    </div>
  );
};

export default ProjectPageTemplate;

export const projectTemplateQuery = graphql`
  query ProjectTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        draft
        title
        titleColor
        subtitle
        backgroundColor

        image {
          ...Image
        }
        rows {
          type
          column_size

          textColor
          # backgroundColor
          markdown

          image {
            ...Image
          }

          video {
            ...Video
          }
          video_controls
          video_muted
          full_page
          video_autoplay
          video_loop
          vimeo_id
          video_ratio

          # map
          # map_height
        }
      }
    }
  }
`;
