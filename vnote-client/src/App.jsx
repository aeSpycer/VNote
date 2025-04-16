import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TaskProvider } from './context/TasksContext';

import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import TaskPage from './pages/TaskPage';
import TasksPage from './pages/TasksPage';
import TaskFormPage from './pages/TaskFormPage';
import Profile from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';

import ProtectedRoute from './ProtectedRoute';

// Contenido de la aplicacion web
function AppContent() {

  const { isAuthenticated } = useAuth();

  return (

    <main>
      
      {isAuthenticated && <Navbar />}
      
      <Routes>

        <Route path='/VNote/login' element={<LoginPage />} />
        <Route path='/VNote/signup' element={<SignupPage />} />

        {/*Rutas protegidas, solo se pueden acceder si inicio sesion*/}
        <Route element={<ProtectedRoute />}>

          <Route path='/VNote/' element={<HomePage />} />
          <Route path='/VNote/tasks' element={<TasksPage />} />
          <Route path='/VNote/add-task' element={<TaskFormPage />} />
          <Route path='/VNote/task/:id' element={<TaskPage />} />
          <Route path='/VNote/tasks/:id' element={<TaskFormPage />} />
          <Route path='/VNote/profile' element={<Profile />} />

        </Route>

      </Routes>
    </main>
  );

}

// Funcion principal de la app, que contiene los provider del estado de la app
function App () {

  return (

    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>

          <AppContent />

        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>

  );

};

export default App;
