import React from 'react';
import ReactDOM from 'react-dom';
import { Sidebar } from './sidebar.js';
import { ContentField } from './content.js';
import './index.css';

// The entire page is contained here
const DocuPage = () => (
    <section className="DocuPage">
        <Sidebar/>
        <ContentField/>
    </section>
)

ReactDOM.render(
    <body>
        <DocuPage/>
    </body>,
    document.getElementById('root')
)