"use client";

import { useEffect, useState } from "react";
import CookieConsent from "react-cookie-consent";
import Cookies from "js-cookie";

export default function CookieConsentBanner() {
  const [cookiesAllowed, setCookiesAllowed] = useState(false);

  useEffect(() => {
    const userConsent = Cookies.get("userConsent"); // Check stored cookie
    if (userConsent === "true") {
      setCookiesAllowed(true);
    }
  }, []);

  useEffect(() => {
    if (cookiesAllowed) {
      console.log("Cookies are allowed! Load analytics here.");
      // Example: Load Google Analytics or other tracking scripts
    }
  }, [cookiesAllowed]);

  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      enableDeclineButton
      cookieName="userConsent"
      style={{ background: "#2e3944", color: "#d3d9d4" }}
      buttonStyle={{
        background: "#124e66",
        color: "#d3d9d4",
        fontSize: "14px",
        borderRadius: "5px",
        padding: "8px 12px",
      }}
      declineButtonStyle={{
        background: "#748d92",
        color: "#212a31",
        fontSize: "14px",
        borderRadius: "5px",
        padding: "8px 12px",
      }}
      expires={365}
      onAccept={() => Cookies.set("userConsent", "true", { expires: 365 })}
      onDecline={() => Cookies.set("userConsent", "false", { expires: 365 })}
    >
      This website uses cookies to enhance your experience. By continuing to use
      this site, you accept our use of cookies.
    </CookieConsent>
  );
}
