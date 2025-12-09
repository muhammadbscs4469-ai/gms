import "./cards.css";
import { Link } from "react-router-dom";

export default function Card({ items = [] }) {
  return (
    <div className="card-grid">
      {items.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <Link to={item.link} key={index} className="card-link">
            <div className="card">
              <div className="card-icon">
                {IconComponent && <IconComponent size={32} />}
              </div>
              <h3 className="card-title">{item.title}</h3>
              <p className="card-description">{item.description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
