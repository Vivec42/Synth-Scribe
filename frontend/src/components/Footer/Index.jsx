import youtube from "@assets/images/Logo-Youtube.svg";
import twitter from "@assets/images/Logo-Twitter.svg";
import linkedin from "@assets/images/Logo-LinkedIn.svg";
import style from "@components/Footer/Index.module.scss";

function Footer() {
  return (
    <footer className={style.footer}>
      <h6>Synth Scribe 2023 🄯</h6>
      <span>
        <a
          target="blank"
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUJcmljayByb2xs"
        >
          <img src={youtube} alt="youtube_logo" />
        </a>
        <a
          target="blank"
          href="https://twitter.com/i/flow/login?redirect_after_login=%2F"
        >
          <img src={twitter} alt="twitter_logo" />
        </a>
        <a
          target="blank"
          href="https://www.linkedin.com/in/quentin-silmain-963244268/"
        >
          <img src={linkedin} alt="linkedin_logo" />
        </a>
      </span>
    </footer>
  );
}

export default Footer;
