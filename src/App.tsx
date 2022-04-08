import { Provider } from 'react-redux'
import { GlobalStyle } from './globals.styles';
import store from './store'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home';
import SignUpPage from './pages/Signup';
import LoginPage from './pages/Login';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
          </Route>
          <Route path="signup" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} />
        </Routes>
        <GlobalStyle />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
