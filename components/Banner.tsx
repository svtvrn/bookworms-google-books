import Image from 'next/image';

const Banner = ({filePath, figure, artistPage} : {filePath: StaticImageData, figure?: string, artistPage?: string}) => {
  return(
    <div className="banner-container hidden lg:block">
      <Image src={filePath} width="900" height="600" alt="Banner image" priority/>
      <p className="text-sm text-gray-400 text-center mt-2"><a className="pacifico" href={artistPage}>{figure}</a></p>
    </div>
  );
};

export default Banner;