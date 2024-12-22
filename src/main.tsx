import {KindeProvider} from "@kinde-oss/kinde-auth-react";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import React from "react";

createRoot(document.getElementById('root')!).render(
	<KindeProvider
		clientId=""
		domain=""
		redirectUri=""
		logoutUri=""
	>
		<App />
	</KindeProvider>
)
