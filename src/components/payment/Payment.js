import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "./Payment.css";

const initialOptions = {
  clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
  currency: "EUR",
  intent: "capture",
};

function Payment() {
  const navigate = useNavigate();
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const handlePaymentComplete = () => {
    setPaymentCompleted(true);
    navigate("/homepage");
  };

  return (
    <Container>
      <Row className="px-4 my-5">
        <Col xs={4} sm={6}>
          <Image src="/img/logo.png" width="500" height="500" />
        </Col>
        <Col sm={6}>
          <b className="price">Fatturazione</b>
          <p className="explanation">
            Benvenuti su Flora Forecast la piattaforma innovativa che utilizza
            le riprese satellitari per prevedere la crescita della flora negli
            ambienti urbani. Esplora e analizza l'evoluzione della vegetazione
            nel tempo con heatmap animate. Paga per accedere a questa tecnologia
            all'avanguardia.
          </p>
          <b className="price">10€</b>
          <br />
          <br />
          {!paymentCompleted ? (
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: "10.00",
                      },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                const details = await actions.order.capture();
                const name = details.payer.name.given_name;
                alert("Transazione completata da " + name);
                handlePaymentComplete();
              }}
              onError={(error) => {
                console.error("Errore durante il pagamento:", error);
                alert(
                  "Si è verificato un errore durante il pagamento. Riprova più tardi."
                );
              }}
            />
          </PayPalScriptProvider>
          ) : (
            <p className="payment-completed-message">Pagamento già effettuato</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Payment;
