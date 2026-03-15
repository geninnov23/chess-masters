import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/category/:categoryId" element={<App />} />
				<Route path="/game/:gameId" element={<App />} />
				<Route path="/blog" element={<App page="blog" />} />
				<Route path="/blog/:slug" element={<App page="blog-post" />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
