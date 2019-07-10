import React from 'react';
import { Link } from 'react-scroll'


class SideBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li>
                <Link activeClass="active" to={this.props.num} spy={true} smooth={true} duration={500}>
                    status
				</Link>
            </li>
        );
    }
}

export default SideBar;