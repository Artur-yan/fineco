import { graphql } from "gatsby";
import * as React from "react";
import { Helmet } from "react-helmet";
import { PageContainer } from "@components/PageContainer/PageContainer";
import "./contacts-page.scss";
import ContactForm from "../components/ContactForm";

const ContactPage = ({ data }: any) => {
  const { markdownRemark: post } = data;

  const containerId = "contact-page";

  return (
    <div className="contacts">
      <Helmet>
        <html />
      </Helmet>
      <PageContainer
        containerId={containerId}
        sections={post.frontmatter.sections}
      />
      <div className="contact-form-section-wrapper centered">
        <div className="contact-form-section centered">
          <h3 className="contact-claim">{post.frontmatter.contactFormClaim}</h3>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

export const contactPageQuery = graphql`
  query ContactPage {
    markdownRemark(
      frontmatter: { templateKey: { eq: "ContactPageTemplate" } }
    ) {
      frontmatter {
        title
        contactFormClaim
        sections {
          ...Sections
        }
      }
    }
  }
`;
