export type Integration = {
    name: string;
    description: string;
    icon: string;
    category: "frontend" | "backend" | "ai" | "all";
};

export const INTEGRATION_CATEGORIES = [
    {
        label: "All Technologies",
        value: "all"
    },
    {
        label: "Frontend",
        value: "frontend"
    },
    {
        label: "Backend",
        value: "backend"
    },
    {
        label: "AI & ML",
        value: "ai"
    }
] as const;

export const INTEGRATIONS: Integration[] = [
    {
        name: "React & Next.js",
        description: "Build modern, performant web applications with React and Next.js framework for optimal user experiences.",
        icon: "/icons/figma.svg",
        category: "frontend"
    },
    {
        name: "React Native",
        description: "Cross-platform mobile development delivering native performance and beautiful interfaces for iOS and Android.",
        icon: "/icons/apple.svg",
        category: "frontend"
    },
    {
        name: "Node.js",
        description: "Scalable backend solutions built with Node.js, handling high-traffic applications with ease and efficiency.",
        icon: "/icons/new.svg",
        category: "backend"
    },
    {
        name: "Python & Django",
        description: "Reliable backend development with Python and Django for complex business logic and data processing.",
        icon: "/icons/computer.svg",
        category: "backend"
    },
    {
        name: "TensorFlow",
        description: "Advanced machine learning and deep learning solutions powered by TensorFlow for intelligent automation.",
        icon: "/icons/cursor.svg",
        category: "ai"
    },
    {
        name: "OpenAI Integration",
        description: "GPT and other OpenAI models, wired in to build intelligent, conversational AI for your business.",
        icon: "/icons/stars.svg",
        category: "ai"
    },
    {
        name: "AWS Cloud",
        description: "Enterprise-grade cloud infrastructure and services for scalable, secure, and reliable application deployment.",
        icon: "/icons/cloud.svg",
        category: "backend"
    },
    {
        name: "Firebase",
        description: "Real-time database, authentication, and hosting for rapid development and smooth user experiences.",
        icon: "/icons/pie.svg",
        category: "backend"
    },
    {
        name: "TypeScript",
        description: "Type-safe development for more maintainable, scalable codebases with enhanced developer productivity.",
        icon: "/icons/label.svg",
        category: "frontend"
    },
    {
        name: "PostgreSQL",
        description: "Powerful relational database solutions for complex data modeling and high-performance queries.",
        icon: "/icons/crown.svg",
        category: "backend"
    },
    {
        name: "GraphQL",
        description: "Efficient API development with GraphQL for flexible, performant data fetching and manipulation.",
        icon: "/icons/edit.svg",
        category: "backend"
    },
    {
        name: "Docker & K8s",
        description: "Containerization and orchestration for consistent deployments and scalable microservices architecture.",
        icon: "/icons/clock.svg",
        category: "backend"
    }
]; 