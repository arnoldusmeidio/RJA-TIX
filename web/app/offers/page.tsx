import Image from "next/image"

export default function Offers() {

    return (
        <main>
            {/* Hero Section */}
            <section className="hero bg-gradient-to-b from-sixth to-primary">
                <div className="hero min-h-96">
                    <div className="hero-content text-center">
                        <div className="body-text text-center absolute right-0 left-0 m-auto flex flex-col justify-center items-center ms-0 md:right-auto md:text-start md:items-start md:ms-32 md:max-w-2xl">
                            <h2 className="text-3xl sm:text-4xl md:text-6xl font-inter font-semibold text-fourth ">
                                All Offers in <br /><span className="text-third">RJA.TIX</span>
                            </h2>
                            <p className=" font-inter font-medium text-xl md:text-2xl text-fourth">
                                See all about <span className="text-third">Discount</span> & <span className="text-third">Promotions</span> here.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Hero Section */}

            {/* Types Studio */}
            <section className="type-studios bg-primary w-full h-full py-10">
                <div className="head sm:flex content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 mb-2 pb-3 border-b-4 border-third rounded">
                    <h4 className="font-lato font-medium text-center sm:text-start text-3xl">All <span className="text-third">Discount & Promotions</span></h4>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 lg:gap-20 pt-5">
                    <div className="card bg-base-100 w-10/12 md:w-9/12 min-h-20 shadow-xl mx-auto">
                        <figure>
                            <Image
                                src="/Starium.png"
                                width={550}
                                height={250}
                                alt="Coming soon Poster Films"
                                className="w-full min-h-40 object-cover"
                            />
                        </figure>
                        <div className="card-body p-3 sm:p-7">
                            <div className="info-cinemas mx-auto">
                                <h4 className="text-third name text-base sm:text-2xl inline-flex text-center">Starium</h4>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-10/12 md:w-9/12 min-h-20 shadow-xl mx-auto">
                        <figure>
                            <Image
                                src="/Starium.png"
                                width={550}
                                height={250}
                                alt="Coming soon Poster Films"
                                className="w-full min-h-40 object-cover"
                            />
                        </figure>
                        <div className="card-body p-3 sm:p-7">
                            <div className="info-cinemas mx-auto">
                                <h4 className="text-third name text-base sm:text-2xl inline-flex text-center">Private Box</h4>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-10/12 md:w-9/12 min-h-20 shadow-xl mx-auto">
                        <figure>
                            <Image
                                src="/Starium.png"
                                width={550}
                                height={250}
                                alt="Coming soon Poster Films"
                                className="w-full min-h-40 object-cover"
                            />
                        </figure>
                        <div className="card-body p-3 sm:p-7">
                            <div className="info-cinemas mx-auto">
                                <h4 className="text-third name text-base sm:text-2xl inline-flex text-center">Gold Class</h4>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-10/12 md:w-9/12 min-h-20 shadow-xl mx-auto">
                        <figure>
                            <Image
                                src="/Starium.png"
                                width={550}
                                height={250}
                                alt="Coming soon Poster Films"
                                className="w-full min-h-40 object-cover"
                            />
                        </figure>
                        <div className="card-body p-3 sm:p-7">
                            <div className="info-cinemas mx-auto">
                                <h4 className="text-third name text-base sm:text-2xl inline-flex text-center">4DX</h4>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-10/12 md:w-9/12 min-h-20 shadow-xl mx-auto">
                        <figure>
                            <Image
                                src="/Starium.png"
                                width={550}
                                height={250}
                                alt="Coming soon Poster Films"
                                className="w-full min-h-40 object-cover"
                            />
                        </figure>
                        <div className="card-body p-3 sm:p-7">
                            <div className="info-cinemas mx-auto">
                                <h4 className="text-third name text-base sm:text-2xl inline-flex text-center">Sphere</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Types Studio */}
        </main>
    )
}