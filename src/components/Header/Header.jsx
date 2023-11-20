import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Burger from './Burger/Burger';
import AuthContext from '../ProtectedRoute/AuthContext';

export default function Header() {
	const { loggedIn } = useContext(AuthContext);
	const screenWidth = window.innerWidth;

	const [isOpen, setIsOpen] = React.useState(false);

	function handleOpen() {
		setIsOpen(true);
	}

	function handleClose() {
		setIsOpen(false);
	}

	if (screenWidth <= 920 && loggedIn) {
		return (
			<header className='header'>
				<Link to='/'>
					<img src={logo} alt='логотип' className='header__logo' />
				</Link>
				<button className='burger__menu' onClick={handleOpen}></button>
				{isOpen && <Burger handleClose={handleClose} />}
			</header>
		);
	}

	return (
		<>
			{loggedIn ? (
				<header className='header'>
					<div className='header__wrapper'>
						<Link to='/'>
							<img src={logo} alt='логотип' className='header__logo' />
						</Link>
						<div className='header__links'>
							<NavLink
								to='/movies'
								className={({ isActive }) => (isActive ? 'header__link header__link_active' : 'header__link')}
							>
								Фильмы
							</NavLink>
							<NavLink
								to='/saved-movies'
								className={({ isActive }) => (isActive ? 'header__link header__link_active' : 'header__link')}
							>
								Сохраненные фильмы
							</NavLink>
						</div>
					</div>
					<div className='header__authorization'>
						<Link to='/profile' className='header__account'>
							Аккаунт
						</Link>
					</div>
				</header>
			) : (
				<header className='header'>
					<Link to='/'>
						<img src={logo} alt='логотип' className='header__logo' />
					</Link>
					<div className='header__authorization'>
						<Link to='/signup' className='header__registration'>
							Регистрация
						</Link>
						<Link to='/signin' className='header__login'>
							Войти
						</Link>
					</div>
				</header>
			)}
		</>
	);
}
