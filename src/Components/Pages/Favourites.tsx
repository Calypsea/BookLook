import React, {useState, useEffect} from 'react'
import './Favourites.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';
import { ThemeContext } from "../context/ViewMode";
import {db} from '../../config/firebase';
import { doc,getDocs, deleteDoc,getCountFromServer, collection, query, where } from "firebase/firestore"; 
import Book from "../sm_components/Book";
import FavBook from '../sm_components/FavBook';
import LoadingSpinner from "../sm_components/Spinner";


export default function Favourites(props: any)
{ 
    const {mode} = React.useContext(ThemeContext)
     const [isLoading, setIsLoading] = useState<boolean>(false);
    const [displayBooks, setDisplayBooks] = React.useState<JSX.Element[]>([]);
    const [noBookMessage, setNoBookMessage] = React.useState<JSX.Element | null>(null);
    const [favouriteBooks, setFavouriteBooks] = React.useState<Book[]>([]);
    const [bookCount, setBookCount] = React.useState(0);
    const [favouriteslist, setFavouritesList] = React.useState<List[]>([{
      bookid: "",
      id: "",
      uid: "",
    }]);
    
    const [showMore, setShowMore] = React.useState(false);
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
    
    


    const [greetingMessage, setGreetingMessage]= React.useState<string>("");
    const navigate = useNavigate();
    const auth = getAuth();
    


    React.useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if(user) 
        {
          
          const uid = user.uid;
          const getFavouriteBooks = async () => {
            try {
              // setIsLoading(true);
              
              const favouriteListCollection = collection(db, "favouriteLists");
              const queryWithWhere = query(favouriteListCollection, where('uid', '==', uid));
              const data = await getDocs(queryWithWhere);
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
        }
        else 
        {
          navigate('../login');
        }
      });
      
    
      
    }, [  bookCount]);
    React.useEffect(()=> {
      if(favouriteBooks.length === 0)
      {
        setNoBookMessage(
          <div className="noFavText">
            <p>You have no favourite books!</p>
            <Link className={`browseLink browseLink${mode} `} to="../browse">Go Browse</Link>
          </div>
        );
      }
      else 
      {
        setNoBookMessage(null)
      }
      if(favouriteBooks.length >= 0)
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
              handleClick={deleteFavouriteBook}
            />
          );
        })
        setDisplayBooks(displayBooks);
        
      }
      
       
      
     
      

    }, [favouriteBooks])
    async function countCollections()
    {
      try{
        const coll = collection(db, "favouriteLists");
        const snapshot = await getCountFromServer(coll);
        setBookCount(snapshot.data().count);
      }
      catch(err)
      {
        console.error(err);
      }
    }
    async function deleteFavouriteBook(book:Book)
    {
      try
      {
        const q = query(
          collection(db, 'favouriteLists'),
          where('bookid', '==', book.id),
          where('uid', '==', auth.currentUser?.uid)
        );
        const querySnapshot = await getDocs(q);
        let documentId;
        querySnapshot.forEach((doc) => {
          documentId = doc.id;
        });
        if(documentId)
        {
          await deleteDoc(doc(db, "favouriteLists", documentId));
        }
        countCollections();
        

      }
      catch(err)
      {
        console.error(err);
      }
    }
  
    return(
        <main id={mode}>
           <section className="favouriteBooks">
             <h2 className='favouriteHeader'>Your Favourited books: </h2>
             {noBookMessage}
              {displayBooks}
              
              {greetingMessage}
           </section>
        </main>
    )
}