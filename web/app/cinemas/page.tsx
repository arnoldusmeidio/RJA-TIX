import Image from "next/image";
import Link from "next/link";

import { BiSolidCameraMovie } from "react-icons/bi"; 

export default function Cinemas() {

    return (
        <main>
            {/* Carousel Cinemas */}
            <section className="slider">
                <div className="carousel w-full h-full min-h-96 md:min-h-full">
                    <div id="item1" className="carousel-item w-full relative">
                        <Image
                            src="/Private Box.png"
                            width={1440}
                            height={550}
                            alt="Carousel-1"
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                        <div className="body-text text-center absolute top-0 bottom-0 right-0 left-0 m-auto flex flex-col justify-center items-center ms-0 md:right-auto md:text-start md:items-start md:ms-32 md:max-w-2xl">
                            <h2 className="text-2xl sm:text-4xl md:text-6xl font-inter font-semibold text-third sm:mb-5 md:mb-5">
                                Private Box
                            </h2>
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
                        <h5 className="text-sm md:text-xl text-fourth flex align-middle justify-center font-inter font-semibold"><BiSolidCameraMovie className="text-2xl text-third me-2 my-auto" />See Cinemas</h5>
                    </div>
                    <div className="indicators absolute hidden md:flex left-2/3 sm:left-3/4 md:mt-5 items-start gap-2">
                        <a href="#item1" className="bg-third px-5 py-1 rounded"></a>
                        <a href="#item2" className="bg-fourth px-5 py-1 rounded hover:bg-primary transition-all ease-in-out"></a>
                        <a href="#item3" className="bg-fourth px-5 py-1 rounded hover:bg-primary transition-all ease-in-out"></a>
                        <a href="#item2" className="bg-fourth px-5 py-1 rounded hover:bg-primary transition-all ease-in-out"></a>
                    </div>
                </div>
            </section>
            {/* Carousel Cinemas */}

            {/* Types Studio */}
            <section className="type-studios bg-primary w-full h-full py-10">
                <div className="head sm:flex content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 mb-2 pb-3 border-b-4 border-third rounded">
                    <h4 className="font-lato font-medium text-center sm:text-start text-3xl">All <span className="text-third">Types Studio</span></h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-20 pt-5">
                    <div className="card bg-base-100 w-7/12  shadow-xl mx-auto">
                        <figure>
                            <Image 
                               src="/Starium.png"
                               width={550}
                               height={250}
                               alt="Coming soon Poster Films"
                               className="w-full h-full object-cover"
                               loading="lazy" 
                            />
                        </figure>
                        <div className="card-body">
                            <div className="info-cinemas mx-auto">
                                <Link href="/cinemas/starium" className="text-third hover:text-fourth name text-2xl inline-flex mx-auto">Starium</Link>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-7/12  shadow-xl mx-auto">
                        <figure>
                            <Image 
                               src="/Private Box 2.png"
                               width={550}
                               height={250}
                               alt="Coming soon Poster Films"
                               className="w-full h-full object-cover"
                               loading="lazy" 
                            />
                        </figure>
                        <div className="card-body">
                            <div className="info-cinemas mx-auto">
                                <Link href="/cinemas/private-box" className="text-third hover:text-fourth name text-2xl inline-flex mx-auto">Private Box</Link>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-7/12  shadow-xl mx-auto">
                        <figure>
                            <Image 
                               src="/Gold Class.png"
                               width={550}
                               height={250}
                               alt="Coming soon Poster Films"
                               className="w-full h-full object-cover"
                               loading="lazy" 
                            />
                        </figure>
                        <div className="card-body">
                            <div className="info-cinemas mx-auto">
                                <Link href="/cinemas/gold-class" className="text-third hover:text-fourth name text-2xl inline-flex mx-auto">Gold Class</Link>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-7/12  shadow-xl mx-auto">
                        <figure>
                            <Image 
                               src="/4DX.png"
                               width={550}
                               height={250}
                               alt="Coming soon Poster Films"
                               className="w-full h-full object-cover"
                               loading="lazy" 
                            />
                        </figure>
                        <div className="card-body">
                            <div className="info-cinemas mx-auto">
                                <Link href="/cinemas/four-dx" className="text-third hover:text-fourth name text-2xl inline-flex mx-auto">4DX</Link>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-7/12  shadow-xl mx-auto">
                        <figure>
                            <Image 
                               src="/Sphere.png"
                               width={550}
                               height={250}
                               alt="Coming soon Poster Films"
                               className="w-full h-full object-cover"
                               loading="lazy" 
                            />
                        </figure>
                        <div className="card-body">
                            <div className="info-cinemas mx-auto">
                                <Link href="/cinemas/sphere" className="text-third hover:text-fourth name text-2xl inline-flex mx-auto">Sphere</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Types Studio */}
        </main>
    )
}