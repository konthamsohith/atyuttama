import React from 'react'
import Wrapper from "../global/wrapper"
import Icons from "../global/icons"
import Image from "next/image"
import Container from "../global/container"
import { Button } from "../ui/button"
import { CheckCircle2Icon } from "lucide-react"

const IntegrationsHero = () => {
    return (
        <div className="relative z-0 w-full h-full">
            <Wrapper className="py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
                    <div className="flex flex-col w-full z-10">
                        <Container>
                            <div className="flex items-center gap-x-1 px-2 py-1.5 relative w-max rounded-full before:absolute before:inset-0 before:-z-10 before:p-[1px] before:rounded-3xl before:bg-gradient-to-b before:from-neutral-200 before:to-neutral-300 before:content-[''] after:absolute after:inset-[1px] after:-z-10 after:rounded-[22px] after:bg-white">
                                <Icons.stars className="size-5 text-neutral-800" />
                                <span className="text-sm text-neutral-800 font-medium">
                                    Our Technology Stack
                                </span>
                            </div>
                        </Container>

                        <Container delay={0.1}>
                            <h2 className="text-balance !leading-[1.25] text-4xl md:text-6xl font-semibold tracking-tight mt-6 w-full">
                                Built with Modern <br className="hidden lg:inline-block" /> Technologies
                            </h2>
                        </Container>

                        <Container delay={0.2}>
                            <p className="text-base md:text-lg font-normal text-balance text-muted-foreground max-w-3xl mt-4">
                                We build on a modern, proven stack — fast, reliable, and scalable — chosen to fit your product, not a sales pitch.
                            </p>
                        </Container>

                        <Container delay={0.3}>
                            <div className="flex flex-col gap-2 mt-6">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2Icon className="size-4 text-primary" />
                                    <span className="text-sm text-muted-foreground font-medium">
                                        Create posts, reels and stories
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2Icon className="size-4 text-primary" />
                                    <span className="text-sm text-muted-foreground font-medium">
                                        Publish your Facebook posts dynamically
                                    </span>
                                </div>
                            </div>
                        </Container>

                        <Container delay={0.3}>
                            <div className="mt-6">
                                <Button size="md">
                                    Get started for free
                                </Button>
                            </div>
                        </Container>
                    </div>

                    <Container className="w-full z-30">
                        <div className="w-4/5 mx-auto lg:ml-auto mt-10 lg:mt-0">
                            <Image
                                src="/images/integrations.svg"
                                alt="Integrations"
                                priority
                                width={2932}
                                height={1664}
                                loading="eager"
                                className="w-full h-full"
                            />
                        </div>
                    </Container>
                </div>
            </Wrapper>
        </div>
    )
}

export default IntegrationsHero 