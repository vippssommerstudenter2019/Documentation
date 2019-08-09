import React from 'react';
import ResponseBox from './ResponseBox';

export default function ResponseTable(props) {
  const items = [];

  const statusCodes = Object.keys(props.responses).sort();
  statusCodes.forEach((statusCode) => {
    items.push(
      <div key={statusCode} className="responsetable">
        <ResponseBox
          statusCode={statusCode}
          description={props.responses[statusCode].description}
          json={props.responses[statusCode].json}
          spaceForJson={props.spaceForJson}
        />
      </div>,
    );
  });

  return (
        <div className="response-container">
            {items}
        </div>
        );
}
