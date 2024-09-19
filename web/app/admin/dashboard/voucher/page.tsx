export default function Voucher() {

    return (
        <div className="py-10">
            <div className="card bg-secondary text-neutral-content w-4/5 lg:w-2/4 mx-auto my-10">
                <div className="card-body">
                    <div className="head md:mx-10 mb-2 pb-3 border-b-4 border-third rounded">
                        <h4 className="font-lato font-semibold text-center sm:text-start text-3xl text-third">
                            Create a Voucher
                        </h4>
                    </div>
                    <div className="body md:mx-10">
                        <form className="flex flex-col">
                            {/* Voucher Id */}
                            <div className="voucher flex flex-col mb-4">
                                <label
                                    className="font-inter font-medium text-xl text-third pb-2"
                                    htmlFor=""
                                >
                                    Voucher ID
                                </label>
                                <input
                                    className="input bg-primary border-fourth focus:border-third border-1 rounded-lg"
                                    id="voucher"
                                    type="text"
                                    placeholder="Voucher ID"
                                />
                            </div>
                            {/* Voucher Id */}

                            {/* Discount */}
                            <div className="discount flex flex-col mb-4">
                                <label
                                    className="font-inter font-medium text-xl text-third pb-2"
                                    htmlFor=""
                                >
                                    Discount
                                </label>
                                <input
                                    className="input bg-primary border-fourth focus:border-third border-1 rounded-lg"
                                    id="discount"
                                    type="text"
                                    placeholder="Discount"
                                />
                            </div>
                            {/* Discount */}

                            {/* Availability */}
                            <div className="availability flex flex-col mb-4">
                                <label
                                    className="font-inter font-medium text-xl text-third pb-2"
                                    htmlFor=""
                                >
                                    Availability
                                </label>
                                <input
                                    className="input bg-primary border-fourth focus:border-third border-1 rounded-lg"
                                    id="availability"
                                    type="number"
                                    placeholder="Availability"
                                />
                            </div>
                            {/* Availability */}

                            {/* Expiration Date */}
                            <div className="expired flex flex-col mb-4">
                                <label
                                    className="font-inter font-medium text-xl text-third pb-2"
                                    htmlFor=""
                                >
                                    Expired
                                </label>
                                <input
                                    className="input bg-primary border-fourth focus:border-third border-1 rounded-lg"
                                    type="date"
                                    id="date"
                                />
                            </div>
                            {/* Expiration Date */}

                            <button
                                className="btn btn-md w-full font-inter font-semibold text-base bg-third text-primary hover:bg-primary hover:text-third rounded-lg"
                                type="submit"
                                form="cinemaForm"
                            >
                                Create Voucher
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}