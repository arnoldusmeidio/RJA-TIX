"use client";

import { useUserStore } from "@/stores/user-store";
import { IoWalletOutline } from "react-icons/io5";

export function AccountBalanceIcon() {
  const { user } = useUserStore();

  return (
    <>
      {user ? (
        <div className="dropdown dropdown-end hidden sm:block">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <IoWalletOutline className="text-xl" />
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">Your balance</span>

              <span className="text-base font-normal">
                Rp.
                <span className="ms-2 text-third">
                  {user?.wallet.balance || 0},00
                </span>
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function AccountBalanceSidebar() {
  const { user } = useUserStore();

  return (
    <>
      {user ? (
        <div className="collapse collapse-arrow bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            Account balance:
          </div>
          <div className="collapse-content shadow-2xl rounded-2xl">
            <h4 className="text-base font-normal">Your balance:</h4>
            <span className="text-base font-normal">
              Rp.
              <span className="ms-2 text-third">
                {user?.wallet.balance || 0},00
              </span>
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
}
