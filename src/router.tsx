import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import FavoritesPage from "./pages/FavoritesPage";
import Layout from "./layouts/Layout";
import GenerateAI from "./pages/GenerateAI";

export default function AppRouter(){
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<IndexPage/>} />
                    <Route path="/favorites" element={<FavoritesPage/>} />
                    <Route path="/generate" element={<GenerateAI/>} />

                </Route>
            </Routes>
        </BrowserRouter>
    )
}