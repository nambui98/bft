import type { NextPage } from 'next';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Autoplay, EffectFade, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { toast } from 'react-toastify';
import {
	Box,
	Container,
	Typography,
	Stack,
	InputBase,
	Button,
	Icon,
	styled,
	useMediaQuery,
} from '@mui/material';

import styles from '../styles/Home.module.scss';
import HomeLayout from '../components/layouts/HomeLayout';
import { videoSlides } from '../constants/home';

const VideoSwiper: React.FC<any> = () => {
	const isMobile = useMediaQuery('(max-width:700px)');
	const [indexActive, setIndexActive] = useState(0);
	const refSlide1 = useRef<any>(null);
	const refSlide2 = useRef<any>(null);
	const refSlide3 = useRef<any>(null);
	const refSlide4 = useRef<any>(null);
	const refSlide5 = useRef<any>(null);
	const data = videoSlides([
		refSlide1,
		refSlide2,
		refSlide3,
		refSlide4,
		refSlide5,
	]);
	return (
		<Swiper
			autoplay={{
				delay: data[indexActive].unplayable ? 3000 : 6000,
				disableOnInteraction: false,
			}}
			effect={'fade'}
			modules={[Autoplay, EffectFade]}
			onSlideChange={(e) => {
				data[e.activeIndex].ref?.current?.play();
				setIndexActive(e.activeIndex);
			}}
			className="mySwiper"
		>
			{data.map((slide: any, index: number) => {
				return slide.unplayable ? (
					<SwiperSlide key={index}>
						<img
							src={(isMobile && slide.mobileSrc) || slide.src}
							className="absolute"
							alt=""
						/>
					</SwiperSlide>
				) : (
					<SwiperSlide key={index}>
						<video
							id={`video${index}`}
							ref={slide.ref}
							autoPlay={index === 0}
							loop
							muted
							playsInline
							className="absolute"
						>
							<source
								src={(isMobile && slide.mobileSrc) || slide.src}
								type='video/mp4; codecs="hvc1"'
							/>
							<source
								src={(isMobile && slide.mobileSrc) || slide.src}
								type="video/webm"
							/>
						</video>
					</SwiperSlide>
				);
			})}
		</Swiper>
	);
};

const Home: NextPage = () => {
	const [height, setHeight] = useState<string>();

	const windowHeight = () => {
		setHeight(`${window.innerHeight}px`);
	};

	useEffect(() => {
		window.addEventListener('resize', windowHeight);
		windowHeight();
		return () => {
			window.removeEventListener('resize', () => {});
		};
	}, []);
	return (
		<HomeLayout>
			<Box
				sx={{
					height: height,
				}}
			>
				<VideoSwiper />
			</Box>
			<Box sx={{
				position: 'absolute',
				height: parseFloat(`${height}`)/3,
				width: parseFloat(`${height}`)/3 * 624/425,
				// width: parseFloat(`${height}`)/3 * 640/389,
				top: `${100/3}%`,
				left: 160,
				zIndex: 99,
				// background: 'rgba(255, 255, 255, 0.4)',
				// backdropFilter: 'blur(40px)',
				// borderRadius: '16px',
				// transform: 'skewX(-12deg)',
			}}>
				<Box sx={{
					width: '100%',
					height: '100%',
					position: 'relative',
				}}>
					<Box sx={{
						width: '100%',
						height: '100%',
						background: 'rgba(255, 255, 255, 0.4)',
						backdropFilter: 'blur(40px)',
						borderRadius: '16px',
						transform: 'skewX(-10deg)',
					}}/>
					<Box sx={{
						position: 'absolute',
						height: `${210/425*100}%`,
						width: `${109/624*100}%`,
						bottom: '5%',
						left: '-7.5%',
						backgroundImage: `url(assets/home/neon-stroke1.png)`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'contain',
					}}/>
					<Box sx={{
						position: 'absolute',
						height: `${273/425*100}%`,
						width: `${144/624*100}%`,
						top: '5%',
						right: '-7.5%',
						backgroundImage: `url(assets/home/neon-stroke2.png)`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'contain',
					}}/>
				</Box>
			</Box>
		</HomeLayout>
	);
};

export default Home;

// import type { NextPage } from 'next'
// import React, { ReactNode, useEffect, useRef, useState } from 'react'
// import Head from 'next/head'
// import { Swiper, SwiperSlide } from "swiper/react";
// import { useMediaQuery } from 'react-responsive'
// import styles from '../styles/Home.module.scss'
// import { Pagination, Autoplay, EffectFade } from "swiper";
// import "swiper/css/bundle";
// import 'swiper/css';
// import "swiper/css/effect-fade";
// import "swiper/css/pagination";
// import { toast } from 'react-toastify';
// import dynamic from 'next/dynamic';
// const DynamicSwiper = dynamic(() => import('../components/swiper'), { ssr: false })
// enum typeSlide {
//   img = 1,
//   video = 2,
// }
// type slide = {
//   link: string,
//   linkMB?: string,
//   type: typeSlide,
//   ref?: any,
//   icon: string,
//   content: ReactNode
// }

