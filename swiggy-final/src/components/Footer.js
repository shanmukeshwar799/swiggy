import { LOGO_URL } from "../utils/constants";

const Footer = () => {
    return (
        <footer className="bg-black text-white px-4 py-2 mt-8 rounded-lg max-w-xl mx-auto">
            <div className="flex items-center justify-center gap-3">
                <img src={LOGO_URL} alt="Logo" className="h-8 w-8 rounded-full border border-green-200 shadow-sm" />
                <span className="font-bold text-base">Just Eat</span>
                <span className="text-xs text-gray-400 ml-2">
                    &copy; {new Date().getFullYear()} Just Eat. All rights reserved.
                </span>
            </div>
        </footer>
    );
};

export default Footer;
