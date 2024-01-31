import React, {useState} from 'react'

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from "../context/ViewMode";
import {db} from '../../config/firebase';
import { getDocs, collection} from 'firebase/firestore';
import Book from "../sm_components/Book";
import FavBook from '../sm_components/FavBook';
import LoadingSpinner from "../sm_components/Spinner";


export default function Favourites(props: any)
{ 
    const {mode} = React.useContext(ThemeContext)
     const [isLoading, setIsLoading] = useState<boolean>(false);
    const [displayBooks, setDisplayBooks] = React.useState<JSX.Element[]>([]);
    const [favouriteBooks, setFavouriteBooks] = React.useState<Book[]>([]);
    const [favouriteslist, setFavouritesList] = React.useState<List[]>([{
      bookid: "",
      id: "",
      uid: "",
    }]);

    interface List {
      bookid: string;
      id: string;
      uid: string;
    }
    interface Book {
      id? :string
      volumeInfo?: {
        title?: string;
        subtitle?: string;
        authors?: string[];
        publisher?: string;
        publishedDate?: string;
        description?: string;
        pageCount?: number;
        categories?: string[];
        averageRating?: number;
        ratingsCount?: number;
        language?: string;
        infoLink?: string;
        imageLinks?: {
          thumbnail?: string;
          smallThumbnail?: string;
        };
      };
    }
    
    const favouriteListCollection = collection(db, "favouriteLists");

    const [greetingMessage, setGreetingMessage]= React.useState<string>("");
    const navigate = useNavigate();
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        
        const uid = user.uid;
      } else {
        navigate('../login');
      }
    });
    
   
    React.useEffect(() => {
      const getFavouriteBooks = async () => {
        try {
          // setIsLoading(true);
          const data = await getDocs(favouriteListCollection);
          const filteredData: List[] = data.docs.map((doc) => {
            const docData = doc.data() as List; 
            return { ...docData, id: doc.id };
          });
    
          let URL:string = "https://www.googleapis.com/books/v1/volumes/";
    
          const booksData = await Promise.all(
            filteredData.map(async (item) => {
              const URL_QUERY = URL +  item.bookid;
              const res = await fetch(URL_QUERY);
              const data = await res.json();
              return { id: data.id, volumeInfo: data.volumeInfo };
            })
          );
    
          // Update favouriteBooks in a single batch
          setFavouritesList(filteredData);
          setFavouriteBooks(booksData);
          // setIsLoading(false);
        } catch(err) {
          console.error(err);
        }
      }
      getFavouriteBooks();
    
      
    }, []);
  console.log(favouriteslist)
    React.useEffect(()=> {
      if(favouriteBooks.length > 0)
      {
        let booksArray = favouriteBooks.map((book) => {
          const {
            title,
            subtitle,
            authors,
            publisher,
            publishedDate,
            description,
            pageCount,
            categories,
            averageRating,
            ratingsCount,
            language,
            infoLink,
            imageLinks,
          } = book.volumeInfo || {};
  
          return {
            id: book["id"],
            title: title,
            subtitle: subtitle,
            authors: authors,
            publisher: publisher,
            publishedDate: publishedDate,
            description: description,
            pageCount: pageCount,
            categories: categories,
            avgRating: averageRating,
            totalRatings: ratingsCount,
            imageLinks: imageLinks,
            language: language,
            infoLink: infoLink,
          };
        })
        let displayBooks = booksArray
        .map((book) => {
          return (
            <FavBook
              key={book.id}
              book={book}
            />
          );
        })
        setDisplayBooks(displayBooks);
      }
      

    }, [favouriteBooks])

  
    return(
        <main id={mode}>
           <h2>Your Favourited books: </h2>
            {displayBooks}

          
        </main>
    )
}