import ShowcaseGrid from "@/components/showcase/showcase-grid";
import ShowcaseHero from "@/components/showcase/showcase-hero";

const ShowcasePage = () => {
    return (
        <div className="w-full relative flex flex-col pt-16">
            <ShowcaseHero />
            <ShowcaseGrid />
        </div>
    );
};

export default ShowcasePage;
