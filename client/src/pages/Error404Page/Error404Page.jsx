import { Link } from "@mui/material";
import "./Error404Page.css";

export function Error404Page() {
    return (
        <div className="page-404">
            <div className="page-404-heading">404</div>
            <div className="page-404-subheading">Page Not Found</div>
            <div className="page-404-description">
                <div>We're sorry the page you requested could not be found</div>
                <div>Please go back to the homepage</div>
            </div>
            <Link href="/" variant="body1">
                Go to home
            </Link>
        </div>
    );
}
