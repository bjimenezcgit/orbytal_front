import About from '@/components/About'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Manifesto from '@/components/Manifesto'
import Navbar from '@/components/Navbar'
import ScrollLogoBackground from '@/components/ScrollLogoBackground'
import Services from '@/components/Services'

function App() {
  return (
    <>
      <ScrollLogoBackground />
      <Navbar />
      <main className="relative z-10 bg-transparent">
        <Hero />
        <Services />
        <About />
        <Manifesto />
        <CTA />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </>
  )
}

export default App
