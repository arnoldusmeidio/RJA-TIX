import { FiPlayCircle } from "react-icons/fi";

import Image from "next/image"

export default function Home() {
    return (
        <main>
            {/* Carousel */}
            <section className="slider">
                <div className="carousel w-full h-full min-h-96 md:min-h-full">
                    <div id="item1" className="carousel-item w-full relative">
                        <Image
                            src="/Bg (Films 1).png"
                            width={1440}
                            height={550}
                            alt="Carousel-1"
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                        <div className="body-text text-center absolute top-0 bottom-0 right-0 left-0 m-auto flex flex-col justify-center items-center ms-0 md:right-auto md:text-start md:items-start md:ms-32 md:max-w-2xl">
                            <h2 className="text-2xl sm:text-4xl md:text-6xl font-inter font-semibold text-third sm:mb-5 md:mb-5">
                                Spider-Man: Into the Spider-Verse
                            </h2>
                            <h4 className="release text-third font-inter font-medium text-base sm:text-xl md:text-2xl">2018</h4>
                        </div>
                    </div>
                </div>
                <div className="absolute md:hidden left-1/2 -translate-x-1/2 mt-[-1.8rem] sm:mt-[-2.5rem] flex items-start gap-2">
                <a href="#item1" className="bg-third px-5 py-1 rounded"></a>
                        <a href="#item2" className="bg-fourth px-5 py-1 rounded hover:bg-primary transition-all ease-in-out"></a>
                        <a href="#item3" className="bg-fourth px-5 py-1 rounded hover:bg-primary transition-all ease-in-out"></a>
                        <a href="#item2" className="bg-fourth px-5 py-1 rounded hover:bg-primary transition-all ease-in-out"></a>
                </div>
                <div className="info w-full h-14">
                    <div className="duration absolute my-3 mx-6 md:ms-14 lg:ms-32 flex item-start">
                        <h5 className="text-sm md:text-xl text-fourth flex align-middle justify-center font-inter font-semibold"><FiPlayCircle className="text-2xl text-third me-2 my-auto" />1 hour 57m <span className="text-third mx-2">|</span>Cartoon, Action, Family</h5>
                    </div>
                    <div className="indicators absolute hidden md:flex left-2/3 sm:left-3/4 md:mt-5 items-start gap-2">
                        <a href="#item1" className="bg-third px-5 py-1 rounded"></a>
                        <a href="#item2" className="bg-fourth px-5 py-1 rounded hover:bg-primary transition-all ease-in-out"></a>
                        <a href="#item3" className="bg-fourth px-5 py-1 rounded hover:bg-primary transition-all ease-in-out"></a>
                        <a href="#item2" className="bg-fourth px-5 py-1 rounded hover:bg-primary transition-all ease-in-out"></a>
                    </div>
                </div>
            </section>
            {/* Carousel */}


        </main>
    )
}
