import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import React from "react";

createRoot(document.getElementById('root')!).render(
	<KindeProvider
		clientId={import.meta.env.VITE_CLIENT_ID}
		domain={import.meta.env.VITE_DOMAIN}
		redirectUri={import.meta.env.VITE_REDIRECT_URI}
		logoutUri={import.meta.env.VITE_LOGOUT_URI}
	>
		<App />
	</KindeProvider>
);
