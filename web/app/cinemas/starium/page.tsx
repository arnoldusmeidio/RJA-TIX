export default function Starium() {

    return (
        <main>
            {/* Hero Section */}
            <section className="hero bg-gradient-to-b from-sixth to-primary">
                <div className="hero min-h-96">
                    <div className="hero-content text-center">
                        <div className="body-text text-center absolute right-0 left-0 m-auto flex flex-col justify-center items-center ms-0 md:right-auto md:text-start md:items-start md:ms-32 md:max-w-2xl">
                            <h2 className="text-3xl sm:text-4xl md:text-6xl font-inter font-semibold text-third">
                                Starium
                            </h2>
                            <p className=" font-inter font-medium text-xl md:text-2xl text-third">
                                Locations <span className="text-fourth">about cinemas</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Hero Section */}

            {/* Tables Location */}
            <section className="location bg-primary w-full h-full py-10">
                <div className="head sm:flex content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 mb-2 pb-3 border-b-4 border-third rounded">
                    <h4 className="font-lato font-medium text-center sm:text-start text-3xl text-third">Locations</h4>
                </div>
                <div className="overflow-x-auto content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr className="hover">
                                <th>1.</th>
                                <td>Plaza Indonesia</td>
                            </tr>
                            {/* row 2 */}
                            <tr className="hover">
                                <th>2.</th>
                                <td>Senayan City</td>
                            </tr>
                            {/* row 3 */}
                            <tr className="hover">
                                <th>3.</th>
                                <td>Mall Of Indonesia</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            {/* Tables Location */}
        </main>
    )
}