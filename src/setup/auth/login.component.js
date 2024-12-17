
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import loginImage from '../../assets/images/login-img.png';
import logo from '../../assets/images/logo.png';
 
export default function RouteComponent() {
    return (
        (
            <div>
                <div
                    className="min-h-screen flex-row grid 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 sm:grid-cols-1 gap-0">
                    <div className="flex flex-wrap flex-row justify-center auto-rows-max login bg-white dark:bg-[#1E2124]">
                        <div className="max-w-md 2xl:max-w-lg w-full p-2">
                            <form  autoComplete="off">
                            <div className="mb-20 md:mb-10 2xl:mb-50 lg:mb-28 xl:mb-50 xl:mt-8">
                                    <img className="2xl:h-12 h-10" src={logo} alt="" />
                                </div>
                                <div className="mb-4">
                                    <h2 className="text-[26px] font-semibold text-[#101828] dark:text-white">Login 
                                    </h2>
                                </div>

                                {/* <Link className="shadowgooglebtn text-[15px] mb-8 flex flex-wrap flex-row align-center justify-center font-normal border border-[#E8F0F3] rounded-lg p-2.5 dark:text-white dark:border-[#4E5668]">
                                    <img className="mr-2 w-5" src={googlelogin} alt="" />
                                    Sign in with Google
                                </Link>
                                <div className="flex flex-wrap flex-row justify-evenly space-x-2 w-100 mb-4 mx-5">
                                    <span className="bg-[#E4E7EC] h-px flex-grow t-2 relative mt-3"></span>
                                    <span className="flex-none text-sm font-light text-[#98A2B3]">Or Sign in with Email</span>
                                    <span className="bg-[#E4E7EC] h-px flex-grow t-2 relative mt-3"></span>
                                </div> */}

                                <div className="relative mb-6">
                                    <label htmlFor="required-email" className="text-[#344054] text-[14px] font-medium">
                                        Email
                                        <span className="text-red-500 required-dot">
                                            *
                                        </span>
                                    </label>
                                    <input
                                        type="email" id="required-email"
                                        className="text-[16px] rounded-lg flex-1  border border-[#D0D5DD] w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 ring-offset-green-900 focus:ring-green-900 mt-2 placeholder:text-[#667085] dark:placeholder:text-[#333]"
                                    />
                                </div>
                                <div className="relative mb-6">
                                    <label htmlFor="required-password" className="text-[#344054] text-[14px] font-medium">
                                        Password
                                        <span className="text-red-500 required-dot">
                                            *
                                        </span>
                                    </label>
                                    <input type={"password"} id="required-password"
                                        className="text-[16px] rounded-lg flex-1  border border-[#D0D5DD] w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-1 ring-offset-green-900 focus:ring-green-900 mt-2 placeholder:text-[#667085]"
                                    />
                                    <Link > <i className="pi pi-eye-slash eyes_style"></i></Link>
                                </div>
                                <div className="flex items-center justify-between align-center mb-4 mt-8">
                                  
                                </div>
                                <div className="flex w-full mb-2">
                                    <div className="flex w-full mb-4">
                                        <Link to='/dashboard'  type="submit" className="py-2.5 px-5 bg-[#029046] hover:bg-[#19AA5F] focus:ring-green-500 focus:ring-offset-green-800 text-white w-full transition ease-in duration-200 text-center text-base font-normal shadow-md focus:outline-none focus:ring-1 focus:ring-offset-2  rounded-lg ">
                                            Sign In
                                        </Link>
                                    </div>
                                </div>
                                {/* <div
                                    className="flex items-center justify-center mb-8 items-center text-sm font-normal text-center   text-[#555555]">
                                    Not Registered Yet?
                                    <Link
                                        className="inline-flex items-center text-sm font-semibold text-center text-[#029046] hover:text-[#19AA5F]">
                                        <span className="ml-2">
                                            Create an account.
                                        </span>
                                    </Link>
                                </div> */}
                            </form>
                        </div>
                    </div>
                    <div className="login-bg flex-row flex flex-wrap align-center justify-center content-center">

                        <div className=" py-10 px-16">
                            <div className="auto-rows-max flex-row">
                                <img src={loginImage} alt="" />
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        ))
}