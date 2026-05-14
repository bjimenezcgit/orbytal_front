import About from '@/components/About'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Manifesto from '@/components/Manifesto'
import Navbar from '@/components/Navbar'
import Services from '@/components/Services'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Manifesto />
        <CTA />
      </main>
      <Footer />
    </>
  )
}

export default App
