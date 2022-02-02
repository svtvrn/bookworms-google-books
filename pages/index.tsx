import { useRef, ReactNode, useState, useEffect } from 'react'
import { useQuery } from 'react-query';
import type { NextPage } from 'next'
import styles from '../styles/Home.module.scss'
import { useFormik } from 'formik';
import useStore from '../store/store';
import en from '../utils/locales/en';
import gr from '../utils/locales/gr';
import {useRouter} from 'next/router';

import dynamic from 'next/dynamic';

import {searchBooks} from '../api/searchBooks/searchBooks';
import Spin from '../components/Spin';
import Card from '../components/Card';
import Typewriter from 'typewriter-effect';

import AnimatedBanner from '../public/assets/bannerAnimated.webp';
const Banner = dynamic(() => import('../components/Banner'));

const placeholderValues = [
  'J.R.R Tolkien',
  'The Incal',
  'The Girl with the Dragon Tattoo',
  'Jo Nesbo',
  'The Catcher in the Rye',
  'Mark Twain',
  '2001: A Space Odyssey'
]

const Home: NextPage = () => {
  const router = useRouter();
  const {locale} = router;
  const t = locale === 'en' ? en : gr;

  useEffect(()=>{
    return () => setWorks([]);
  }, [])

  const works = useStore((state) => state.works);
  const setWorks = useStore((state) => state.setWorks);

  const searchBarRef = useRef<HTMLInputElement>(null);
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const formik = useFormik({
    initialValues: {
      searchInput: '',
    },
    onSubmit: async values => {
      if(values.searchInput){
        const res = await refetch();
        setWorks(res.data);
      }
    },
  });

  const { isLoading, error, refetch } = useQuery(['searchResults', formik.values.searchInput], searchBooks, { enabled: false, cacheTime: 60000 });


  const scrollToSearchBar = () => {
    if(searchBarRef.current){
      searchBarRef.current.scrollIntoView({behavior: "smooth"});
    }
  };

  const renderResultsList = (): ReactNode => {
    if(isLoading){
      return <Spin/>;
    }
    if(error){
      return <h2>Oops, something went wrong...</h2>;
    }
    if(works){
      return(
        <ul className="flex flex-row flex-wrap justify-center sm:justify-between">
          { works.map((work: any) => {
            if(work){
              return(
                <Card work={work} />                
              );
            }
            return null;
          })}
        </ul>
      );
    }
  }

  return (
    <div>
      <div className="bg-cyan flex flex-row items-center justify-evenly border-b px-4 py-20 md:p-16">
        <span className="lg:mr-12" style={{maxWidth: 625}}>
          <h1 className="text-6xl text-blue-600 font-black mb-5">
            {t.title}
          </h1>
          <h3 className="text-lg text-blue-600 mb-6 max-w-lg">
            {t.subtitle}
          </h3>
          <button
            onClick={scrollToSearchBar}
            className="shadow-sm text-xl border-blue-600 border hover:bg-blue-600 transition-colors duration-200 rounded-md px-5 py-3 text-blue-600 hover:text-white"
          >
            Let's go!
          </button>
        </span>
        <Banner filePath={AnimatedBanner} figure="Artwork by Odd Bleat" artistPage="https://dribbble.com/Odd_Bleat"/>
      </div>

      <main className={`${styles['results-container']} + min-h-100 flex flex-col items-center mx-auto py-20 px-2`}>
        <form
          onSubmit={formik.handleSubmit}
          className="relative my-12 w-full "
        >
          <input
            ref={searchBarRef}
            className="bg-transparent shadow-sm border rounded-lg w-full py-3 pl-4 text-gray-700 leading-tight focus:border-blue-200 focus:outline-none"
            type="text"
            name="searchInput"
            disabled={isLoading}
            onChange={formik.handleChange}
            onBlur={(e) => {
              setShowPlaceholder(true);
              formik.handleBlur(e);
            }}
            onFocus={() => setShowPlaceholder(false)}
            value={formik.values.searchInput}/>
          <span 
            className="inline-flex items-center absolute left-4 top-3 text-gray-400"
            style={{zIndex: -1}} 
          >
            {
              showPlaceholder && !formik.values.searchInput ?
                <Typewriter
                  options={{
                    strings: placeholderValues,
                    autoStart: true,
                    loop: true
                  }}
                />
              : null
            }
          </span>
          <button 
            type="submit"
            className="inline-flex items-center absolute right-0 top-0 rounded-lg rounded-l-none bg-green-400 py-3 px-4 hover:bg-green-500 leading-5 h-full text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="font-sans hidden md:block pr-2">Search</span>
          </button>
        </form>

        <section style={{minHeight: 58}}>
          {renderResultsList()}
        </section>

      </main>
    </div>
  )
}

export default Home;
