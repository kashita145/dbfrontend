import React from "react";
import { Icon } from "@iconify/react";
import heartFilled from "@iconify-icons/ant-design/heart-filled";

const Footer = () => {
  return (
    <div className="footer">
      <span className="footer-text-main">RTB </span>Dashboard
      <br />
      Made with <Icon icon={heartFilled} color="red" /> by{" "}
      <a href="https://github.com/archits581">Archit Shinde</a>,{" "}
      <a href="https://github.com/kashita145/">Kashita Talreja</a> and{" "}
      <a href="https://github.com/sauravUppoor">Saurav Uppoor</a>
    </div>
  );
};

export default Footer;
