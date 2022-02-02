import Link from 'next/link';
import Image from 'next/image';
import Work from '../interfaces/Work';

const Card = ({work} : {work: Work}) => {
  return(
    <li key={work.id} style={{maxWidth: 288}} className="shadow my-5 bg-white rounded-md border p-5 w-full h-auto hover:border-blue-500 transition-all duration-150 cursor-pointer">
      <Link href={'/works/' + work.id}>
        <a target="_blank" className="hover:text-blue-500">
          <div className="pb-1" >
            { work.imageUrl
              ? <Image layout="intrinsic" src={work.imageUrl} width="150" height="240" alt="Book cover page preview"/>
              : null
            }
          </div>
          <h6 className="mb-3 break-words h-6 overflow-hidden overflow-ellipsis">
          {
              work?.title 
              ? 'Title: ' + (work?.title?.length > 25 ? work.title.substring(0,25)+'...' : work.title)
              : 'Unknown title'
            }
          </h6>
          <h6 className="mb-4 break-words h-6 overflow-hidden overflow-ellipsis">
            {
              work?.author 
              ? 'Author: ' + (work?.author?.length > 25 ? work.author.substring(0,25)+'...' : work.author)
              : 'Unknown author'
            }
          </h6>
        </a>
      </Link>
      <button className="w-full shadow-sm bg-green-400 hover:bg-green-500 transition-colors duration-200 rounded-md px-4 py-2 text-white">
        Add to favorites
      </button>
    </li>
  );
};

export default Card;
