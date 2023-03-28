import React from "react";
import { Link } from "react-router-dom";

const Card = ({ title, description, image, alt, hasContent, id }) => {
  return (
    <div className="card">
      <img src={image} alt={alt} />
      <h3>{title}</h3>
      <article>
        <p>{description}</p>
      </article>

      {hasContent && (
        <Link to={`/info/${id}`}>
          <button className="btn btn-primary">Find Out More</button>
        </Link>
      )}
    </div>
  );
};

export default Card;
