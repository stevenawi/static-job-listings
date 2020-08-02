import React, { useState } from 'react';
import List from '../List/List';
import data from '../../data.json';
import './Lists.css';

function Lists() {
	const [filter, setFilter] = useState([]);

	const addFilter = (e) => {
		const { value } = e.target;
		!filter.includes(value) && filter.length < 5 && setFilter([...filter, value]);
	};

	const deleteFilter = (e) => {
		const newFilter = [...filter];
		const { alt, value } = e.target;
		let index;

		if (alt) {
			index = filter.indexOf(alt);
		} else {
			index = filter.indexOf(value);
		}

		newFilter.splice(index, 1);
		setFilter(newFilter);
	};

	const clearAllFilter = () => {
		setFilter([]);
	};

	const filteredData = data.filter(({ role, level, languages, tools }) => {
		const skills = [role, level, ...languages, ...tools];
		let isFiltered = true;

		for (let i = 0; i < filter.length; i++) {
			if (skills.includes(filter[i])) {
				continue;
			}
			isFiltered = false;
		}

		return isFiltered;
	});

	const list = filteredData.map(
		({
			id,
			company,
			logo,
			new: isNew,
			featured,
			position,
			role,
			level,
			postedAt,
			contract,
			location,
			languages,
			tools,
		}) => {
			return (
				<List
					key={id}
					id={id}
					company={company}
					logo={logo}
					isNew={isNew}
					featured={featured}
					position={position}
					role={role}
					level={level}
					postedAt={postedAt}
					contract={contract}
					location={location}
					languages={languages}
					tools={tools}
					addFilter={addFilter}
				/>
			);
		}
	);

	return (
		<div className="container">
			{filter.length > 0 && (
				<div className="filter">
					<div className="filter__left">
						{filter.map((item) => (
							<div key={item} className="filter__item">
								<div className="filter__item__name">{item}</div>
								<button value={item} onClick={deleteFilter} className="filter__item__remove">
									<img onClick={deleteFilter} src="/images/icon-remove.svg" alt={item} />
								</button>
							</div>
						))}
					</div>
					<button onClick={clearAllFilter} className="filter__clear">
						Clear
					</button>
				</div>
			)}
			<div className={`lists ${filter.length > 0 ? 'lists-top' : ''}`}>{list}</div>
		</div>
	);
}

export default Lists;
