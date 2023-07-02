import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "./Payment.css";

function Payment() {
  const navigate = useNavigate();
  return (
    <Container>
      <Row className="px-4 my-5">
        <Col xs={4} sm={6}>
          <Image src="/img/logo.png" width="500" height="500"/>
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
          <PayPalScriptProvider
            options={{
              "client-id":
                "AfGHfJfSKXsoM_WU3SAgRZr9sPdywKPVX8I465Ch-2g-xO6YSXAp0cPX6kM6gorK01t5GUQPzdtkZXwU",
            }}
          >
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: "00.01",
                      },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                const details = await actions.order.capture();
                const name = details.payer.name.given_name;
                alert("Transazione completata da " + name);
                navigate('/homepage');
              }}
            />
          </PayPalScriptProvider>
        </Col>
      </Row>
    </Container>
  );
}

export default Payment;
