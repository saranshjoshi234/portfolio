import { Footer } from './components/Footer/Footer'
import { Navbar } from './components/Navbar/Navbar'
import { Home } from './pages/Home'

export default function App() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Home />
      </main>
      <Footer />
    </>
  )
}
