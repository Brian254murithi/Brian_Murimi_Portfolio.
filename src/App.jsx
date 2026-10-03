import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'
import ScrollProgress from './components/ScrollProgress'
import CursorFollower from './components/CursorFollower'
import SocialIcons from './components/SocialIcons'

export default function App() {
  return (
    <>
      <ScrollProgress />
      <CursorFollower />
      <Navbar />
      {/* Fixed social rail — desktop only */}
      <div className="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-3 [&>div]:flex-col">
        <SocialIcons />
        <span className="w-px h-24 bg-slate-400/40" />
      </div>
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
