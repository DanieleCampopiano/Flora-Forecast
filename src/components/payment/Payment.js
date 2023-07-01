import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from 'react-router-dom';
import "./Payment.css";

function Payment() {
  const navigate = useNavigate();

  return (
    <div className="App-body">
      <h1>Make the payment</h1>
      <img
        height="200"
        src="\img\World.gif"
        alt="Sottotitolo"
      />
      <p>
        <span className="book-price">29.99€</span>
      </p>
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
            alert("Transaction completed by " + name);
            
            navigate('/homepage');
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}

export default Payment;
