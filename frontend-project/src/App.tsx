import { Component } from 'react' 
import '../../components/header/header.css'
import '../../components/contentBlock/contentBlock.css'
import '../../components/contentBlock/card.css'
import './../../assets/images/artists/adele.jpg'

const cards = [
  {id : 1,
  image: './assets/images/artists/adele.jpg', 
  link: '', 
  name: 'Adele', 
  genres: ['Pop', 'Soul']},
  {id : 2,
   image: './assets/images/artists/monika liu.jpg',
   link: '', 
   name: 'Monika Liu', 
   genres: ['Pop']},
]

function Header(){
  return(
    <header>
    <div className="searchBar">
    <input type="search" className="searchBar" />
  </div>
  <a className="profileIcon" href="./pages/profile/profilePage.html">
    <img
      src="./assets/icons/user.png"
      alt="An icon of a person's profile view"
    />
  </a>
  <a href="./index.html" style={{'all': 'unset', 'cursor': 'pointer'}}
    ><p className="userProfile">Home page</p></a
  >
  </header>
      
  );
}



function ContentBlock({content, contentTitle}){
  return(
      <section className="contentBlock">
        <BlockHeader title = {'Test'} editable = {true}/>
        <div className="grid">
          {content.map(card =>{
            return(
              <Card key = {card.id}
              image = {card.image} 
              link = {card.link}
              name = {card.name}
              genres = {card.genres}/>
            );
          })}
        </div>
      </section>
  );
}

function BlockHeader({title, editable}) {
  return(
        <div className="header">
          <h1 className="headline">{title}</h1>
          <div className="buttons">
            <p>View by:</p>
            <button>
              <img src="./assets/icons/menu-burger.png" alt="List layout" />
            </button>
            <button>
              <img src="./assets/icons/grid.png" alt="Grid layout" />
            </button>
          </div>
        </div>
  );
}

function Card({image, link, name, genres}){
  return(
    <div className="card">
      <a href={link} className="card__link">
        <img
          src={image}
          alt="Image of ..."
        />
        <h2>{name}</h2>
        <p>{genres}</p>
      </a>
    </div>
  );
}

function App(){
  return (
    <>
      <Header/>
    <main>
      <ContentBlock content = {cards} contentTitle={"My favourite artist"}/>
    </main>
    </>
  )
}

{/* class App extends Component {
  constructor(){
    super();
  }

  render(){
    return (
      <>
        <Header/>
      <main>
        <ContentBlock content = {cards} contentTitle={"My favourite artist"}/>
      </main>
      </>
    )
  }
} */}

export default App
