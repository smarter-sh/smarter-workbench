import React from "react";
import ReactDOM from "react-dom/client";
import { SmarterChat, version as uiChatVersion } from "@smarter.sh/ui-chat";
import { REACT_ROOT_ELEMENT_ID } from "./shared/constants";
import { version as workbenchVersion } from "./version";
import "./styles.css";
import "@smarter.sh/ui-chat/dist/ui-chat.css";

console.log(`@smarter.sh/ui-chat v${uiChatVersion}`);
console.log(`@smarter.sh/workbench v${workbenchVersion}`);
const apiKey = null;

const DEFAULT_COOKIE_EXPIRATION = 1000 * 60 * 60 * 24 * 1; // 1 day
const debugCookieExpiration = DEFAULT_COOKIE_EXPIRATION;
const sessionCookieExpiration = DEFAULT_COOKIE_EXPIRATION;

const rootElement = document.getElementById(REACT_ROOT_ELEMENT_ID);
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  const apiUrl = rootElement.getAttribute("smarter-chatbot-api-url");
  const toggleMetadata = rootElement.getAttribute("smarter-toggle-metadata") === "true";
  const csrfCookieName = rootElement.getAttribute("smarter-csrf-cookie-name") || "csrftoken";
  const sessionCookieName = rootElement.getAttribute("smarter-session-cookie-name") || "session_key";
  const authSessionCookieName = rootElement.getAttribute("django-session-cookie-name") || "sessionid";
  const cookieDomain = rootElement.getAttribute("smarter-cookie-domain") || "platform.smarter.sh";
  const debugCookieName = "debug";

  root.render(
    <React.StrictMode>
      <SmarterChat
        apiUrl={apiUrl}
        apiKey={apiKey}
        toggleMetadata={toggleMetadata}
        csrfCookieName={csrfCookieName}
        debugCookieName={debugCookieName}
        debugCookieExpiration={debugCookieExpiration}
        sessionCookieName={sessionCookieName}
        sessionCookieExpiration={sessionCookieExpiration}
        authSessionCookieName={authSessionCookieName}
        cookieDomain={cookieDomain}
      />
    </React.StrictMode>,
  );
} else {
  console.error(
    "Root element not found. Begin your trouble shooting journey here: https://github.com/smarter-sh/smarter-chat/blob/main/src/main.jsx",
  );
}
