import { graphql } from "gatsby";
import * as React from "react";
import { Helmet } from "react-helmet";
import { Section } from "../components/Section/Section";
import { Page } from "@models/Page";
import { Section as SectionModel } from "@models/Section";
import "./about-page.scss";

interface AboutPageTemplate {
  sections: SectionModel[];
}

export const AboutPageTemplate: React.FC<AboutPageTemplate> = ({
  sections,
}) => {
  return (
    <div className="about">
      <Helmet>
        <html />
      </Helmet>
      {sections.map((s, i) => (
        <Section key={i} section={s} index={i} />
      ))}
    </div>
  );
};

interface AboutPageProps {
  data: { markdownRemark: Page };
}
const AboutPage: React.FC<AboutPageProps> = (props) => {
  const { frontmatter } = props.data.markdownRemark;

  return <AboutPageTemplate sections={frontmatter.sections} />;
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage {
    markdownRemark(frontmatter: { templateKey: { eq: "AboutPageTemplate" } }) {
      html
      frontmatter {
        path
        sections {
          ...Sections
        }
      }
    }
  }
`;
