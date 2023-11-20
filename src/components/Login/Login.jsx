import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { useFormWithValidation } from '../../hooks/useForm';
import { emailPattern } from '../../utils/pattern';

export default function Login({ handleLogin, loggedIn }) {
	const { values, errors, handleChange, isValid } = useFormWithValidation({
		email: '',
		password: ''
	});

	const navigate = useNavigate();

	useEffect(() => {
		if (loggedIn) {
			navigate('/movies');
		}
	}, [loggedIn]);

	function handleSubmit(e) {
		e.preventDefault();
		handleLogin(values.email, values.password);
	}

	return (
		<section className='register' onSubmit={handleSubmit}>
			<form className='register__form'>
				<div className='register__header'>
					<Link to='/'>
						<img src={logo} alt='логотип' />
					</Link>
					<h1 className='register__heading'>Рады видеть!</h1>
				</div>
				{renderInput('E-mail', 'email', 'email', 'email', values.email || '', handleChange, emailPattern)}
				<span className='register__input-error'>{errors.email}</span>
				{renderInput('Пароль', 'password', 'password', 'password', values.password || '', handleChange)}
				<span className='register__input-error'>{errors.password}</span>
				<button
					className={
						isValid
							? 'register__submit register__submit_mod'
							: 'register__submit register__submit_mod register__submit_disabled'
					}
					disabled={isValid ? false : true}
				>
					Войти
				</button>
				<div className='register__outro'>
					<span className='register__text'>Еще не зарегистрированы?</span>
					<Link to='/signup' className='register__link'>
						Регистрация
					</Link>
				</div>
			</form>
		</section>
	);
}

function renderInput(label, type, name, id, value, onChange, pattern) {
	return (
		<>
			<label className='register__label'>{label}</label>
			<input
				type={type}
				className='register__input'
				name={name}
				id={id}
				value={value}
				onChange={onChange}
				pattern={pattern}
				required
			/>
		</>
	);
}
