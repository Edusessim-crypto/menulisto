import { Topbar } from "./components/Topbar";
import { Hero } from "./components/Hero";
import { PainPoints } from "./components/PainPoints";
import { Solution } from "./components/Solution";
import { ProductMockup } from "./components/ProductMockup";
import { Persona } from "./components/Persona";
import { Pricing } from "./components/Pricing";
import { ObjectionBreaker } from "./components/ObjectionBreaker";
import { Faq } from "./components/Faq";
import { FinalCta } from "./components/FinalCta";
import { Footer } from "./components/Footer";
import { StickyMobileBar } from "./components/StickyMobileBar";
import { UpsellModal } from "./components/UpsellModal";
import { UpsellModalProvider } from "./hooks/UpsellModalContext";

function App() {
  return (
    <UpsellModalProvider>
      <div className="min-h-screen bg-cream">
        <Topbar />
        <main>
          <Hero />
          <PainPoints />
          <Solution />
          <ProductMockup />
          <Persona />
          <Pricing />
          <ObjectionBreaker />
          <Faq />
          <FinalCta />
        </main>
        <Footer />
        <StickyMobileBar />
        <UpsellModal />
      </div>
    </UpsellModalProvider>
  );
}

export default App;
