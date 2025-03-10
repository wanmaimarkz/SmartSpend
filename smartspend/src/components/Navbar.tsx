import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Menu, NotebookPen, Gauge, LogOut, ArrowRightLeft, User, ListTree, Flag
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function Navbar({ onLogout }: { onLogout: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="bg-[#2C7A7B] sticky top-0">
            <div className="max-w-full px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo & Brand */}
                    <div className="flex items-center gap-2 w-3/12">
                        <img src="/SmartSpendIcon.svg" alt="LogoApp" className="w-12 h-12 opacity-75" />
                        <Link to="/" className="text-[#E6FFFA] font-bold text-xl">
                            SmartSpend
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex sm:items-center sm:space-x-2 w-6/12">
                        <Link
                            to="/dashboard"
                            className="flex h-4/6 text-sm font-semibold gap-2 items-center rounded-md px-4 text-[#E6FFFA] hover:bg-[#38B2AC] hover:opacity-80 hover:text-black  transition duration-200"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/transactions"
                            className="flex h-4/6 text-sm font-semibold gap-2 items-center rounded-md px-4 text-[#E6FFFA] hover:bg-[#38B2AC] hover:opacity-80 hover:text-black  transition duration-200"
                        >
                            Transactions
                        </Link>
                        <Link
                            to="/convertCurency"
                            className="flex h-4/6 text-sm font-semibold gap-2 items-center rounded-md px-4 text-[#E6FFFA] hover:bg-[#38B2AC] hover:opacity-80 hover:text-black  transition duration-200"
                        >
                            Convert Currency
                        </Link>
                        <Link
                            to="/savingGoals"
                            className="flex h-4/6 text-sm font-semibold gap-2 items-center rounded-md px-4 text-[#E6FFFA] hover:bg-[#38B2AC] hover:opacity-80 hover:text-black  transition duration-200"
                        >
                            Saving Goals
                        </Link>
                    </div>
                    <div className="hidden sm:flex sm:items-center sm:space-x-6 w-1/12 justify-end">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center space-x-2 focus:outline-none text-white ">
                                    <User className="w-7 h-7 rounded-full stroke-orange-50 border-2 mb-1" />
                                    {/* <span className="font-semibold" >Account</span> */}
                                    {/* <ChevronDown className="w-5 h-5 hover:bg-blue-700 rounded-md" /> */}
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48 bg-white gap-2">
                                {/* <DropdownMenuItem asChild className="hover:bg-gray-200 duration-500">
                                    <Link to="/profile">Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className="hover:bg-gray-200 duration-300">
                                    <Link to="/settings">Settings</Link>
                                </DropdownMenuItem>
                                <hr /> */}
                                <DropdownMenuItem onClick={onLogout} className="hover:bg-gray-200 duration-300">
                                    <LogOut className="w-4 h-4 mr-2" />
                                    <Link
                                        to="/login"
                                        onClick={onLogout}
                                    >
                                        ออกจากระบบ
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={toggleMenu}
                            className="p-2 rounded-md text-[#E6FFFA] hover:bg-[#38B2AC] hover:opacity-80 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition duration-700"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (

                                <Menu />
                            ) : (
                                <ListTree />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute inset-x-0 top-16 z-50 bg-[#2C7A7B]">
                    <div className="pt-2 pb-3 space-y-1 bg-[#308385]">
                        <Link
                            to="/dashboard"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-[#E6FFFA] hover:bg-[#38B2AC] hover:opacity-80 hover:text-black hover:border-white"
                        >
                            <Gauge />
                            Dashboard
                        </Link>
                        <Link
                            to="/transactions"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-[#E6FFFA] hover:bg-[#38B2AC] hover:opacity-80 hover:text-black hover:border-white"
                        >
                            <NotebookPen />
                            บันทึกรายรับ-รายจ่าย
                        </Link>
                        <Link
                            to="/convertCurency"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-[#E6FFFA] hover:bg-[#38B2AC] hover:opacity-80 hover:text-black hover:border-white"
                        >
                            <ArrowRightLeft />
                            อัตราแลกเปลี่ยน
                        </Link>
                        <Link
                            to="/savingGoals"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-[#E6FFFA] hover:bg-[#38B2AC] hover:opacity-80 hover:text-black hover:border-white"
                        >
                            <Flag />
                            การตั้งเป้าหมายการออม
                        </Link>
                        <Link
                            to="/login"
                            onClick={onLogout}
                            className="flex items-center gap-2 pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-[#E6FFFA] hover:bg-[#38B2AC] hover:opacity-80 hover:text-black hover:border-white"
                        >
                            <LogOut />
                            ออกจากระบบ
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
