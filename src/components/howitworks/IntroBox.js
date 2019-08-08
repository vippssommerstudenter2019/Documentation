import React from 'react';

/**
 * Represents a box with a short overview over the content.
 */
const IntroBox = args => (
  <div className="intro-wrapper">

    <div className="intro-title">
      {args.content.title}
    </div>

    <div className="intro-sub">
      {args.content.introduction}
    </div>

    <div className="intro-description content-text">
      {args.content.description}
    </div>

    <div className="intro-description content-text">
      {args.content.descriptiontwo}
    </div>
  </div>
);

export default IntroBox;
