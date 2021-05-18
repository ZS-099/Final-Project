import React, { useEffect, useRef, useState } from "react";
import emailjs from "emailjs-com";
const Paypal = ({ amount, setPaid,userDetails, user }) => {
  const paypal = useRef();
  const [hasSucces, setHasSucces] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [order, setOrder] = useState(null);
// console.log(userDetails)
const sendEmail = ()=>{
  // emailjs.send(serviceID, templateID, templateParams, userID);
  const templateParams = {
    email: user.email
  };
  emailjs.send('service_enn7sfs', 'template_u6ogu4p', templateParams,'user_rX07ePnw8ntXJcMqU1pzn')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
}


useEffect(() => {
    const {street, streetNumber,city,country,postalCode} = userDetails;
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            application_context: {
              shipping_preference: 'SET_PROVIDED_ADDRESS'
            },
            purchase_units: [
              {
                description: "animals",
                amount: {
                  value: amount,
                  currency_code: "GBP",
                },
                shipping: {
                  address: {
                    address_line_1: streetNumber + street,
                    address_line_2:streetNumber,
                    admin_area_2:city,
                    admin_area_1:"UK",
                    postal_code:postalCode,
                    country_code:"GB"
                  }
                }
              },

            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          localStorage.removeItem("products");
          sendEmail()
          setHasSucces(true);
          setPaid(true);
          setOrder(order);
        },
        onerror: (err) => {
          console.log("ERROR", err);
          setHasError(true);
          setPaid(false);
        },
      })
      .render(paypal.current);
    

  }, [userDetails]);
  const renderSuccesMessage = () => {
    if (order) {
      return (
        <div className="paypal-container--details">
          <p>{`Congratulations! Your order number ${order.id} is being confirmed. This means that someone will soon be viewing the document/s you have provided to ensure you have the correct items to care for your new reptile. You will receive an email once your order has been approved! `}</p>
        </div>
      );
    }
    if (hasError) {
      return (
        <div className="paypal-container--details">
          <p>{`Payment declined, please refresh and try again!`}</p>
        </div>
      );
    }
  };
  return (
    <div className="paypal-container">
      {renderSuccesMessage()}
      {!hasSucces && (
        <div className="paypal-container--buttons" ref={paypal}></div>
      )}
    </div>
  );
};

export default Paypal;
