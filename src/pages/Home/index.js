import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Intro from './Intro';
import ProjectSummary from './ProjectSummary';

import astrorunTexture2Large from 'assets/astrorun-gameplay-large.jpg';
import astrorunTexture2Placeholder from 'assets/astrorun-gameplay-placeholder.jpg';
import astrorunTexture2 from 'assets/astrorun-gameplay.jpg';

import astrorunTextureLarge from 'assets/astrorun-gameover-large.jpg';
import astrorunTexturePlaceholder from 'assets/astrorun-gameover-placeholder.jpg';
import astrorunTexture from 'assets/astrorun-gameover.jpg';

import escapeGameTexture from 'assets/escape-game.jpg';
import escapeGameTextureLarge from 'assets/escape-game-large.jpg';
import escapeGameTexturePlaceholder from 'assets/escape-game-placeholder.jpg';

import projectThreeTextureLarge from 'assets/project-three-large.jpg';
import projectThreeTexturePlaceholder from 'assets/project-three-placeholder.jpg';
import projectThreeTexture from 'assets/project-three.jpg';

import Profile from './Profile';
import Footer from 'components/Footer';
import { usePrefersReducedMotion, useRouteTransition } from 'hooks';
//import deviceModelsTexture from 'assets/device-models-phone.jpg';
//import deviceModelsTextureLarge from 'assets/device-models-phone-large.jpg';
//import deviceModelsTexturePlaceholder from 'assets/device-models-phone-placeholder.jpg';
//import dttTexture from 'assets/dtt.jpg';
//import dttTextureLarge from 'assets/dtt-large.jpg';
//import dttTexturePlaceholder from 'assets/dtt-placeholder.jpg';
import iphone11 from 'assets/iphone-11.glb';
import macbookPro from 'assets/macbook-pro.glb';
import portrait from 'assets/portrait.glb';
import './index.css';

const disciplines = ['Student', 'Boy', 'Human'];

const Home = () => {
  const { status } = useRouteTransition();
  const { hash, state } = useLocation();
  const initHash = useRef(true);
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const about = useRef();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const revealSections = [intro, projectOne, projectTwo, projectThree, about];


    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px' }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    revealSections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  useEffect(() => {
    const hasEntered = status === 'entered';
    const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;
    let scrollObserver;
    let scrollTimeout;

    const handleHashchange = (hash, scroll) => {
      clearTimeout(scrollTimeout);
      const hashSections = [intro, projectOne, about];
      const hashString = hash.replace('#', '');
      const element = hashSections.filter(item => item.current.id === hashString)[0];
      if (!element) return;
      const behavior = scroll && !prefersReducedMotion ? 'smooth' : 'instant';
      const top = element.current.offsetTop;

      scrollObserver = new IntersectionObserver(
        (entries, observer) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            scrollTimeout = setTimeout(
              () => {
                element.current.focus();
              },
              prefersReducedMotion ? 0 : 400
            );
            observer.unobserve(entry.target);
          }
        },
        { rootMargin: '-20% 0px -20% 0px' }
      );

      scrollObserver.observe(element.current);

      if (supportsNativeSmoothScroll) {
        window.scroll({
          top,
          left: 0,
          behavior,
        });
      } else {
        window.scrollTo(0, top);
      }
    };

    if (hash && initHash.current && hasEntered) {
      handleHashchange(hash, false);
      initHash.current = false;
    } else if (!hash && initHash.current && hasEntered) {
      window.scrollTo(0, 0);
      initHash.current = false;
    } else if (hasEntered) {
      handleHashchange(hash, true);
    }

    return () => {
      clearTimeout(scrollTimeout);
      if (scrollObserver) {
        scrollObserver.disconnect();
      }
    };
  }, [hash, state, prefersReducedMotion, status]);

  return (
    <div className="home">
      <Helmet>
        <title>Kyaw Zayar Soe | Video Game Developer</title>
        <meta
          name="description"
          content="Portfolio of Kyaw Zayar Soe – a video game developer"
        />
        <link rel="prefetch" href={iphone11} as="fetch" crossorigin="" />
        <link rel="prefetch" href={macbookPro} as="fetch" crossorigin="" />
        <link rel="prefetch" href={portrait} as="fetch" crossorigin="" />
      </Helmet>
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Escape From ISS"
        description="Puzzle based escape game made with Unity"
        buttonText="Prototype"
        buttonLink=""
        model={{
          type: 'laptop',
          alt: 'Escape from ISS prototype',
          textures: [
            {
              src: escapeGameTexture,
              srcSet: `${escapeGameTexture} 800w, ${escapeGameTextureLarge} 1440w`,
              placeholder: escapeGameTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Astro Run"
        description="Surfway Surfers inspired game made with Unity"
        buttonText="Visit Project"
        buttonLink="https://pewriebontal.itch.io/astro-run"
        model={{
          type: 'phone',
          alt: 'Astro Run',
          textures: [
            {
              src: astrorunTexture,
              srcSet: `${astrorunTexture} 254w, ${astrorunTextureLarge} 508w`,
              placeholder: astrorunTexturePlaceholder,
            },
            {
              src: astrorunTexture2,
              srcSet: `${astrorunTexture2} 254w, ${astrorunTexture2Large} 508w`,
              placeholder: astrorunTexture2Placeholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Project Three"
        description="Alien Shooter game made with Unity"
        buttonText="Prototype"
        buttonLink=""
        model={{
          type: 'laptop',
          alt: 'Project Three',
          textures: [
            {
              src: projectThreeTexture,
              srcSet: `${projectThreeTexture} 980w, ${projectThreeTextureLarge} 1376w`,
              placeholder: projectThreeTexturePlaceholder,
            },
          ],
        }}
      />
      <Profile
        sectionRef={about}
        visible={visibleSections.includes(about.current)}
        id="about"
      />
      <Footer />
    </div>
  );
};

export default Home;
