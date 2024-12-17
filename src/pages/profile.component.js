import { Menu, Transition } from "@headlessui/react";
import { Avatar } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import profilePic from '../assets/images/user.png';



function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function HRProfile(props) {

   

    
    useEffect(() => {
       
    }, []);

   

    return (
        <div>
            <span className="flex flex-wrap flex-grow">
              
                <Menu as="div" className="relative inline-block text-left">
                    <div className="flex items-center align-center">
                        <Menu.Button className='flex items-center'>
                            <Avatar  src={profilePic} />

                        </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 w-56 mt-3 origin-top-right bg-white divide-y divide-gray-100 dark:divide-[#333] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-[#232528]">
                            <div className="py-1">
                                <Menu.Item key="MenuItemProfile">
                                    {({ active }) => (
                                        <Link
                                            to={"/hr/profile"}
                                            className={classNames(
                                                active
                                                    ? "bg-gray-100 text-gray-900 dark:bg-[#333231] dark:text-[#F8F8F8]"
                                                    : "text-gray-700 dark:bg-[#232528] dark:text-[#F8F8F8]",
                                                "block px-4 py-2 text-sm"
                                            )}
                                        >
                                            <i className="mr-6 icon-size user_icon"></i> Profile
                                        </Link>
                                    )}
                                </Menu.Item>
                            </div>

                            <div className="py-1">
                                <Menu.Item key="MenuItemLogout">
                                    {({ active }) => (
                                        <Link
                                           
                                            className={classNames(
                                                active
                                                    ? "bg-gray-100 text-gray-900 dark:bg-[#333231] dark:text-[#F8F8F8]"
                                                    : "text-gray-700 dark:text-[#F8F8F8] dark:bg-[#232528]",
                                                "block px-4 py-2 text-sm cursor-pointer"
                                            )}
                                        >
                                            <i className="mr-6 icon-size logout_icon_small"></i> Logout
                                        </Link>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </span>
        </div>
    );



}
