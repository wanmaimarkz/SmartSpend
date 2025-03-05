import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, NotebookPen, Gauge, LogOut, ArrowRightLeft, ChevronDown, User } from 'lucide-react';
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
        <nav className="bg-blue-600 sticky top-0">
            <div className="max-w-full px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo & Brand */}
                    <div className="flex items-center">
                        <Link to="/" className="text-white font-bold text-xl">
                            SmartSpend
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex sm:items-center sm:space-x-6">
                        <Link
                            to="/dashboard"
                            className="text-white hover:border-b-2 hover:border-white transition duration-200"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/transactions"
                            className="text-white hover:border-b-2 hover:border-white transition duration-200"
                        >
                            บันทึกรายรับ-รายจ่าย
                        </Link>
                        <Link
                            to="/reports"
                            className="text-white hover:border-b-2 hover:border-white transition duration-200"
                        >
                            Reports
                        </Link>
                        <Link
                            to="/settings"
                            className="text-white hover:border-b-2 hover:border-white transition duration-200"
                        >
                            Settings
                        </Link>
                        <div className="relative">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center space-x-2 focus:outline-none text-white">
                                        <User className="w-5 h-5" />
                                        <span >Account</span>
                                        <ChevronDown className="w-4 h-4" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 bg-white gap-2">
                                    <DropdownMenuItem asChild className="hover:bg-gray-200 duration-500">
                                        <Link to="/profile">Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className="hover:bg-gray-200 duration-300">
                                        <Link to="/settings">Settings</Link>
                                    </DropdownMenuItem>
                                    <hr />
                                    <DropdownMenuItem onClick={onLogout} className="hover:bg-gray-200 duration-300">
                                        <LogOut className="w-4 h-4 mr-2" />
                                        <span>Logout</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={toggleMenu}
                            className="p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <Menu />
                            ) : (
                                <Menu />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute inset-x-0 top-16 z-50 bg-blue-600">
                    <div className="pt-2 pb-3 space-y-1 ">
                        <Link
                            to="/dashboard"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 pl-3 pr-4 py-2 border-l-4 border-white text-base font-medium text-white bg-blue-700"
                        >
                            <Gauge />
                            Dashboard
                        </Link>
                        <Link
                            to="/transactions"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-white hover:bg-blue-700 hover:border-white"
                        >
                            <NotebookPen />
                            บันทึกรายรับ-รายจ่าย
                        </Link>
                        <Link
                            to="/reports"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-white hover:bg-blue-700 hover:border-white"
                        >
                            <ArrowRightLeft />
                            อัตราแลกเปลี่ยน
                        </Link>
                        <Link
                            to="/login"
                            onClick={onLogout}
                            className="flex items-center gap-2 pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-white hover:bg-blue-700 hover:border-white"
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
