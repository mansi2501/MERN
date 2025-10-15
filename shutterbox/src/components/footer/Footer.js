import React from "react";

function Footer() {
    return (
        <footer className="bg-light text-center text-lg-start border-top mt-auto" style={{
            paddingTop: "2.5rem",
            paddingBottom: "2rem",
            fontSize: "1.1rem",
            fontFamily: "'Segoe UI', Roboto, sans-serif",
        }}>
            <div className="container py-3">
                <div className="row">
                    {/* Left side */}
                    <div className="col-md-6 text-md-start text-center mb-2 mb-md-0">
                        <span className="text-muted">
                            © {new Date().getFullYear()} Your Company Name. All rights reserved.
                        </span>
                    </div>

                    {/* Right side */}
                    <div className="col-md-6 text-md-end text-center">
                        <a href="/about" className="text-muted text-decoration-none me-3">
                            <i className="bi bi-info-circle me-1"></i>About
                        </a>
                        <a href="/contact" className="text-muted text-decoration-none me-3">
                            <i className="bi bi-envelope me-1"></i>Contact
                        </a>
                        <a href="/privacy" className="text-muted text-decoration-none">
                            <i className="bi bi-shield-lock me-1"></i>Privacy Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
