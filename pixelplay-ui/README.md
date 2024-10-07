make a utils folder in src 
and make file of names :- 

constant.js
```
    export const API_KEY = "YOUR_API_KEY";
    export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
```
firebase-config.js
```
    import { initializeApp } from "firebase/app"
    import { getAuth } from 'firebase/auth'

    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_DATABASE_NAME",
        projectId: "YOUR_DATABASE_NAME",
        storageBucket: "YOUR_DATABASE_NAME",
        messagingSenderId: "",
        appId: "",
        measurementId: ""
    };
    const app = initializeApp(firebaseConfig);
    export const firebaseAuth = getAuth(app);
```