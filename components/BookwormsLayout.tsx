import React, { ReactChildren } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children?: JSX.Element[] | JSX.Element
}

const BookwormsLayout = ({children}: LayoutProps) => {
  return(
    <div className="min-h-screen flex flex-1 flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default BookwormsLayout;