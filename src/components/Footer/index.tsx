import * as React from "react";
import { Logo } from "../Logo";
import "./footer.scss";

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="columns is-desktop">
        <div className="column">
          <Logo width={"120"} height={"50"} ballColor="#FFF" textColor="#FFF" />
        </div>

        <div className="column">
          <h4 className="footer-section-title">Squash the ideas</h4>
          <div className="footer-section-body">
            The Black Church, St. Mary’s Place{" "}
          </div>
          <div className="footer-section-body">D07 P4AX, Dublin</div>
          <div className="footer-section-body">Ireland</div>
        </div>

        <div className="column">
          <h4 className="footer-section-title">Contact us</h4>
          <div style={{ minHeight: 48, display: "flex", alignItems: "center" }}>
            <a
              href="tel:+353873450611"
              className="footer-section-body"
              style={{
                height: "48px",
                display: "flex",
                alignItems: "center",
              }}
            >
              t. +353 87 345 0611
            </a>
          </div>
          <div style={{ minHeight: 48, display: "flex", alignItems: "center" }}>
            <a
              href="mailto:info@squashideas.com"
              className="footer-section-body"
              style={{
                height: "48px",
                display: "flex",
                alignItems: "center",
              }}
            >
              e. info@squashideas.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
