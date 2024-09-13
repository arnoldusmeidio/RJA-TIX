import Link from "next/link"
import Image from "next/image"

export default function Profile() {

    return (
        <main>
            {/* Profile Dashboard */}
            <section className="profile bg-primary w-full h-full py-10">
                <div className="head sm:flex content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 mb-2 pb-3 border-b-4 border-third rounded">
                    <h4 className="font-lato font-medium text-center sm:text-start text-3xl text-third">Dashboard</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 content-center items-center mx-auto sm:mx-20 md:mx-10 lg:mx-40 gap-10 mt-20">
                    <div className="profile avatar mx-auto">
                        <div className="w-72 rounded-full">
                            <Image
                                src="/user.png"
                                width={512}
                                height={512}
                                alt="User Profile"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-20">
                        <div className="name content-center ">
                            <h5 className="text-base sm:text-xl text-center md:text-start font-inter font-semibold text-fourth">Name:</h5>
                            <h6 className="text-xl sm:text-3xl text-center md:text-start font-inter font-semibold text-third">Jovi Rachman</h6>
                        </div>
                        <div className="referral content-center ">
                            <h5 className="text-base sm:text-xl text-center md:text-start font-inter font-semibold text-fourth">Referral Code:</h5>
                            <h6 className="text-xl sm:text-3xl text-center md:text-start font-inter font-semibold text-third">123fgb566yg</h6>
                        </div>
                        <div className="email content-center ">
                            <h5 className="text-base sm:text-xl text-center md:text-start font-inter font-semibold text-fourth">Email:</h5>
                            <h6 className="text-xl sm:text-3xl text-center md:text-start font-inter font-semibold text-third">jovirachman@gmail.com</h6>
                        </div>
                    </div>
                </div>
            </section>
            {/* Profile Dashboard */}

            {/* Watched Movies */}
            <section className="watched bg-primary w-full h-full mb-20">
                <div className="head sm:flex content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 mb-2 pb-3 border-b-4 border-third rounded">
                    <h4 className="font-lato font-medium text-center sm:text-start text-3xl text-third">Watched Movies</h4>
                </div>
            </section>
            {/* Watched Movies */}

            {/* My Tickets */}
            <section className="ticket bg-primary w-full h-full mb-20">
                <div className="head sm:flex content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 mb-2 pb-3 border-b-4 border-third rounded">
                    <h4 className="font-lato font-medium text-center sm:text-start text-3xl text-third">My Tickets</h4>
                </div>
            </section>
            {/* My Tickets */}
        </main>
    )
}