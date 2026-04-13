import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import { scrollToSection } from "./scroll";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home scrollToSection={scrollToSection} />} />
        <Route path="projects/:slug" element={<ProjectDetail />} />
      </Route>
    </Routes>
  );
}
