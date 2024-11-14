import {KindeProvider} from "@kinde-oss/kinde-auth-react";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
<KindeProvider
		clientId="d0649206c4bc405a9eae7e083e2eafba"
		domain="https://rangers.kinde.com"
		redirectUri="https://redranger.vercel.app"
		logoutUri="https://redranger.vercel.app"
	>
		<App />
	</KindeProvider>
)
