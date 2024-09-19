import Link from "next/link";

export default function HighAdmin() {
  // const [adminNum, setAdminNum] = useState<Admin[]>([]);

  // useEffect(() => {
  //   async function getAdmin() {
  //     try {
  //       const movie = await fetch(
  //         `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/v1/admins/search`,
  //         {
  //           credentials: "include",
  //         }
  //       );
  //       const data = await movie.json();
  //       setAdminNum(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   getAdmin();
  // }, []);
  // console.log(adminNum);

  return (
    <main className="bg-primary">
      {/* Head SuperAdmin */}
      <section className="head-admin sm:flex content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 mb-2 py-10 pb-3 border-b-4 border-third rounded">
        <h4 className="font-lato font-medium text-center sm:text-start text-3xl text-third">
          Dashboard High Admin
        </h4>
      </section>
      {/* Head SuperAdmin */}

      {/* Count Dashboard */}
      <section className="count content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 mb-7 mt-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
          <div className="card bg-secondary w-52 sm:w-64 lg:w-52 2xl:w-72 mx-auto">
            <div className="card-body">
              <h2 className="card-title font-inter text-4xl text-center xl:text-start font-semibold text-third mx-auto xl:mx-0">
                4
              </h2>
              <p className="font-inter text-xl text-center xl:text-start font-medium text-fourth">
                Number of Admin
              </p>
            </div>
          </div>
          <div className="card bg-secondary w-52 sm:w-64 lg:w-52 2xl:w-72 mx-auto">
            <div className="card-body">
              <h2 className="card-title font-inter text-4xl text-center xl:text-start font-semibold text-third mx-auto xl:mx-0">
                4
              </h2>
              <p className="font-inter text-xl text-center xl:text-start font-medium text-fourth">
                Number of Manager
              </p>
            </div>
          </div>
          <div className="card bg-secondary w-52 sm:w-64 lg:w-52 2xl:w-72 mx-auto">
            <div className="card-body">
              <h2 className="card-title font-inter text-4xl text-center xl:text-start font-semibold text-third mx-auto xl:mx-0">
                6
              </h2>
              <p className="font-inter text-xl text-center xl:text-start font-medium text-fourth">
                Number of Cinema
              </p>
            </div>
          </div>
          <div className="card bg-secondary w-52 sm:w-64 lg:w-52 2xl:w-72 mx-auto">
            <div className="card-body">
              <h2 className="card-title font-inter text-4xl text-center xl:text-start font-semibold text-third mx-auto xl:mx-0">
                24
              </h2>
              <p className="font-inter text-xl text-center xl:text-start font-medium text-fourth">
                Number of Film
              </p>
            </div>
          </div>
          <div className="card bg-secondary w-52 sm:w-64 lg:w-52 2xl:w-72 mx-auto">
            <div className="card-body">
              <h2 className="card-title font-inter text-4xl text-center xl:text-start font-semibold text-third mx-auto xl:mx-0">
                3
              </h2>
              <p className="font-inter text-xl text-center xl:text-start font-medium text-fourth">
                Number of User
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Count Dashboard */}

      {/* Table List */}
      <section className="table-dashboard content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Table Admin */}
          <div className="bg-secondary p-7 rounded-2xl">
            <h4 className="font-lato font-medium text-center sm:text-start text-3xl pb-2 mb-2 text-third border-b-4 border-third rounded">
              Admin List
            </h4>
            <div className="button-add-delete flex">
              <button className="btn btn-sm bg-third text-primary hover:bg-primary hover:text-third font-inter font-semibold">
                Add Admin
              </button>
              {/* <button className="btn btn-sm ms-auto bg-primary text-third hover:bg-third hover:text-primary font-inter font-semibold">Delete Admin</button> */}
            </div>
            <div className="admin overflow-x-auto mt-3">
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
                    <th>admin-001</th>
                    <td>Admin 1</td>
                    <td>admin@1.com</td>
                  </tr>
                  {/* row 2 */}
                  <tr className="hover">
                    <th>admin-002</th>
                    <td>Admin 2</td>
                    <td>admin@2.com</td>
                  </tr>
                  {/* row 3 */}
                  <tr className="hover">
                    <th>admin-003</th>
                    <td>Admin 3</td>
                    <td>admin@3.com</td>
                  </tr>
                  {/* row 4 */}
                  <tr className="hover">
                    <th>admin-004</th>
                    <td>Admin 4</td>
                    <td>admin@4.com</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* Table Admin */}

          {/* Table Manager */}
          <div className="bg-secondary p-7 rounded-2xl">
            <h4 className="font-lato font-medium text-center sm:text-start text-3xl pb-2 mb-2 text-third border-b-4 border-third rounded">
              Manager List
            </h4>
            <div className="button-add-delete flex">
              <button className="btn btn-sm bg-third text-primary hover:bg-primary hover:text-third font-inter font-semibold">
                Add Manager
              </button>
              {/* <button className="btn btn-sm ms-auto bg-primary text-third hover:bg-third hover:text-primary font-inter font-semibold">Delete Manager</button> */}
            </div>
            <div className="manager overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Cinema ID</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr className="hover">
                    <th>manager-001</th>
                    <td>Manager 1</td>
                    <td>Cinema 1</td>
                    <td>manager@1.com</td>
                  </tr>
                  {/* row 2 */}
                  <tr className="hover">
                    <th>manager-002</th>
                    <td>Manager 2</td>
                    <td>Cinema 2</td>
                    <td>manager@2.com</td>
                  </tr>
                  {/* row 3 */}
                  <tr className="hover">
                    <th>manager-003</th>
                    <td>Manager 3</td>
                    <td>Cinema 3</td>
                    <td>manager@3.com</td>
                  </tr>
                  {/* row 4 */}
                  <tr className="hover">
                    <th>manager-004</th>
                    <td>Manager 4</td>
                    <td>Cinema 4</td>
                    <td>manager@4.com</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* Table Manager */}
        </div>
      </section>
      {/* Table List */}
    </main>
  );
}
