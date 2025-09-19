import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoPage from "./pages/TodoPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoPage />} />
      </Routes>
    </Router>
  )
}