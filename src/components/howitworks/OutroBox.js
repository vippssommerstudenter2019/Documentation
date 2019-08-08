import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Represents a box with a short overview over the content.
 */
const OutroBox = args => (
  <div className="outro-wrapper">
    <div className="outro-element">
      <div className="outro-image">
        <img src={args.content.imagePath} alt="Springing into action!" />
      </div>
      <div className="outro-text">
        <div className="xxlarge-font-size">
          <div className="outro-title">
            {args.content.title}
          </div>
        </div>
        <div className="outro-sub">
          {args.content.description}
        </div>
      </div>
      <div className="outro-link">
        <Link to={args.content.link}>
          <button
            type="button"
            className="outro-button"
          >
            {args.content.buttonTitle}
          </button>
        </Link>
      </div>
    </div>
  </div>
);

export default OutroBox;
