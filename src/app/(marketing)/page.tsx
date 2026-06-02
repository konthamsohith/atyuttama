import Companies from "@/components/marketing/companies";
import CTA from "@/components/marketing/cta";
import Faq from "@/components/marketing/faq";
import Hero from "@/components/marketing/hero";
import HowItWorks from "@/components/marketing/how-it-works";
import OurServices from "@/components/marketing/our-services";
import Showcase from "@/components/marketing/showcase";
import Testimonials from "@/components/marketing/testimonials";

const HomePage = () => {
    return (
        <div className="w-full relative flex flex-col pt-16">
            <Hero />
            <Companies />
            <OurServices />
            <HowItWorks />
            <Showcase />
            <Testimonials />
            <Faq />
            <CTA />
        </div>
    );
};

export default HomePage;
