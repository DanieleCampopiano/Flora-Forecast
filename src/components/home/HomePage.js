import React from "react";

function HomePage() {
  const callAPI = (anniPrevisione, zona) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ "anniPrevisione": anniPrevisione, "zona": zona });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://qspt69vvc8.execute-api.us-east-1.amazonaws.com/flora", requestOptions)
      .then(response => response.text())
      .then(result => alert(JSON.parse(result).body))
      .catch(error => console.log('error', error));
  };

  const handleButtonClick = () => {
    const anniPrevisioneInput = document.getElementById("anniPrevisione");
    const zonaInput = document.getElementById("zona");
    const anniPrevisione = anniPrevisioneInput.value;
    const zona = zonaInput.value;
    callAPI(anniPrevisione, zona);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ maxWidth: "1100px", textAlign: "center" }}>
        <img src="/img/mondo.jpg" alt="Mondo" style={{ width: "100%", height: "auto" }} />
  
        <form style={{ marginTop: "20px" }}>
          <h1>SELEZIONA LA TUA AREA!</h1>
          <label>Anni da prevedere: </label>
          <input type="text" id="anniPrevisione" />
          <label>   nella zona di: </label>
          <input type="text" id="zona" />
          <br /><br />
          <button type="button" onClick={handleButtonClick}>
            CALCOLA L'EVOLUZIONE
          </button>
        </form>
      </div>
    </div>
  );
  
}
export default HomePage;