import ResponseBox from "./ResponseBox"
import React from 'react';

export default function ResponseTable(props) {
    let items = [];

    const statusCodes = Object.keys(props.responses).sort();

    for (const statusCode of statusCodes) {
        
        items.push(
            <div key={statusCode} className="responsetable" >
                <ResponseBox 
					statusCode={statusCode} 
					description={props.responses[statusCode].description} 
					json={props.responses[statusCode].json} 
					spaceForJson={props.spaceForJson}
				/>
            </div>
        );
    }

    return items;
}