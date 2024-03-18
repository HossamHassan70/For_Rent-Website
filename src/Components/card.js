import { Link } from "react-router-dom";

function Card(props) {
    return (
        <div className="col-md-4 bg-light">
            <div className="card shadow" style={{ width: "25rem"}}>
                <img src={`http://localhost:8000/properties/`} className="card-img-top" alt="..." />
                <div className="card-body bg-light">
                    <Link style={{ textDecoration: 'none', color: '#255' }} to={`/show/${props.title.id}`}>
                        <h5 className="card-title text-center">{props.title.title}</h5>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Card;
