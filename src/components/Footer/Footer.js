import React from 'react';

const Footer = () => {
    return (
        <footer id="main-footer" className="bg-main text-white mt-5 p-5">
            <div className="container">
                <p className="lead text-center">Copyright &copy; { new Date().getFullYear() } Amazon</p>
            </div>
        </footer>
    );
}

export default Footer;
