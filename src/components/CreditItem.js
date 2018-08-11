import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import config from '../config';

class CreditItem extends Component {

	imageLoaded = (e) => {
		e.target.classList.add('img-loaded');
	};

	render(){

		const { credit } = this.props;

		return (
			<div className="credit-item">
				<Link to={`/person/${credit.id}`} className="credit-img">
					{credit.profile_path !== null && (
						<img src={`${config.API_IMAGE.small}/${credit.profile_path}`} onLoad={this.imageLoaded}/>
					)}

				</Link>
				<div className="credit-content">
					<div className="credit-name">{credit.name}</div>
					<div className="credit-character">{credit.character}</div>
				</div>
			</div>
		)
	}
}

export default CreditItem;