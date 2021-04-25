import { useLocation, WindowLocation } from "@reach/router";
import { graphql } from "gatsby";
import * as React from "react";
import { PageContainer } from "@components/PageContainer/PageContainer";
import { Section as SectionModel, ProjectSection } from "@models/Section";
import "./index-page.scss";
import InitialModal from "../components/InitialModal";

export const projectsTitle = {
  backgroundColor: "#FFFFFF",
  textColor: "#0A2F34",
  title: "Projects",
  type: "title_section_type",
  vertical_alignment: null,
} as any;
export interface PageSize {
  width: React.CSSProperties["width"];
  height: React.CSSProperties["height"];
}

interface IndexPageTemplateProps {
  sections: SectionModel[];
  location: WindowLocation;
}

export const IndexPageTemplate: React.FC<IndexPageTemplateProps> = ({
  sections,
  location,
}) => {
  const container = "index-page";
  React.useEffect(() => {
    setTimeout(() => {
      const modal = document.querySelector(".initial-modal");
      modal && modal.classList.add("closed");
    }, 1500);
  }, []);

  React.useEffect(() => {
    if (location.hash === "#projects") {
      setTimeout(() => {
        document.querySelector(".projects")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 500);
    }
    if (location.hash === "#what-we-do") {
      setTimeout(() => {
        document.querySelector(".what-we-do")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 500);
    }
  }, [location]);

  return (
    <>
      <InitialModal />
      <PageContainer containerId={container} sections={sections} />
    </>
  );
};

interface IndexPageProps {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
        addPaddingTop: boolean;
        sections: SectionModel[];
      };
    };
    projects: {
      nodes: Array<{
        childMarkdownRemark: {
          frontmatter: ProjectSection;
        };
      }>;
    };
  };
}

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const sections = data.markdownRemark.frontmatter.sections.flatMap((section) =>
    section.type === "projects_section_type"
      ? [
          projectsTitle,
          ...section.projects.map((projectSlug) => ({
            ...data.projects.nodes.find(
              (n) => n.childMarkdownRemark.frontmatter.slug === projectSlug
            )?.childMarkdownRemark.frontmatter,
            type: "project_section_type",
          })),
        ]
      : [section]
  );

  return (
    <div className="index-page">
      <IndexPageTemplate sections={sections} location={useLocation()} />
    </div>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "IndexTemplate" } }) {
      frontmatter {
        title
        sections {
          ...Sections
        }
      }
    }

    projects: allFile(
      filter: {
        sourceInstanceName: { eq: "content" }
        relativeDirectory: { eq: "projects" }
        childMarkdownRemark: { frontmatter: { draft: { eq: false } } }
      }
    ) {
      nodes {
        childMarkdownRemark {
          frontmatter {
            title
            subtitle
            titleColor
            slug

            image {
              ...Image
            }
          }
        }
      }
    }
  }
`;
