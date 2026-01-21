import React from 'react'
import Wrapper from "../global/wrapper";
import Icons from "../global/icons";
import Image from "next/image";
import Container from "../global/container";
import { Button } from "../ui/button";

const Hero = () => {
    return (
        <div className="relative z-0 w-full h-full">

            <div className="absolute -top-16 inset-x-0 -z-10 mx-auto w-3/4 h-32 lg:h-40 rounded-full blur-[5rem] bg-[radial-gradient(86.02%_172.05%_at_50%_-40%,rgba(18,139,135,1)_0%,rgba(5,5,5,0)_80%)]"></div>

            <Image
                src="/images/hero.svg"
                alt=""
                width={1440}
                height={900}
                className="absolute inset-x-0 -top-16 w-full z-10 min-w-full"
            />

            <Wrapper className="py-20 lg:py-28">
                <div className="flex flex-col items-center justify-center w-full z-10">
                    <Container>
                        <div className="flex items-center justify-center gap-x-1 px-2 py-1.5 relative w-max mx-auto rounded-full before:absolute before:inset-0 before:-z-10 before:p-[1px] before:rounded-3xl before:bg-gradient-to-b before:from-neutral-700 before:to-neutral-900 before:content-[''] after:absolute after:inset-[1px] after:-z-10 after:rounded-[22px] after:bg-[#181818]/60">
                            <Icons.stars className="size-5" />
                            <span className="text-sm text-white">
                                Tech-Forward Solutions
                            </span>
                        </div>
                    </Container>

                    <Container delay={0.1}>
                        <h2 className="text-balance !leading-[1.25] text-center text-5xl md:text-7xl font-semibold tracking-tight mt-6 w-full">
                            Transform Your Vision <br className="hidden lg:inline-block" /> Into Digital Reality
                        </h2>
                    </Container>

                    <Container delay={0.2}>
                        <p className="text-base md:text-lg font-normal text-center text-balance text-muted-foreground max-w-3xl mx-auto mt-6">
                            Expert app development, AI solutions, and digital marketing services that drive growth and innovation for your business
                        </p>
                    </Container>

                    <Container delay={0.3}>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <Button size="lg">
                                Book a Consultation
                            </Button>
                            <Button size="lg" variant="outline">
                                View Our Work
                            </Button>
                        </div>
                        <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
                            <a href="/terms-and-conditions" className="hover:underline">Terms and Conditions</a>
                            <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
                        </div>
                    </Container>
                </div>
            </Wrapper>
        </div>
    )
};

export default Hero
