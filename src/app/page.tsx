import ChatWidget from "@/components/ChatWidget";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Motion from "@/components/Motion";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";

const container = "mx-auto w-full max-w-6xl px-5 sm:px-8";

export default function Home() {
  return (
    <div id="top" className="flex min-h-full flex-col bg-background">
      <Motion />
      <Header />
      <Hero />
      <main className="flex-1">
        <Projects />
        <div className={container}>
          <Experience />
        </div>
        <Skills />
        <div className={container}>
          <Testimonials />
        </div>
      </main>
      <Contact />
      <Footer />
      <ChatWidget />
    </div>
  );
}
