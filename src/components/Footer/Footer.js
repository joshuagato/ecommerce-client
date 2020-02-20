import React from 'react';

const Footer = () => {
    return (
        <footer id="main-footer" className="bg-main text-white p-4">
            <div className="container">
                <p className="lead text-center">Copyright &copy; { new Date().getFullYear() } Amazon</p>
            </div>
        </footer>
    );
}

export default Footer;
