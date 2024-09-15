"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { User } from "@/types";

export default function Profile() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function getUser() {
      try {
        const movie = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/v1/users`,
          {
            credentials: "include",
          }
        );
        const data = await movie.json();
        setUser(data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  }, []);

  return (
    <main>
      {/* Profile Dashboard */}
      <section className="profile bg-primary w-full h-full py-10">
        <div className="head sm:flex content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 mb-2 pb-3 border-b-4 border-third rounded">
          <h4 className="font-lato font-medium text-center sm:text-start text-3xl text-third">
            Dashboard
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] content-center items-center mx-auto sm:mx-20 gap-10 mt-10 lg:mt-20">
          <div className="profile avatar mx-auto">
            <div className="w-40 sm:w-64 lg:w-72 rounded-full">
              <Image
                src="/user.png"
                width={512}
                height={512}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 mx-auto gap-5 lg:gap-20">
            <div className="name content-center">
              <h5 className="text-base sm:text-xl text-center md:text-start font-inter font-semibold text-fourth">
                Name:
              </h5>
              <h6 className="text-xl sm:text-3xl text-center md:text-start font-inter font-semibold text-third">
                {user?.name}
              </h6>
            </div>
            <div className="referral content-center ms-0 lg:ms-10">
              <h5 className="text-base sm:text-xl text-center md:text-start font-inter font-semibold text-fourth">
                User ID / Referral Code:
              </h5>
              <h6 className="text-xl sm:text-3xl text-center md:text-start font-inter font-semibold text-third">
                {user?.id}
              </h6>
            </div>
            <div className="email content-center">
              <h5 className="text-base sm:text-xl text-center md:text-start font-inter font-semibold text-fourth">
                Email:
              </h5>
              <h6 className="text-xl sm:text-3xl text-center md:text-start font-inter font-semibold text-third">
                {user?.email}
              </h6>
            </div>
            <div className="wallet content-center ms-0 lg:ms-10">
              <h5 className="text-base sm:text-xl text-center md:text-start font-inter font-semibold text-fourth">
                Your Wallet Balance:
              </h5>
              <h6 className="text-xl sm:text-3xl text-center md:text-start font-inter font-semibold text-third">
                {`Rp.${user?.wallet.balance},-`}
              </h6>
            </div>
            <div className="point content-center ms-0">
              <h5 className="text-base sm:text-xl text-center md:text-start font-inter font-semibold text-fourth">
                Your Points:
              </h5>
              <h6 className="text-xl sm:text-3xl text-center md:text-start font-inter font-semibold text-third">
                {user?.totalPoints}
              </h6>
            </div>
          </div>
        </div>
      </section>
      {/* Profile Dashboard */}

      {/* Watched Movies */}
      <section className="watched bg-primary w-full h-full mb-6">
        <div className="head sm:flex content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 mb-2 pb-3 border-b-4 border-third rounded">
          <h4 className="font-lato font-medium text-center sm:text-start text-3xl text-third">
            Watched Movies
          </h4>
        </div>
        <div className="overflow-x-auto content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-center">
                <th>No</th>
                <th>Film</th>
                <th>Review</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr className="hover:bg-secondary text-center">
                <th>1</th>
                <td>Interstellar</td>
                <td>
                  <label
                    htmlFor="review-tab-1"
                    role="button"
                    tabIndex={0}
                    className="btn bg-third text-primary font-semibold hover:bg-primary hover:text-third transition-all ease-in-out"
                  >
                    Review
                  </label>
                  <input
                    type="checkbox"
                    id="review-tab-1"
                    className="modal-toggle"
                  />
                  <div className="modal bg-secondary" role="dialog">
                    <div className="modal-box h-3/3">
                      <h3 className="text-center md:text-start text-2xl font-semibold text-third">
                        Interstellar
                      </h3>
                      <div className="py-4">
                        <p className="text-center md:text-start text-lg font-medium text-fourth font-lato mb-2">
                          Rate Film
                        </p>
                        <input
                          type="range"
                          min={0}
                          max="100"
                          step={25}
                          className="range range-warning range-xs"
                        />
                        <div className="flex w-full justify-between px-2 text-xs">
                          <span>1</span>
                          <span>2</span>
                          <span>3</span>
                          <span>4</span>
                          <span>5</span>
                        </div>
                      </div>
                      <div className="form-control ">
                        <label className="label">
                          <span className="label-text">Message</span>
                        </label>
                        <textarea
                          rows={3}
                          className="textarea textarea-bordered"
                          placeholder="Your message"
                        ></textarea>
                      </div>
                      <div className="modal-action pt-auto">
                        <label className="btn bg-third text-primary hover:bg-primary hover:text-third">
                          Submit
                        </label>
                        <label
                          htmlFor="review-tab-1"
                          className="btn bg-primary text-third hover:bg-third hover:text-primary"
                        >
                          Close
                        </label>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              {/* row 2 */}
              <tr className="hover:bg-secondary text-center">
                <th>2</th>
                <td>Twister</td>
                <td>
                  <label
                    htmlFor="review-tab-2"
                    role="button"
                    tabIndex={0}
                    className="btn bg-third text-primary font-semibold hover:bg-primary hover:text-third transition-all ease-in-out"
                  >
                    Review
                  </label>
                  <input
                    type="checkbox"
                    id="review-tab-2"
                    className="modal-toggle"
                  />
                  <div className="modal bg-secondary" role="dialog">
                    <div className="modal-box h-3/3">
                      <h3 className="text-center md:text-start text-2xl font-semibold text-third">
                        Twister
                      </h3>
                      <div className="py-4">
                        <p className="text-center md:text-start text-lg font-medium text-fourth font-lato mb-2">
                          Rate Film
                        </p>
                        <input
                          type="range"
                          min={0}
                          max="100"
                          step={25}
                          className="range range-warning range-xs"
                        />
                        <div className="flex w-full justify-between px-2 text-xs">
                          <span>1</span>
                          <span>2</span>
                          <span>3</span>
                          <span>4</span>
                          <span>5</span>
                        </div>
                      </div>
                      <div className="form-control ">
                        <label className="label">
                          <span className="label-text">Message</span>
                        </label>
                        <textarea
                          rows={3}
                          className="textarea textarea-bordered"
                          placeholder="Your message"
                        ></textarea>
                      </div>
                      <div className="modal-action pt-auto">
                        <label className="btn bg-third text-primary hover:bg-primary hover:text-third">
                          Submit
                        </label>
                        <label
                          htmlFor="review-tab-2"
                          className="btn bg-primary text-third hover:bg-third hover:text-primary"
                        >
                          Close
                        </label>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              {/* row 3 */}
              <tr className="hover:bg-secondary text-center">
                <th>3</th>
                <td>Inside Out 2</td>
                <td>
                  <label
                    htmlFor="review-tab-3"
                    role="button"
                    tabIndex={0}
                    className="btn bg-third text-primary font-semibold hover:bg-primary hover:text-third transition-all ease-in-out"
                  >
                    Review
                  </label>
                  <input
                    type="checkbox"
                    id="review-tab-3"
                    className="modal-toggle"
                  />
                  <div className="modal bg-secondary" role="dialog">
                    <div className="modal-box h-3/3">
                      <h3 className="text-center md:text-start text-2xl font-semibold text-third">
                        Inside Out 2
                      </h3>
                      <div className="py-4">
                        <p className="text-center md:text-start text-lg font-medium text-fourth font-lato mb-2">
                          Rate Film
                        </p>
                        <input
                          type="range"
                          min={0}
                          max="100"
                          step={25}
                          className="range range-warning range-xs"
                        />
                        <div className="flex w-full justify-between px-2 text-xs">
                          <span>1</span>
                          <span>2</span>
                          <span>3</span>
                          <span>4</span>
                          <span>5</span>
                        </div>
                      </div>
                      <div className="form-control ">
                        <label className="label">
                          <span className="label-text">Message</span>
                        </label>
                        <textarea
                          rows={3}
                          className="textarea textarea-bordered"
                          placeholder="Your message"
                        ></textarea>
                      </div>
                      <div className="modal-action pt-auto">
                        <label className="btn bg-third text-primary hover:bg-primary hover:text-third">
                          Submit
                        </label>
                        <label
                          htmlFor="review-tab-3"
                          className="btn bg-primary text-third hover:bg-third hover:text-primary"
                        >
                          Close
                        </label>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      {/* Watched Movies */}

      {/* My Tickets */}
      <section className="ticket bg-primary w-full h-full mb-20">
        <div className="head sm:flex content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 mb-2 pb-3 border-b-4 border-third rounded">
          <h4 className="font-lato font-medium text-center sm:text-start text-3xl text-third">
            My Tickets
          </h4>
        </div>
        <div className="booked-film flex flex-col md:flex-row content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 pt-7 gap-5 md:gap-20">
          <div className="poster mx-auto md:mx-0">
            <Image
              src="/Poster Film-3.png"
              width={230}
              height={270}
              alt="Poster Films"
              className="w-64 h-full object-cover rounded-2xl"
              loading="lazy"
            />
          </div>
          <div className="body-text mt-3">
            <h5 className="font-inter font-semibold text-center md:text-start text-4xl text-third mb-2">
              Interstellar
            </h5>
            <p className="cinema font-inter font-medium text-center md:text-start text-xl text-fourth mb-1">
              Starium<span className="mx-3"> | </span>Plaza Indonesia
            </p>
            <p className="clock font-inter font-semibold text-center md:text-start text-2xl text-third mb-5">
              06:00 PM
            </p>
            <h6 className="seat font-inter font-medium text-center md:text-start text-xl text-fourth mb-1">
              Your Seat:
            </h6>
            <div className="inline-flex w-full justify-center md:justify-start gap-5">
              <p className="font-inter font-semibold text-xl text-third">4.7</p>
              <p className="font-inter font-semibold text-xl text-third">4.8</p>
              <p className="font-inter font-semibold text-xl text-third">4.9</p>
              <p className="font-inter font-semibold text-xl text-third">
                4.10
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* My Tickets */}
    </main>
  );
}
