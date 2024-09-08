import Carousels from "@/components/Carousels";

import Image from "next/image";
import Link from "next/link";

export default function Movies() {

    return (
        <main>
            {/* Carousels */}
            <Carousels />
            {/* Carousels */}

            {/* Movie this Week */}
            <section className="featured-movies bg-primary w-full h-full py-10">
                <div className="head sm:flex content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 mb-2 pb-3 border-b-4 border-third rounded">
                    <h4 className="font-lato font-medium text-center sm:text-start text-3xl"><span className="text-third">Movies</span> This Week</h4>
                    <div className="dropdown dropdown-bottom sm:dropdown-end text-center sm:text-end sm:ms-auto mt-auto font-lato text-third font-medium text-base hover:underline underline-offset-2 transition-all ease-in">
                        <div tabIndex={0} role="button" className="btn btn-ghost">Filter by Genre</div>
                        <ul tabIndex={0} className="dropdown-content menu bg-secondary grid grid-cols-3 rounded-box z-[1] w-96 p-2 shadow">
                            <div className="inline-flex align-middle mt-1">
                                <input type="checkbox" defaultChecked className="checkbox checkbox-xs checkbox-warning border-third border-2" />
                                <span className="label-text font-medium text-fourth ms-2">Action</span>
                            </div>
                            <div className="inline-flex align-middle mt-1">
                                <input type="checkbox" defaultChecked className="checkbox checkbox-xs checkbox-warning border-third border-2" />
                                <span className="label-text font-medium text-fourth ms-2">Family</span>
                            </div>
                            <div className="inline-flex align-middle mt-1">
                                <input type="checkbox" defaultChecked className="checkbox checkbox-xs checkbox-warning border-third border-2" />
                                <span className="label-text font-medium text-fourth ms-2">Scifi</span>
                            </div>
                            <div className="inline-flex align-middle mt-1">
                                <input type="checkbox" defaultChecked className="checkbox checkbox-xs checkbox-warning border-third border-2" />
                                <span className="label-text font-medium text-fourth ms-2">Adventure</span>
                            </div>
                            <div className="inline-flex align-middle mt-1">
                                <input type="checkbox" defaultChecked className="checkbox checkbox-xs checkbox-warning border-third border-2" />
                                <span className="label-text font-medium text-fourth ms-2">Fantasy</span>
                            </div>
                            <div className="inline-flex align-middle mt-1">
                                <input type="checkbox" defaultChecked className="checkbox checkbox-xs checkbox-warning border-third border-2" />
                                <span className="label-text font-medium text-fourth ms-2">Sport</span>
                            </div>
                            <div className="inline-flex align-middle mt-1">
                                <input type="checkbox" defaultChecked className="checkbox checkbox-xs checkbox-warning border-third border-2" />
                                <span className="label-text font-medium text-fourth ms-2">Animation</span>
                            </div>
                            <div className="inline-flex align-middle mt-1">
                                <input type="checkbox" defaultChecked className="checkbox checkbox-xs checkbox-warning border-third border-2" />
                                <span className="label-text font-medium text-fourth ms-2">History</span>
                            </div>
                            <div className="inline-flex align-middle mt-1">
                                <input type="checkbox" defaultChecked className="checkbox checkbox-xs checkbox-warning border-third border-2" />
                                <span className="label-text font-medium text-fourth ms-2">Thriller</span>
                            </div>
                            <div className="inline-flex align-middle mt-1">
                                <input type="checkbox" defaultChecked className="checkbox checkbox-xs checkbox-warning border-third border-2" />
                                <span className="label-text font-medium text-fourth ms-2">Comedy</span>
                            </div>
                            <div className="inline-flex align-middle mt-1">
                                <input type="checkbox" defaultChecked className="checkbox checkbox-xs checkbox-warning border-third border-2" />
                                <span className="label-text font-medium text-fourth ms-2">Crime</span>
                            </div>
                            <div className="inline-flex align-middle mt-1">
                                <input type="checkbox" defaultChecked className="checkbox checkbox-xs checkbox-warning border-third border-2" />
                                <span className="label-text font-medium text-fourth ms-2">Music</span>
                            </div>
                            <div className="inline-flex align-middle mt-1">
                                <input type="checkbox" defaultChecked className="checkbox checkbox-xs checkbox-warning border-third border-2" />
                                <span className="label-text font-medium text-fourth ms-2">Documentary</span>
                            </div>
                            <div className="inline-flex align-middle mt-1">
                                <input type="checkbox" defaultChecked className="checkbox checkbox-xs checkbox-warning border-third border-2" />
                                <span className="label-text font-medium text-fourth ms-2">Mystery</span>
                            </div>
                            <div className="inline-flex align-middle mt-1">
                                <input type="checkbox" defaultChecked className="checkbox checkbox-xs checkbox-warning border-third border-2" />
                                <span className="label-text font-medium text-fourth ms-2">Drama</span>
                            </div>
                            <div className="inline-flex align-middle mt-1">
                                <input type="checkbox" defaultChecked className="checkbox checkbox-xs checkbox-warning border-third border-2" />
                                <span className="label-text font-medium text-fourth ms-2">Romance</span>
                            </div>
                        </ul>
                    </div>
                </div>
                <div className="movies-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-5 md:mx-10 lg:mx-20 gap-5 lg:gap-20 pt-5">
                    <div className="card bg-secondary w-64 lg:w-72 xl:w-64 2xl:w-72 h-full mx-auto shadow-xl">
                        <figure className="relative">
                            <Image
                                src="/Poster Film.png"
                                width={250}
                                height={270}
                                alt="Poster Films"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black opacity-0 hover:opacity-70 transition-opacity duration-300">
                                <p className="text-center font-inter font-bold text-third text-3xl opacity-100">2018</p>
                            </div>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-justify text-third font-inter font-semibold">Spider-Man: Into the Spider-Verse</h2>
                            <div className="duration-price inline-flex text-sm mt-auto">
                                <p className="price">Rp. 30.000,00</p>
                                <p className="text-fourth text-end font-inter font-semibold mb-3"><span className="text-third me-2">|</span> 1 hour 57 m</p>
                            </div>
                            <div className="card-actions justify-end">
                                <Link href="#" className="bg-third py-1 rounded-lg text-black hover:bg-primary hover:text-fourth w-full text-center font-semibold transition-all ease-in-out">Book Ticket</Link>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-secondary w-64 lg:w-72 xl:w-64 2xl:w-72 h-full mx-auto shadow-xl">
                        <figure className="relative">
                            <Image
                                src="/Poster Film-1.png"
                                width={250}
                                height={270}
                                alt="Poster Films"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black opacity-0 hover:opacity-70 transition-opacity duration-300">
                                <p className="text-center font-inter font-bold text-third text-3xl opacity-100">2019</p>
                            </div>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-justify text-third font-inter font-semibold">Joker</h2>
                            <div className="duration-price inline-flex text-sm mt-auto">
                                <p className="price">Rp. 30.000,00</p>
                                <p className="text-fourth text-end font-inter font-semibold mb-3"><span className="text-third me-2">|</span> 2 hour 02 m</p>
                            </div>
                            <div className="card-actions justify-end">
                                <Link href="#" className="bg-third py-1 rounded-lg text-black hover:bg-primary hover:text-fourth w-full text-center font-semibold transition-all ease-in-out">Book Ticket</Link>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-secondary w-64 lg:w-72 xl:w-64 2xl:w-72 h-full mx-auto shadow-xl">
                        <figure className="relative">
                            <Image
                                src="/Poster Film-2.png"
                                width={250}
                                height={270}
                                alt="Poster Films"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black opacity-0 hover:opacity-70 transition-opacity duration-300">
                                <p className="text-center font-inter font-bold text-third text-3xl opacity-100">2017</p>
                            </div>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-justify text-third font-inter font-semibold">Blade-Runner 2049</h2>
                            <div className="duration-price inline-flex text-sm mt-auto">
                                <p className="price">Rp. 30.000,00</p>
                                <p className="text-fourth text-end font-inter font-semibold mb-3"><span className="text-third me-2">|</span> 2 hour 44 m</p>
                            </div>
                            <div className="card-actions justify-end">
                                <Link href="#" className="bg-third py-1 rounded-lg text-black hover:bg-primary hover:text-fourth w-full text-center font-semibold transition-all ease-in-out">Book Ticket</Link>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-secondary w-64 lg:w-72 xl:w-64 2xl:w-72 h-full mx-auto shadow-xl">
                        <figure className="relative">
                            <Image
                                src="/Poster Film-3.png"
                                width={250}
                                height={270}
                                alt="Poster Films"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black opacity-0 hover:opacity-70 transition-opacity duration-300">
                                <p className="text-center font-inter font-bold text-third text-3xl opacity-100">2014</p>
                            </div>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-justify text-third font-inter font-semibold">Interstellar</h2>
                            <div className="duration-price inline-flex text-sm mt-auto">
                                <p className="price">Rp. 30.000,00</p>
                                <p className="text-fourth text-end font-inter font-semibold mb-3"><span className="text-third me-2">|</span> 2 hour 49 m</p>
                            </div>
                            <div className="card-actions justify-end">
                                <Link href="#" className="bg-third py-1 rounded-lg text-black hover:bg-primary hover:text-fourth w-full text-center font-semibold transition-all ease-in-out">Book Ticket</Link>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-secondary w-64 lg:w-72 xl:w-64 2xl:w-72 h-full mx-auto shadow-xl">
                        <figure className="relative">
                            <Image
                                src="/Poster Film.png"
                                width={250}
                                height={270}
                                alt="Poster Films"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black opacity-0 hover:opacity-70 transition-opacity duration-300">
                                <p className="text-center font-inter font-bold text-third text-3xl opacity-100">2018</p>
                            </div>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-justify text-third font-inter font-semibold">Spider-Man: Into the Spider-Verse</h2>
                            <div className="duration-price inline-flex text-sm mt-auto">
                                <p className="price">Rp. 30.000,00</p>
                                <p className="text-fourth text-end font-inter font-semibold mb-3"><span className="text-third me-2">|</span> 1 hour 57 m</p>
                            </div>
                            <div className="card-actions justify-end">
                                <Link href="#" className="bg-third py-1 rounded-lg text-black hover:bg-primary hover:text-fourth w-full text-center font-semibold transition-all ease-in-out">Book Ticket</Link>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-secondary w-64 lg:w-72 xl:w-64 2xl:w-72 h-full mx-auto shadow-xl">
                        <figure className="relative">
                            <Image
                                src="/Poster Film-1.png"
                                width={250}
                                height={270}
                                alt="Poster Films"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black opacity-0 hover:opacity-70 transition-opacity duration-300">
                                <p className="text-center font-inter font-bold text-third text-3xl opacity-100">2019</p>
                            </div>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-justify text-third font-inter font-semibold">Joker</h2>
                            <div className="duration-price inline-flex text-sm mt-auto">
                                <p className="price">Rp. 30.000,00</p>
                                <p className="text-fourth text-end font-inter font-semibold mb-3"><span className="text-third me-2">|</span> 2 hour 02 m</p>
                            </div>
                            <div className="card-actions justify-end">
                                <Link href="#" className="bg-third py-1 rounded-lg text-black hover:bg-primary hover:text-fourth w-full text-center font-semibold transition-all ease-in-out">Book Ticket</Link>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-secondary w-64 lg:w-72 xl:w-64 2xl:w-72 h-full mx-auto shadow-xl">
                        <figure className="relative">
                            <Image
                                src="/Poster Film-2.png"
                                width={250}
                                height={270}
                                alt="Poster Films"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black opacity-0 hover:opacity-70 transition-opacity duration-300">
                                <p className="text-center font-inter font-bold text-third text-3xl opacity-100">2017</p>
                            </div>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-justify text-third font-inter font-semibold">Blade-Runner 2049</h2>
                            <div className="duration-price inline-flex text-sm mt-auto">
                                <p className="price">Rp. 30.000,00</p>
                                <p className="text-fourth text-end font-inter font-semibold mb-3"><span className="text-third me-2">|</span> 2 hour 44 m</p>
                            </div>
                            <div className="card-actions justify-end">
                                <Link href="#" className="bg-third py-1 rounded-lg text-black hover:bg-primary hover:text-fourth w-full text-center font-semibold transition-all ease-in-out">Book Ticket</Link>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-secondary w-64 lg:w-72 xl:w-64 2xl:w-72 h-full mx-auto shadow-xl">
                        <figure className="relative">
                            <Image
                                src="/Poster Film-3.png"
                                width={250}
                                height={270}
                                alt="Poster Films"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black opacity-0 hover:opacity-70 transition-opacity duration-300">
                                <p className="text-center font-inter font-bold text-third text-3xl opacity-100">2014</p>
                            </div>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-justify text-third font-inter font-semibold">Interstellar</h2>
                            <div className="duration-price inline-flex text-sm mt-auto">
                                <p className="price">Rp. 30.000,00</p>
                                <p className="text-fourth text-end font-inter font-semibold mb-3"><span className="text-third me-2">|</span> 2 hour 49 m</p>
                            </div>
                            <div className="card-actions justify-end">
                                <Link href="#" className="bg-third py-1 rounded-lg text-black hover:bg-primary hover:text-fourth w-full text-center font-semibold transition-all ease-in-out">Book Ticket</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Movie this Week */}

            {/* Coming Soon */}
            <section className="coming-soon bg-primary w-full h-full py-10">
                <div className="head sm:flex content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 mb-2 pb-3 border-b-4 border-third rounded">
                    <h4 className="font-lato font-medium text-center sm:text-start text-3xl"><span className="text-third">Movies</span> Coming soon</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-20 pt-5">
                    <div className="card bg-base-100 w-80 2xl:w-96  shadow-xl mx-auto">
                        <figure>
                            <Image 
                               src="/Coming-soon-1.png"
                               width={350}
                               height={200}
                               alt="Coming soon Poster Films"
                               className="w-full h-full object-cover"
                               loading="lazy" 
                            />
                        </figure>
                        <div className="card-body absolute">
                            <h2 className="card-title mt-20 2xl:mt-28 text-xl 2xl:text-2xl font-inter text-third">Descicable Me 6: Homeless</h2>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-80 2xl:w-96  shadow-xl mx-auto">
                        <figure>
                            <Image 
                               src="/Coming-soon-2.png"
                               width={350}
                               height={200}
                               alt="Coming soon Poster Films"
                               className="w-full h-full object-cover"
                               loading="lazy" 
                            />
                        </figure>
                        <div className="card-body absolute">
                            <h2 className="card-title mt-20 2xl:mt-28 text-xl 2xl:text-2xl font-inter text-third">Spider-man: Dont Have Home</h2>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-80 2xl:w-96  shadow-xl mx-auto">
                        <figure>
                            <Image 
                               src="/Coming-soon-3.png"
                               width={350}
                               height={200}
                               alt="Coming soon Poster Films"
                               className="w-full h-full object-cover"
                               loading="lazy" 
                            />
                        </figure>
                        <div className="card-body absolute">
                            <h2 className="card-title mt-20 2xl:mt-28 text-xl 2xl:text-2xl font-inter text-third">Deadpool Go to School</h2>
                        </div>
                    </div>
                </div>
            </section>
            {/* Coming Soon */}
        </main>
    )
}