// const Home: NextPage = () => {
//   const [indexActive, setIndexActive] = useState(0);
//   const [height, setHeight] = useState<string>();
//   const refSlide1 = useRef<any>(null);
//   const refSlide2 = useRef<any>(null);
//   const refSlide3 = useRef<any>(null);
//   const refSlide4 = useRef<any>(null);
//   const refSlide5 = useRef<any>(null);
//   const data = [
//     {
//       link: "/videos/walking.mp4",
//       type: typeSlide.video,
//       ref: refSlide1,
//       icon: "/images/walk.svg",
//       content: <>
//         <h1>Walking</h1>
//         <p>Starting your day with a short walk can
//           offer a number of health benefits & tokens.</p>
//       </>
//     },
//     {
//       link: "/videos/item4.mp4",
//       linkMB: "/videos/runMobile.mp4",
//       type: typeSlide.video,
//       ref: refSlide2,
//       icon: "/images/run.svg",
//       content: <><h1>Running</h1>
//         <p>Exercising with a friend is a great way to keep
//           you motivated. Let&apos;s jog and run and earn tokens.</p></>
//     },
//     {
//       link: "/videos/cycle.mp4",
//       linkMB: "/videos/cycleMobile.mp4",
//       type: typeSlide.video,
//       ref: refSlide3,
//       icon: "/images/cycle.svg",
//       content: <> <h1>Cycling</h1>
//         <p>Regular cycling provides numerous health benefits
//           as your heart, blood vessels and lungs all get a workout.</p></>
//     },
//     {
//       link: "/videos/item2.mp4",
//       type: typeSlide.video,
//       ref: refSlide4,
//       icon: "/images/draw.svg",
//       content: <>
//         <h1>Socializing</h1>
//         <p>Move, checkin and draw amazing artworks on the map.
//           Then share your proof of work-out and inspire the world!</p></>
//     },
//     {
//       link: "/images/item5.jpg",
//       linkMB: "/images/sleepMobile.png",
//       type: typeSlide.img,
//       icon: "/images/sleep.svg",
//       content: <><h1>Sleeping</h1>
//         <p>End your daily routine by a deep sleep.
//           We pay you to sleep scientifically.</p></>
//     }
//   ]
//   const windowHeight = () => {
//     console.log("aaaaaaaaaa");

//     setHeight(`${window.innerHeight}px`)
//   }
//   useEffect(() => {
//     window.addEventListener("resize", windowHeight)
//     windowHeight()
//     return () => {
//       window.removeEventListener('resize', () => { })
//     }
//   }, [])
//   return (
//     <div className={styles.container} style={{ height: height }}>
//       <Head>
//         <title>Befitter</title>
//         <meta name="description" content="In Befitter, your steps are worth more than you think -- exercising and moving outdoors
//   can now earn anyone tokens anytime, anywhere. We believe this simple design can nudge millions into healthier
//   lifestyles and bring them to the Web3 world." />
//         <meta property="og:title" content="Befitter is a Web3 lifestyle app with Social-Fi and Game-Fi elements" />
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content="https://www.befitter.io/" />
//         <meta property="og:image" content="https://befitter.io/images/item.png" />
//         <meta property="og:description" content="In Befitter, your steps are worth more than you think -- exercising and moving outdoors
//   can now earn anyone tokens anytime, anywhere. We believe this simple design can nudge millions into healthier
//   lifestyles and bring them to the Web3 world." />

//         <meta name="twitter:card" content="summary_large_image" />
//         <meta property="twitter:title" content="Befitter is a Web3 lifestyle app with Social-Fi and Game-Fi elements" />
//         <meta property="twitter:description" content="In Befitter, your steps are worth more than you think -- exercising and moving outdoors
//   can now earn anyone tokens anytime, anywhere. We believe this simple design can nudge millions into healthier
//   lifestyles and bring them to the Web3 world." />
//         <meta property="twitter:image" content="https://befitter.io/images/item.png" />
//       </Head>
//       <div className='mobile'>
//         <h1>Phone devices are not supported yet</h1>
//       </div>
//       <div className={styles.main}>

//         <div className={styles.wrapperContent}  >
//           <div style={{ transition: ".7s all cubic-bezier(.88,-0.68,.17,1.48)", transform: `translateY(-${indexActive * 20}%)` }}>
//             {
//               data.map((item: slide, index: number) => <div key={index} className={styles.content}>
//                 {item.content}
//               </div>)
//             }
//           </div>
//         </div>
//         <img src="/images/logomain.png" className={styles.logo} alt="" />
//         <button className={styles.button} onClick={() => {
//           toast('COMING SOON!', {
//             position: "top-center",
//             autoClose: 5000,
//             hideProgressBar: true,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//         }}>PITCH DECK</button>
//         <DynamicSwiper indexActive={indexActive} setIndexActive={setIndexActive} data={data} />
//       </div>
//     </div>
//   )
// }

// export default Home
