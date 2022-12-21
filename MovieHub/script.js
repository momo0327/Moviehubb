  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  import { getFirestore, doc, addDoc, getDocs, collection, deleteDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDoaxYRyLnkseyAzh5-NkZnMOScfT6snto",
    authDomain: "moviehubb.firebaseapp.com",
    projectId: "moviehubb",
    storageBucket: "moviehubb.appspot.com",
    messagingSenderId: "1059098941614",
    appId: "1:1059098941614:web:d4fd91ebaeeaf9c7db353f",
    measurementId: "G-BF7J8XX9EM"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const title = document.getElementById('title')
  const genre = document.getElementById('genre')
  const date = document.getElementById('date')
  const userInput = document.getElementById('userInput');

async function saveFirebase(movie) {     //sparar användarens input i firebase
    console.log(movie)
     await addDoc(collection(db,"moviehubb"),movie)
 }

async function getAllMovies(){   //hämtar alla sparade input från firebase
  const userMovies = await getDocs(collection(db,'moviehubb'))
  userMovies.forEach(async(movie) => {
    const displayedFav =                        //displayar alla sparade input från firebase med användning av en ul
    `<ul dataFromFirebase= "${movie.id}">
      

      <li>Title: <span> ${movie.data().title}</span>
      </li>

      <li>Genre: <span> ${movie.data().genre}</span>
      </li>

      <li>Release Date: <span> ${movie.data().date}</span> 
      </li></ul>`

    document.querySelector('.userMovies').insertAdjacentHTML('beforeend',displayedFav)
   
  })
  await deleteUserMovie()
};
getAllMovies()


  async function deleteUserMovie(id){   //tar bort all input som är displayed

   let removeList = document.querySelectorAll('ul')

   removeList.forEach((ul) => {
    ul.addEventListener('click', (event) => {
      const id = event.currentTarget.getAttribute('dataFromFirebase')

      deleteFirebase(id)
    }
    )}
    )
  }
    
  async function deleteFirebase(id){     // tar bort från inputen från själva firebase
      await deleteDoc(doc(db,'moviehubb',id))
    } 
  
    userInput.addEventListener('submit', event => {        
      event.preventDefault();
      console.log(date)
      const formInput = { title: title.value,
        genre: genre.value, 
        date: date.value

       };
      saveFirebase(formInput);
    });
        document.querySelector('#reload').addEventListener('click',()=>{
        location.reload()
      })
    




  