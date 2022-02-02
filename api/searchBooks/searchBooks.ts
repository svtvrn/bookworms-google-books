import axios from "axios";
import Work from "../../interfaces/Work";

const API_URL = 'https://www.googleapis.com/books/v1'
const API_KEY = 'AIzaSyBmq6FFuqVjUckT2SdVIByFGvgHcrbKk8Q'

export async function searchBooks({queryKey} : {queryKey: string[]}): Promise<Work[]>{
  const [_, OPTIONS] = queryKey;
  const FIELDS = 'items(id,volumeInfo/title,volumeInfo/authors,volumeInfo/industryIdentifiers,volumeInfo/imageLinks)';
  const makeUrl = `${API_URL}/volumes?q=${OPTIONS}&fields=${FIELDS}&key=${API_KEY}`;
  const response = await axios.get(makeUrl);
  
  if(response){
    const data = response?.data?.items;
    let sanitizedData: Work[] = [];

    for(let item of data){
      const {id} = item;
      const {authors, title, imageLinks, industryIdentifiers} = item.volumeInfo;
      const sanitizedItem = {
        author : Array.isArray(authors) ? authors[0] : authors,
        title,
        id,
        imageUrl: imageLinks?.large ?? imageLinks?.thumbnail,
        identifier: industryIdentifiers[0]
      };
      sanitizedData.push(sanitizedItem)
    }
    return sanitizedData;
  }else{
    throw new Error('Failed to fetch results');
  }
}