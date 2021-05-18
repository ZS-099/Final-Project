import React from "react";

const About = () => (
  <section className="about">
    <div className="about__container">
      <div className="about__container-header">
        <h4 className="about__container-header__text">
          Welcome to Safe Scales!
        </h4>
      </div>
      <div className="about__text">
        <p className="about__text-paragraph">
          We want to use our platform to sell reptiles ethically and make sure
          they go to good homes to prepared buyers.
        </p>
        <p className="about__text-paragraph">
          We require all customers to go through an ‘approval process’. Where
          you choose a reptile you want to purchase and go through the payment
          process. After this your order will be in the approval stage and not
          yet confirmed.
        </p>
      </div>
      <div className="about__list">
        <ol className="about__list-items">
          <li>
            First you must provide proof that you have the correct set up and
            understanding of care for your chosen reptile.
          </li>
          <li>
            Submit at least 1 document into the approval section. This could be
            an order confirmation email for a set up or an image of the set
            up/food/correct equipment for the reptile (your order will be in the
            approval process for 2 days, if no evidence is provided it will
            automatically be cancelled)
          </li>
          <li>Your evidence is then checked. </li>
          <li>It will then either be confirmed or denied. </li>
        </ol>
      </div>
      <div className="about__text">
        <p className="about__text-paragraph">
          If you order is denied you will be automatically refunded, and the
          reptile will be available for others to purchase.
        </p>
      </div>
      <div className="about__text">
        <p className="about__text-paragraph">
          Research shows that more and more people are purchasing exotic animals
          like reptiles and due to the lack of understanding on how to care for
          these animals, they are often neglected, and some are abandoned. Our
          mission is to decrease this and prevent it as much as we can by
          ensuring all our customers are informed about the reptile they wish to
          purchase.
        </p>
      </div>
    </div>
  </section>
);
export default About;
