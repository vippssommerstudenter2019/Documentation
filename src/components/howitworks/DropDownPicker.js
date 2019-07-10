import React, {Component} from 'react';

class DropDownPicker extends Component {
	/*
		Props:
			choices	  string[]
			selected  string
			callback (string) => set_selected
	*/
	
	render() {
		const butt_str = "button tiny hollow";
		const choices  = this.props.choices;
		const callback = this.props.callback;
		const selected = this.props.selected;
		
		//console.log("DDP", callback);
		
		let items = [];
		Array.from(choices, (val, i) => {
			if (val === selected) return val;
			items.push(
				<button key={val} className={butt_str} onClick={()=>callback(val)}> 
						{val} 
				</button>
			);
			return val;
		});
		//
		return (
			<div className="dropdown-wrapper">
				<div className="dropdown">
					<div className="dropdown-border top">
						<button className={"dropdown-icon " + butt_str}>{selected}</button>
					</div>
					
					<div className="dropdown-content">
						<div className="dropdown-border bot">
							{items}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default DropDownPicker;