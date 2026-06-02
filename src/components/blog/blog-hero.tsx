import Container from "../global/container"
import Icons from "../global/icons"
import Wrapper from "../global/wrapper"

const BlogHero = () => {
    return (
        <div className="relative z-0 w-full h-full">
            <Wrapper className="py-20">
                <div className="flex flex-col items-center justify-center w-full z-10">
                    <Container>
                        <div className="flex items-center justify-center gap-x-1 px-2 py-1.5 relative w-max mx-auto rounded-full before:absolute before:inset-0 before:-z-10 before:p-[1px] before:rounded-3xl before:bg-gradient-to-b before:from-neutral-200 before:to-neutral-300 before:content-[''] after:absolute after:inset-[1px] after:-z-10 after:rounded-[22px] after:bg-white">
                            <Icons.stars className="size-5 text-neutral-800" />
                            <span className="text-sm text-neutral-800 font-medium">
                                Our Blog
                            </span>
                        </div>
                    </Container>

                    <Container delay={0.1}>
                        <h2 className="text-balance !leading-[1.25] text-center text-4xl md:text-6xl font-semibold tracking-tight mt-6 w-full">
                            Atyuttama Blog: <br className="hidden lg:inline-block" /> Build Pages With Atyuttama
                        </h2>
                    </Container>

                    <Container delay={0.2}>
                        <p className="text-base md:text-lg font-normal text-center text-balance text-muted-foreground max-w-3xl mx-auto mt-4">
                            Discover insights, tutorials, and best practices for building modern web applications with Atyuttama
                        </p>
                    </Container>
                </div>
            </Wrapper>
        </div>
    )
};

export default BlogHero
