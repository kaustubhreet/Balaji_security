import React from 'react'

const Header = () => {
    return (
        <nav className="header-navbar navbar navbar-expand-lg align-items-center floating-nav navbar-dark navbar-shadow container-xxl">
            <div className="navbar-container d-flex content">
                <div className="bookmark-wrapper d-flex align-items-center">
                    <ul className="nav navbar-nav d-xl-none">
                        <li className="nav-item"><a className="nav-link menu-toggle" href="#"><i className="ficon" data-feather="menu"></i></a></li>
                    </ul>
                </div>
                
                <ul className="nav navbar-nav align-items-center ms-auto">
                    <li className="nav-item dropdown dropdown-user">
                        <a className="nav-link dropdown-toggle dropdown-user-link" id="dropdown-user" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <div className="user-nav d-sm-flex d-none">
                                <span className="user-name fw-bolder"></span>
                                <span className="user-status">JIGAR HARKHA CHAUDHARI</span>
                            </div>
                            <span className="avatar">
                                <img className="round" src="https://www.mehtasecurity.in/public/uploads/users/profile_img/1706763880.jpeg" alt="user-image" height="40" width="40" />
                                <span className="avatar-status-online"></span>
                            </span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdown-user">
                            <a className="dropdown-item" href="https://www.mehtasecurity.in/logout" onClick={(e) => {e.preventDefault(); document.getElementById('logout-form').submit();}}>
                                <i className="me-50" data-feather="power"></i> Logout
                            </a>
                            <form id="logout-form" action="https://www.mehtasecurity.in/logout" method="POST" className="d-none">
                                <input type="hidden" name="_token" value="DYECPjJoed06sGz0Yxj0eO1jsc32nEHaAvIQwJCG" />
                            </form>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );  
}

export default Header