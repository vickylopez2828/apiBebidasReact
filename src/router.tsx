import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import FavoritesPage from "./pages/FavoritesPage";
import Layout from "./layouts/Layout";

export default function AppRouter(){
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<IndexPage/>} />
                    <Route path="/favoritos" element={<FavoritesPage/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}