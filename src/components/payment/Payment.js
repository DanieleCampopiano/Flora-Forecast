import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "./Payment.css";

function Payment() {
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
            "ASgmkIsl9ueJTnWHa5CW9GNekuMaF8NGpthqG-c5MB-8KexEWIVt0Zm5l685Dpa_ZwDwxtpwYDe-aqns",
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
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}

export default Payment;
