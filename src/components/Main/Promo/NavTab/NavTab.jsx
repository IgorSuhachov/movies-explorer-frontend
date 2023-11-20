import React from 'react';

export default function NavTab() {
	return (
		<div className='navTab'>
			<ul className='navTab__elements'>
				<li className='navTab__element'>
					<a href='#about' className='navTab__link'>
						О проекте
					</a>
				</li>
				<li className='navTab__element'>
					<a href='#techs' className='navTab__link'>
						Технологии
					</a>
				</li>
				<li className='navTab__element'>
					<a href='#aboutMe' className='navTab__link'>
						Студент
					</a>
				</li>
			</ul>
		</div>
	);
}
