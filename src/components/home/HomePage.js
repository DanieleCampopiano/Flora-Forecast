import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./HomePage.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const isPaymentCompleted =
      localStorage.getItem("paymentCompleted") === "true";
    if (!isPaymentCompleted) {
      navigate("/payment");
    }
  }, [navigate]);

  const callAPI = (anniPrevisione, zona) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ anniPrevisione: anniPrevisione, zona: zona });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://qspt69vvc8.execute-api.us-east-1.amazonaws.com/flora",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => alert(JSON.parse(result).body))
      .catch((error) => console.log("error", error));
  };

  const handleButtonClick = () => {
    const anniPrevisioneInput = document.getElementById("anniPrevisione");
    const zonaInput = document.getElementById("zona");
    const anniPrevisione = anniPrevisioneInput.value;
    const zona = zonaInput.value;
    callAPI(anniPrevisione, zona);
    window.open(
      "https://h6yzz8pcxa.execute-api.us-east-1.amazonaws.com/",
      "_blank"
    );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ maxWidth: "1100px", textAlign: "center" }}>
        <img
          src="/img/world.png"
          alt="Mondo"
          style={{ width: "100%", height: "auto" }}
        />

        <form style={{ marginTop: "20px" }}>
          <Form.Control
            type="text"
            placeholder="Anni da prevedere"
            id="anniPrevisione"
          />
          <br></br>
          <Form.Control type="text" placeholder="Zona di interesse" id="zona" />
          <br></br>
          <Button
            variant="success"
            size="lg"
            className="custom-btn"
            type="button"
            onClick={handleButtonClick}
          >
            Calcola
          </Button>
        </form>
      </div>
    </div>
  );
}
export default HomePage;
