import React from 'react';
import { Link } from 'react-router-dom';
import linkIco from '../../../images/linkIco.svg';

export default function Portfolio() {
	return (
		<section className='portfolio'>
			<h2 className='portfolio__heading'>Портфолио</h2>
			<ul className='portfolio__projects'>
				<li className='portfolio__project'>
					<div className='portfolio__element'>
						<Link to='https://github.com/IgorSuhachov/how-to-learn' className='portfolio__title' target='_blank'>
							<p className='portfolio__title'>Статичный сайт</p>
						</Link>
						<Link to='https://github.com/IgorSuhachov/how-to-learn' target='_blank'>
							<img src={linkIco} alt='ссылка' className='portfolio__arrow' />
						</Link>
					</div>
				</li>
				<li className='portfolio__project'>
					<div className='portfolio__element'>
						<Link to='https://github.com/IgorSuhachov/russian-travel' className='portfolio__title' target='_blank'>
							<p className='portfolio__title'>Адаптивный сайт</p>
						</Link>
						<Link to='https://github.com/IgorSuhachov/russian-travel' target='_blank'>
							<img src={linkIco} alt='ссылка' className='portfolio__arrow' />
						</Link>
					</div>
				</li>
				<li className='portfolio__project'>
					<div className='portfolio__element'>
						<Link to='https://github.com/IgorSuhachov/react-mesto-auth' className='portfolio__title' target='_blank'>
							<p className='portfolio__title'>Одностраничное приложение</p>
						</Link>
						<Link to='https://github.com/IgorSuhachov/react-mesto-auth' target='_blank'>
							<img src={linkIco} alt='ссылка' className='portfolio__arrow' />
						</Link>
					</div>
				</li>
			</ul>
		</section>
	);
}
