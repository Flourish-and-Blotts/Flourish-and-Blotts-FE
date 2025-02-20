import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import NotFoundPage from './pages/NotFoundPage'
import { CartProvider } from './configure/cardContext'
import ProductDetail from './pages/BookDetail'
import { ROUTER_PATH } from './configure/routerPath'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
  return (
    <CartProvider>
      <div className='w-full items-center justify-center bg-[#FFFFF0] dark:bg-black text-[#333333] dark:text-white' >
        <Header />
        <Routes>
          <Route path={ROUTER_PATH.HOME} element={<HomePage />} />
          <Route path={ROUTER_PATH.BOOK_DETAIL} element={<ProductDetail />} />
          {/* <Route path="/about" element={<AboutPage />} /> */}
          <Route path="*" element={<NotFoundPage />} />  {/* 404 Page */}
        </Routes>
        <Footer />
      </div>
    </CartProvider>
  )
}

export default App
