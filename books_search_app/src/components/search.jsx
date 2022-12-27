import "../App.css";
import {useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa"

const SearchBar = () => {
    const [state, setState] = useState("");
    const [book, setBook] = useState([]);
    const handleChange = (event)=> {
        const value = event.target.value;
        setState(value);
        console.log(value);
    }

    const handleClick = (e)=> {
        e.preventDefault();
        axios.get("https://www.googleapis.com/books/v1/volumes?q="+{state})
        .then((data)=>{
            console.log(data.data.items);
            setBook(data.data.items);
        }).catch((error)=>{
            console.log(error);
        })
    }

    return (
        <div>
            <div>
                <h1 className="heading">BOOK SEARCH</h1>
            </div>
            <div className="search">
                <input type="text"
                    className="serach_bar"
                    placeholder="Search for a book"
                    onChange={handleChange}
                />
                <button className="btn" onClick={handleClick}><FaSearch /></button>
            </div>
            {book.map((result, i)=>{
                return(
                    <>
                    <img className="img" key={i} src = {result.volumeInfo.imageLinks.thumbnail} alt={result.volumeInfo.authors[0]}/>
                    </>
                )
            })}
        </div>
    )
}
export default SearchBar;