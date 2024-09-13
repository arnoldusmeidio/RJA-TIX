export default function Help() {

    return (
        <main>
            {/* Hero Section */}
            <section className="hero bg-gradient-to-b from-sixth to-primary">
                <div className="hero min-h-96">
                    <div className="hero-content text-center">
                        <div className="body-text text-center absolute right-0 left-0 m-auto flex flex-col justify-center items-center ms-0 md:right-auto md:text-start md:items-start md:ms-32 md:max-w-2xl">
                            <h2 className="text-3xl sm:text-4xl md:text-6xl font-inter font-semibold text-third">
                                All Offers in <br /><span className="text-fourth">Check on below</span>
                            </h2>
                            <p className=" font-inter font-medium text-xl md:text-2xl text-fourth">
                                Want to see <span className="text-third">FAQ</span> and need <span className="text-third">Helps</span>, check this page.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Hero Section */}

            {/* FAQ */}
            <section className="faq bg-primary w-full h-full py-5">
                <div className="head content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 mb-5 pb-3 border-b-4 border-third rounded">
                    <h4 className="font-lato font-medium text-center sm:text-start text-3xl text-third">FAQ & Helps</h4>
                </div>
                <div className="faq mx-7 sm:mx-20 md:mx-10 lg:mx-20 text-fourth">
                    <div className="collapse collapse-plus bg-secondary rounded-2xl mb-4">
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-medium">How do I create an account on RJA.TIX?</div>
                        <div className="collapse-content">
                            <p>To create an account, simply click on the "Sign Up" button on our homepage and follow the on-screen instructions. You will need to provide your email address and create a password.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-plus bg-secondary rounded-2xl mb-4">
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-medium">How to book a ticket?</div>
                        <div className="collapse-content">
                            <p>After logging in, you can choose the movie you want to watch on the home or movies page. Then, you can select the showtime and choose your seats. After that, you can proceed to the payment page and once it's completed, you can check your ticket in your account dashboard.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-plus bg-secondary rounded-2xl mb-4">
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-medium">How to use a promo code?</div>
                        <div className="collapse-content">
                            <p>First, you can check the available promos on the "Offers" page, and then copy the promo code from there.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-plus bg-secondary rounded-2xl mb-4">
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-medium">How to see my referral code?</div>
                        <div className="collapse-content">
                            <p>You can find your referral code on your profile dashboard.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-plus bg-secondary rounded-2xl mb-4">
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-medium">Are there any benefits if you provide and use a referral code?</div>
                        <div className="collapse-content">
                            <p>For those who use someone else's referral code, you will get a voucher, while people who provide the referral code will get points. These vouchers or points can later be used as discounts to pay for movie tickets</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* FAQ */}

            {/* Helps */}
            <section className="hero bg-primary w-full h-full px-5 md:px-20 mb-10">
                <div className="hero-content min-w-full bg-secondary flex-col lg:flex-row gap-10 rounded-2xl py-10">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl sm:text-5xl font-inter font-semibold">Have a <span className="text-third">problems</span> with <span className="text-third">ordering tickets?</span></h1>
                        <p className="lg:max-w-md text-xl font-inter text-fourth py-6">
                            Are you encountering any issues while booking your tickets?
                        </p>
                    </div>
                    <div className="card bg-primary w-full max-w-xl shrink-0 shadow-2xl">
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="name" placeholder="Your name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Topic</span>
                                </label>
                                <input type="text" placeholder="Topic" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Message</span>
                                </label>
                                <textarea className="textarea textarea-bordered" placeholder="Your message"></textarea>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-third text-primary font-lato font-bold text-base hover:text-third hover:bg-secondary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            {/* Helps */}
        </main>
    )
}