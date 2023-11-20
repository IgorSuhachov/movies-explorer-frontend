import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Burger({ isOpen, handleClose }) {
	return (
		<section className={`burger ${isOpen ? 'burger_hidden' : ''}`}>
			<div className='burger__container'>
				<button className='burger__close' type='button' onClick={handleClose}></button>
				<nav className='burger__nav'>
					<NavLink
						to='/'
						className={({ isActive }) => (isActive ? 'burger__link burger__link_active' : 'burger__link')}
					>
						Главная
					</NavLink>
					<NavLink
						to='/movies'
						className={({ isActive }) => (isActive ? 'burger__link burger__link_active' : 'burger__link')}
					>
						Фильмы
					</NavLink>
					<NavLink
						to='/saved-movies'
						className={({ isActive }) => (isActive ? 'burger__link burger__link_active' : 'burger__link')}
					>
						Сохраненные фильмы
					</NavLink>
				</nav>
				<Link to='/profile' className='burger__account'>
					Аккаунт
				</Link>
			</div>
		</section>
	);
}
