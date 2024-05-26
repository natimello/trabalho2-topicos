import {Link} from "react-router-dom";

export default function NavBar() {
    return (
        <nav className="nav navbar navbar-expand navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="navbar-nav mr-auto">
                    <Link to="/" className="navbar-brand px-3">
                        <span className="navbar-text">React CRUD</span>
                    </Link>
                    <li className="nav-item">
                        <Link to={"/registrar"} className="nav-link">
                            Registrar
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/listar"} className="nav-link">
                            Listar
                        </Link>
                    </li>
                </div>
                <div className="navbar-nav ml-auto px-3">
                    <li className="nav-item">
                        <Link to={"/"} className="nav-link">
                        Logout
                        </Link>
                    </li>
                </div>
            </div>
        </nav>
    )
}