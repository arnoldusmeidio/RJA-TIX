export default function Admin() {

    return (
        <main className="bg-primary">
            {/* Head SuperAdmin */}
            <section className="head-admin sm:flex content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 mb-2 py-10 pb-3 border-b-4 border-third rounded">
                <h4 className="font-lato font-medium text-center sm:text-start text-3xl text-third">
                    Dashboard Admin
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Table Manager */}
                    <div className="bg-secondary p-7 rounded-2xl">
                        <h4 className="font-lato font-medium text-center sm:text-start text-3xl pb-2 mb-2 text-third border-b-4 border-third rounded">
                            Manager List
                        </h4>
                        <div className="button-add-delete flex">
                            <button className="btn btn-sm bg-third text-primary hover:bg-primary hover:text-third font-inter font-semibold">Add Manager</button>
                            <button className="btn btn-sm ms-5 bg-third text-primary hover:bg-primary hover:text-third font-inter font-semibold">Select Manager</button>
                            {/* <button className="btn btn-sm ms-auto bg-primary text-third hover:bg-third hover:text-primary font-inter font-semibold">Delete Manager</button> */}
                        </div>
                        <div className="manager overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>User ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    <tr className="hover">
                                        <th>manager-001</th>
                                        <td>Manager 1</td>
                                        <td>manager@1.com</td>
                                    </tr>
                                    {/* row 2 */}
                                    <tr className="hover">
                                        <th>manager-002</th>
                                        <td>Manager 2</td>
                                        <td>manager@2.com</td>
                                    </tr>
                                    {/* row 3 */}
                                    <tr className="hover">
                                        <th>manager-003</th>
                                        <td>Manager 3</td>
                                        <td>manager@3.com</td>
                                    </tr>
                                    {/* row 4 */}
                                    <tr className="hover">
                                        <th>manager-004</th>
                                        <td>Manager 4</td>
                                        <td>manager@4.com</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Table Manager */}

                    {/* Table Cinema */}
                    <div className="bg-secondary p-7 rounded-2xl">
                        <h4 className="font-lato font-medium text-center sm:text-start text-3xl pb-2 mb-2 text-third border-b-4 border-third rounded">
                            Cinema List
                        </h4>
                        <div className="cinema overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Location</th>
                                        <th>Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    <tr className="hover">
                                        <th>1</th>
                                        <td>Plaza Indonesia</td>
                                        <td>Jl. M.H. Thamrin</td>
                                    </tr>
                                    {/* row 2 */}
                                    <tr className="hover">
                                        <th>2</th>
                                        <td>Mall of Indonesian</td>
                                        <td>Jl. Boulevard Bar. Raya</td>
                                    </tr>
                                    {/* row 3 */}
                                    <tr className="hover">
                                        <th>3</th>
                                        <td>Blok M Plaza</td>
                                        <td>Jl. Bulungan</td>
                                    </tr>
                                    {/* row 4 */}
                                    <tr className="hover">
                                        <th>4</th>
                                        <td>Plaza Semanggi</td>
                                        <td>Jl. Jend. Sudirman</td>
                                    </tr>
                                    {/* row 5 */}
                                    <tr className="hover">
                                        <th>5</th>
                                        <td>Senayan City</td>
                                        <td>Jl. Asia Afrika</td>
                                    </tr>
                                    {/* row 6 */}
                                    <tr className="hover">
                                        <th>6</th>
                                        <td>AEON BSD</td>
                                        <td>Jl. BSD Raya Utama</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Table Cinema */}
                </div>
            </section>
            {/* Table List */}
        </main>
    )
}