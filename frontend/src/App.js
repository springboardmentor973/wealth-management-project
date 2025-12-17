import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function LoginPage() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the login page.</p>
    </div>
  );
}

function RegisterPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>This is a register page.</p>
    </div>
  );
}
function DashboardPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>This is a Dashboard.</p>
    </div>
  );
}
function PortfolioPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>This is a Portfolio.</p>
    </div>
  );
}
function GoalsPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>This is a goals page.</p>
    </div>
  );
}
function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/Login">Login</Link> | <Link to="/Register">Register</Link> | <Link to="/Dashboard">Dashboard</Link> | <Link to="/Portfolio">Portfolio</Link> | <Link to="/Goals">Goals</Link>
      </nav>
      <Routes>
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/Dashboard" element={<DashboardPage />} />
        <Route path="/Portfolio" element={<PortfolioPage />} />
        <Route path="/Goals" element={<GoalsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;