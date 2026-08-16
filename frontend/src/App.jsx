import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AddStudent from "./pages/AddStudent";
import ViewStudent from "./pages/ViewStudent";
import EditStudent from "./pages/EditStudent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/add-student"
          element={<AddStudent />}
        />

        <Route
          path="/students/:id"
          element={<ViewStudent />}
        />

        <Route
          path="/students/:id/edit"
          element={<EditStudent />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;