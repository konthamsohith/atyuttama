import IntegrationsHero from "@/components/integrations/integrations-hero"
import IntegrationsSection from "@/components/integrations/integrations-section"
import Stats from "@/components/marketing/stats"

const IntegrationsPage = () => {
    return (
        <div className="w-full relative flex flex-col pt-16">
            <IntegrationsHero />
            <IntegrationsSection />
            <Stats />
        </div>
    )
};

export default IntegrationsPage
