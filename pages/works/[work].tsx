import axios from 'axios';

import Work from '../../interfaces/Work';

const Work = ({data}: { data: Work }): JSX.Element => {
  return(
    <div className="container mx-auto p-44">
      hi
    </div>
  );
};

export async function getServerSideProps(context: any) {
  // Fetch data from external API
  const work = context.params.work;
  const API_KEY = 'AIzaSyBmq6FFuqVjUckT2SdVIByFGvgHcrbKk8Q'
  const FIELDS = 'id,volumeInfo/title,volumeInfo/authors,volumeInfo/industryIdentifiers,volumeInfo/imageLinks';

  // Penguin Random House search by "workid" resource
  const API_WORK_URL = `https://www.googleapis.com/books/v1/volumes/${work}?fields=${FIELDS}&key=${API_KEY}`;
  const res = await axios.get(API_WORK_URL);
  const data = res?.data?.volumeInfo;

  // Pass data to the page via props
  return { props: { data } }
};

export default Work;
