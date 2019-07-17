import ResponseBox from "./ResponseBox"
import React from 'react';

export default function ResponseTable(props) {
    let items = [];

    const statusCodes = Object.keys(props.responses).sort();

    for (const statusCode of statusCodes) {
        let json = {};

        if (props.responses[statusCode].hasOwnProperty("content")) {
            json = props.responses[statusCode].content;
        }

        items.push(
            <div key={statusCode}>
                <ResponseBox statusCode={statusCode} description={props.responses[statusCode].description} json={json} />
            </div>
        );
    }

    return items;
}