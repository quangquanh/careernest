import useAppLogic from '../hooks/useAppLogic'
import AppRoute from '../routes/AppRoute'
import './App.scss'
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice';
import { useEffect, useState } from 'react';
import { FaRegMessage } from "react-icons/fa6";
import ModalChatBot from '../modules/chatbot/ModalChatBot';
import { useLocation } from 'react-router-dom';

function App() {
  const theme = useSelector((state) => state?.theme?.theme);
  const dispatch = useDispatch();
  const [showChatbot, setShowChatbot] = useState(false);
  const location = useLocation();

  useAppLogic();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className='w-full relative'>
      <AppRoute />

      {/* Nút toggle dark/light theme */}
      {!location.pathname.includes("system") && (
        <button
          onClick={() => dispatch(toggleTheme())}
          className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 p-2 bg-gray-200 dark:bg-gray-700 rounded-full shadow-lg hover:scale-110 transition"
        >
          {theme === 'light' ? '🌞' : '🌙'}
        </button>
      )}

      {/* Nút mở chatbot */}
      {!location.pathname.includes("system") && (
        <button
          onClick={() => setShowChatbot(true)}
          className="fixed bottom-48 right-3 z-50 p-3 bg-white dark:bg-gray-700 rounded-full hover:scale-110 transition"
        >
          <FaRegMessage size={18} className='dark:text-white' />
        </button>
      )}

      {/* Modal chatbot */}
      {showChatbot && <ModalChatBot setShowChatbot={setShowChatbot} />}

      <ToastContainer position="top-right"
        autoClose={1800}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={true}
        theme="light"
        className={'col-6 col-sm-3'}
      />
    </div>
  )
}

export default App
