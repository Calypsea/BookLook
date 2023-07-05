import './Book.css'
import React, {useContext} from 'react'
import { ThemeContext } from "./context/ViewMode";
export default function Book(props:any){
    const {mode} = useContext(ThemeContext)
    const 
    {
        title,
        subtitle,
        authors,
        publisher,
        publishedDate,
        description,
        pageCount,
        categories,
        avgRating,
        totalRatings,
        imageLinks,
        language,
        favourite
    } = props.book

    let authorString = authors;
    if(authors !== undefined && authors.length > 1)
    {
        authorString =  authors.join(", ")
    }
    
   
    let imageSource = "https://pictures.abebooks.com/isbn/9780465018369-uk.jpg";
    if(imageLinks !== undefined)
    {
        imageSource = imageLinks["thumbnail"];
    }

    function truncateDescription(str:string | undefined, length:number)
    {
        if(str !== undefined)
        {
            if(str.length > length)
            {
                return str.slice(0, length) + '...';
            }
            else 
            {
                return str;
            }
        }
        else 
        {
            return "";
        }
       
    }
    
    let shortenedDescription = truncateDescription(description, 200);

    return(
        <div className='bookElement'>
            <div className="bookImage">
                <img src={imageSource} alt='' className="bookImg"/>
            </div>
            <div className="bookText">
                <div className="topText">
                    <h2>{title}</h2>
                    <p>{subtitle}</p>
                    <p className="author">{authorString}</p>
                    <p>{shortenedDescription}</p>
                    <p>{avgRating !== undefined ? `rating: ${avgRating}/5` : ''}</p>
                </div>
                <button className={`primaryButton button${mode} smallButton`}>Want to read</button>
            </div>

        </div>
    )
}