import React from 'react';
import { ReactSVG } from 'react-svg';
import './List.css';

function List({
	id,
	company,
	logo,
	isNew,
	featured,
	position,
	role,
	level,
	postedAt,
	contract,
	location,
	languages,
	tools,
	addFilter,
}) {
	const skills = [role, level, ...languages, ...tools];
	return (
		<div key={id} className={`list ${featured ? 'list-green' : ''}`}>
			<div className="list__container">
				<div className="list__left">
					<ReactSVG src={logo} className="list__logo" />
					<div className="list__details">
						<div className="list__title">
							<h2 className="list__company">{company}</h2>
							{isNew && <div className="list__new">NEW!</div>}
							{featured && <div className="list__featured">FEATURED</div>}
						</div>
						<h1 className="list__position">{position}</h1>
						<p className="list__information">
							{postedAt} &middot; {contract} &middot; {location}
						</p>
					</div>
				</div>

				<hr className="list__hr" />

				<div className="list__right">
					{skills.map((skill) => {
						return (
							<button key={skill} className="list__skill" value={skill} onClick={addFilter}>
								{skill}
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default List;
