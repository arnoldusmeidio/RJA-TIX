import Link from "next/link"

export default function Manager() {

    return (
        <main className="bg-primary">
            {/* Head SuperAdmin */}
            <section className="head-admin sm:flex content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 mb-2 py-10 pb-3 border-b-4 border-third rounded">
                <h4 className="font-lato font-medium text-center sm:text-start text-3xl text-third">
                    Dashboard Manager
                </h4>
            </section>
            {/* Head SuperAdmin */}

            {/* Count Dashboard */}
            <section className="count content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 mb-7 mt-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
                    <div className="card bg-secondary w-52 sm:w-64 lg:w-52 2xl:w-72 mx-auto">
                        <div className="card-body">
                            <h2 className="card-title font-inter text-4xl text-center xl:text-start font-semibold text-third mx-auto xl:mx-0">4</h2>
                            <p className="font-inter text-xl text-center xl:text-start font-medium text-fourth">Number of Admin</p>
                        </div>
                    </div>
                    <div className="card bg-secondary w-52 sm:w-64 lg:w-52 2xl:w-72 mx-auto">
                        <div className="card-body">
                            <h2 className="card-title font-inter text-4xl text-center xl:text-start font-semibold text-third mx-auto xl:mx-0">4</h2>
                            <p className="font-inter text-xl text-center xl:text-start font-medium text-fourth">Number of Manager</p>
                        </div>
                    </div>
                    <div className="card bg-secondary w-52 sm:w-64 lg:w-52 2xl:w-72 mx-auto">
                        <div className="card-body">
                            <h2 className="card-title font-inter text-4xl text-center xl:text-start font-semibold text-third mx-auto xl:mx-0">6</h2>
                            <p className="font-inter text-xl text-center xl:text-start font-medium text-fourth">Number of Cinema</p>
                        </div>
                    </div>
                    <div className="card bg-secondary w-52 sm:w-64 lg:w-52 2xl:w-72 mx-auto">
                        <div className="card-body">
                            <h2 className="card-title font-inter text-4xl text-center xl:text-start font-semibold text-third mx-auto xl:mx-0">24</h2>
                            <p className="font-inter text-xl text-center xl:text-start font-medium text-fourth">Number of Film</p>
                        </div>
                    </div>
                    <div className="card bg-secondary w-52 sm:w-64 lg:w-52 2xl:w-72 mx-auto">
                        <div className="card-body">
                            <h2 className="card-title font-inter text-4xl text-center xl:text-start font-semibold text-third mx-auto xl:mx-0">3</h2>
                            <p className="font-inter text-xl text-center xl:text-start font-medium text-fourth">Number of User</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Count Dashboard */}

            {/* Table List */}
            <section className="table-dashboard content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 mb-20">
                <div className="grid grid-cols-1 gap-10">
                    
                    {/* Table Film */}
                    <div className="bg-secondary p-7 rounded-2xl">
                        <h4 className="font-lato font-medium text-center sm:text-start text-3xl pb-2 mb-2 text-third border-b-4 border-third rounded">
                            Movie List
                        </h4>
                        <div className="button-add-delete flex">
                            <Link href="/manager/dashboard/showtime"><button className="btn btn-sm bg-third text-primary hover:bg-primary hover:text-third font-inter font-semibold">Add Movie</button></Link> 
                            {/* <button className="btn btn-sm ms-auto bg-primary text-third hover:bg-third hover:text-primary font-inter font-semibold">Delete Movie</button> */}
                        </div>
                        <div className="cinema overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Title</th>
                                        <th>Director</th>
                                        <th>Genre</th>
                                        <th>Synopsis</th>
                                        <th>Rated</th>
                                        <th>Duartion</th>
                                        <th>Release Year</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    <tr className="hover">
                                        <th>1</th>
                                        <td>Twister</td>
                                        <td>Lee Isca Chung</td>
                                        <th>Action</th>
                                        <td>Kate Carter bekerja di Oklahoma bersama teman-teman pemburu badainya Javi Addy  Praveen, dan pacarnya, Jeb. Bersama dengan Doppler Dorothy V, tim tersebut meluncurkan barel manik-manik natrium poliakrilat ke tornado dengan harapan dapat mengurangi intensitasnya dan mengamankan pendanaan untuk penelitian lebih lanjut.</td>
                                        <td>PG_13</td>
                                        <th>122</th>
                                        <td>2024</td>
                                    </tr>
                                    {/* row 2 */}
                                    <tr className="hover">
                                        <th>2</th>
                                        <td>Godzilla X Kong</td>
                                        <td>Adam Wingard</td>
                                        <th>Action</th>
                                        <td>Film ini berlatar belakang dunia yang damai setelah pertarungan terakhir antara Godzilla dan Kong. Film dimulai dengan adegan Kong yang berburu monster lain yang bernama Wartdogs. Sementara Dr. Ilene Andrews sedang bekerja untuk memisahkan Godzilla dan Kong. Di tempat lain Godzilla mempertahankan kekuasaannya dengan membunuh monster yang menyebabkan kekacauan.</td>
                                        <td>PG_13</td>
                                        <th>115</th>
                                        <td>2024</td>
                                    </tr>
                                    {/* row 3 */}
                                    <tr className="hover">
                                        <th>3</th>
                                        <td>Damsel</td>
                                        <td>Juan Carlos</td>
                                        <th>Action</th>
                                        <td>Elodie merupakan seorang bangsawan yang terperangkap di kehidupannya sendiri. Elodie sudah memiliki garis tangan masa depan yang sudah dituliskan oleh orang tuanya. Sang putri mesti menikahi seorang pangeran tampan yang mau tak mau dia setujui. Pangeran tampan yang bakal menjadi suaminya kelak itu bernama Henry. Ia merupakan anak dari Sang Raja (Ray Winstone) dan Ratu Isabelle. Elodie pun dipertemukan dengan Henry dan keduanya hubungan mereka mulai terjalin. Hingga akhirnya keduanya pun sepakat untuk menikah.</td>
                                        <td>PG_13</td>
                                        <th>110</th>
                                        <td>2024</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Table Film */}
                </div>
            </section>
            {/* Table List */}
        </main>
    )
}