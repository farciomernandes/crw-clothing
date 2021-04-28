import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyA8LIUStykN-US-T5-Q81eNvXOKjYvric4",
    authDomain: "farcio-ecommerce.firebaseapp.com",
    projectId: "farcio-ecommerce",
    storageBucket: "farcio-ecommerce.appspot.com",
    messagingSenderId: "72587907457",
    appId: "1:72587907457:web:51e9a50463ad11e1fad880",
    measurementId: "G-TJ46FYQ4MS"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
    //This method return a object where have "exists" boolean params.
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };

  export const addCollectionAndDocuments = async(collectionKey, objectsToAdd)=>{
    const collectionRef = firestore.collection(collectionKey);


    const batch = firestore.batch();
    objectsToAdd.forEach(obj=> {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj)
      //batch.set cannot create the data in its firestore. This creates a big call for you to send at another time.
    })

    return await batch.commit();
    //this function creates in your firestore all items set in the batch variable.

  }

  export const convertCollecitonSnapshotToMap = (collections) =>{
    //This function receives collections inside params and transform to arrayDoc's
    const transformedCollections = collections.docs.map(doc=> {
      const { title, items } = doc.data();

      return {
        //encoedURI = Transform string in string of URL
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      }
    })

    //this function receives one array and create one object with the titles.
    return transformedCollections.reduce((acummulator, collection)=> {
      acummulator[collection.title.toLowerCase()] = collection;
      return acummulator;
    }, {})
  }

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//This is authentication for Google account
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

//This is for create a window PopUp authentication
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);


export default firebase;