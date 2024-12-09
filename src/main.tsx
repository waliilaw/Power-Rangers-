import {KindeProvider} from "@kinde-oss/kinde-auth-react";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import React from "react";

createRoot(document.getElementById('root')!).render(
	<KindeProvider
		clientId="9e2def827e5a47e1938524b6bd9732bd"
		domain="https://testforrangers.kinde.com"
		redirectUri="http://localhost:3000"
		logoutUri="http://localhost:3000"
	>
		<App />
	</KindeProvider>
)