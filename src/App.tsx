import { Toaster } from "~/components/ui/sonner";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import Header from "./components/header/Header";
import WritePage from "./pages/WritePage";

export default function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="blog/:naddr" element={<BlogPage />} />
      </Routes>
      <Toaster />
    </>
  );
}
