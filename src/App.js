import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Amplify } from "aws-amplify";
import { Authenticator, View, useTheme, Image, Text } from "@aws-amplify/ui-react";
import awsExports from "./aws-exports";
import "@aws-amplify/ui-react/styles.css";
import SiteNav from "./components/Common/SiteNav";
import SiteFooter from "./components/Common/SiteFooteer";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import Payment from "./components/payment/Payment";
import React, { useEffect, useState } from "react";

Amplify.configure(awsExports);

function App() {
  const components = {
    Header() {
      const { tokens } = useTheme();

      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Image alt="Contacts App" src="/img/logo.png" />
        </View>
      );
    },

    Footer() {
      const { tokens } = useTheme();

      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Text color={tokens.colors.neutral[80]}>
            &copy; Flora Forecast 2023
          </Text>
        </View>
      );
    },
  };

  const [paymentCompleted, setPaymentCompleted] = useState(false);

  useEffect(() => {
    const isPaymentCompleted = localStorage.getItem("paymentCompleted") === "true";
    setPaymentCompleted(isPaymentCompleted);
  }, []);

  return (
    <Authenticator loginMechanisms={["email"]} components={components}>
      {({ signOut, user }) => (
        <div>
          <SiteNav logOut={signOut} />
            <Routes>
            <Route path="/" element={paymentCompleted ? <HomePage /> : <Payment />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/homepage" element={<HomePage />} />
            </Routes>
          <SiteFooter />
        </div>
      )}
    </Authenticator>
  );
}

export default App;
