import { toast } from "sonner";
import { useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./contact-me-modal.css";

const ContactMeModal = ({
  isModalOpen,
  setIsModalOpen,
  isModalAnimating,
  setIsModalAnimating,
}) => {
  const form = useRef();

  /* MAIL CONTACT FORM FUNCTIONALITY */
  function contact(e) {
    try {
      e.preventDefault();
      emailjs
        .sendForm("service_2zh7gkh", "template_athyrzu", form.current, {
          publicKey: "M5JGTBwzcn6wIf6a7",
        })
        .then(
          (result) => {
            setTimeout(() => {
              setIsModalOpen(false);
              form.current.reset();
            }, "300");
          },
          (error) => {
            alert(
              "Error: The email service is temporarily unavailable. Please contact me directly on email.nytek@gmail.com"
            );
          }
        );
    } catch (error) {
      console.error("Error in contact function:", error);
    }
  }

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-block-scroll");
    } else {
      document.body.classList.remove("modal-block-scroll");
    }

    return () => {
      document.body.classList.remove("modal-block-scroll");
    };
  }, [isModalOpen]);

  const closeModal = (isSubmit) => {
    setIsModalAnimating(false);
    setTimeout(() => {
      setIsModalOpen(false);
      form.current.reset();
      isSubmit ? toast.success("Message sent successfully.") : "";
    }, 300);
  };

  return (
    <div
      className={`contact-modal ${
        isModalOpen ? "modal--open" : "modal--closed"
      }`}
    >
      <div
        className={`
          modal__half modal__about ${
            isModalAnimating ? "slide-in-left" : "slide-out-left"
          }
        `}
      >
        <h3 className="modal__title modal__title--about">
          Here's a bit about me.
        </h3>
        <h4 className="modal__sub-title modal__sub-title--about">
          Web Developer
        </h4>
        <p className="modal__para">
          I'm a 40-year-old
          <strong className="purple title_para--highlight">
            Web Developer
          </strong>
          with a strong passion for developing websites with great
          <strong className="purple">user experiences</strong>.
          <br />
          Currently, I'm honing my skills by tackling difficult engineering
          challenges while learning from a team of some of the industry's most
          <strong className="purple">talented</strong> and
          <strong className="purple">experienced</strong> software engineers. I
          am passionate about continuous learning and leveraging my skills to
          contribute to innovative and impactful projects.
        </p>
        <div className="modal__languages">
          <figure className="modal__language">
            <img
              className="modal__language--img"
              src="/HTML5_Badge.png"
              alt="Language Icon"
            />
            <span className="language__name">HTML</span>
          </figure>
          <figure className="modal__language">
            <img
              className="modal__language--img"
              src="/css-badge.png"
              alt="Language Icon"
            />
            <span className="language__name">CSS</span>
          </figure>
          <figure className="modal__language">
            <img
              className="modal__language--img"
              src="/javascript-badge.png"
              alt="Language Icon"
            />
            <span className="language__name">JavaScript</span>
          </figure>
          <figure className="modal__language">
            <img
              className="modal__language--img"
              src="/typescript-badge.png"
              alt="Language Icon"
            />
            <span className="language__name">TypeScript</span>
          </figure>
          <figure className="modal__language">
            <img
              className="modal__language--img"
              src="/Node.js_logo.svg.png"
              alt="Language Icon"
            />
            <span className="language__name">Node.JS</span>
          </figure>
          <figure className="modal__language">
            <img
              className="modal__language--img"
              src="/react-badge.png"
              alt="Language Icon"
            />
            <span className="language__name">React</span>
          </figure>
          <figure className="modal__language">
            <img
              className="modal__language--img"
              src="/jQuery-badge.png"
              alt="Language Icon"
            />
            <span className="language__name">jQuery</span>
          </figure>
          <figure className="modal__language">
            <img
              className="modal__language--img"
              src="/mysql-badge.webp"
              alt="Language Icon"
            />
            <span className="language__name">MySQL</span>
          </figure>
        </div>
      </div>
      <div
        className={`
          modal__half modal__contact ${
            isModalAnimating ? "slide-in-right" : "slide-out-right"
          }
        `}
      >
        <FontAwesomeIcon
          icon={faXmark}
          onClick={() => closeModal(false)}
          className="modal__exit click"
          size="2x"
        />
        <h3 className="modal__title modal__title--contact">
          Let's have a chat!
        </h3>
        <h4 className="modal__sub-title modal__sub-title--contact">
          I'm currently open to new opportunities.
        </h4>
        <form ref={form} id="contact__form" onSubmit={contact}>
          <div className="form__item">
            <label className="form__item--label">
              <span className="purple required-field">*</span> Name
            </label>
            <input
              type="text"
              name="user_name"
              className="contact__input"
              required
            />
          </div>
          <div className="form__item">
            <label className="form__item--label">
              <span className="purple required-field">*</span> E-mail
            </label>
            <input
              type="email"
              name="user_email"
              className="contact__input"
              required
            />
          </div>
          <div className="form__item">
            <label className="form__item--label">
              <span className="purple required-field">*</span> Message
            </label>
            <textarea
              type="text"
              name="message"
              className="contact__input"
              required
            ></textarea>
          </div>
          <button
            id="contact__submit"
            type="submit"
            onClick={() => closeModal(true)}
            className="form__submit"
          >
            Send it my way
          </button>
        </form>
        <div className="modal__overlay modal__overlay--loading">
          <i className="fa-solid fa-spinner" aria-hidden="true"></i>
        </div>
        <div className="modal__overlay modal__overlay--success">
          Thanks for the message! Looking forward to speaking with you.
        </div>
      </div>
    </div>
  );
};

export default ContactMeModal;
