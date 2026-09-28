import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <main className="page-enter notfound">
      <div className="container notfound__inner">
        <p className="notfound__code">404</p>
        <h1 className="notfound__title">Page Not Found</h1>
        <p className="notfound__desc">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="notfound__actions">
          <Link to="/" className="btn btn-primary btn-lg">Go to Home</Link>
          <Link to="/contact" className="btn btn-outline btn-lg">Contact Us</Link>
        </div>
      </div>
    </main>
  );
}
