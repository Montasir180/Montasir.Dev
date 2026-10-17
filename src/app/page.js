import React from 'react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import SeeMyWork from './components/SeeMyWork';
import SkillsSection from './components/SkillsSection';
import CertificationSection from './components/CertificationSection';
import ContactSection from './components/ContactSection';


const page = () => {
  return (
    
    <main>
     
     <Navbar />
      <div>
      <Hero />
      <About />
      <SeeMyWork />
      <SkillsSection />
      <CertificationSection />
      <ContactSection />
    </div>
    </main>
  );
};

export default page;