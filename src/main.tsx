
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import { ServiceQuote } from "./components/ServiceQuote";
import "./App.css";
import { createRoot as reactCreateRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="/service-quota" element={<ServiceQuote />} />
		</Routes>
	</BrowserRouter>
);
function createRoot(element: HTMLElement) {
    return reactCreateRoot(element);
}
