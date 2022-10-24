import { getAuth, signInWithEmailAndPassword, User } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
// @ts-ignore
import { User as UserItem } from "../models/User.tsx";

const firebaseConfig = {
    apiKey: "AIzaSyBgmSXmTRp20MawSUcINaNypQbteZHbIzM",
    authDomain: "tododesk-6160f.firebaseapp.com",
    projectId: "tododesk-6160f",
    storageBucket: "tododesk-6160f.appspot.com",
    messagingSenderId: "28221150821",
    appId: "1:28221150821:web:5c3acc1cc69f8fa20f188c",
    credential: true
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase();

export class Firebase{

    static user: User = null

    setUserData(uid: string, parameter: number, data: any){
        let url = 'users/'+uid+'/'
        switch (parameter) {
            case 1: {
                url += 'username'
                break
            }
            case 2: {
                url += 'firstname'
                break
            }
            case 3: {
                url += 'role'
                break
            }
            case 4: {
                url += 'lastname'
                break
            }
            case 5: {
                url += 'mail'
                break
            }
        }
        set(ref(database, url), data)
    }

    getMyUserUid(){
        return localStorage.getItem('userUid')
    }

    createUserInDatabase(uid: string, data: object){
        set(ref(database, 'users/'+uid), {
            lastSignedIn: new Date().getTime(),
            ...data
        })
    }

    getUserData(uid: string, callback: Function){
        get(ref(database, 'users/'+uid)).then((snapshot) => {
            if(snapshot.exists()){
                callback(snapshot.val())
            }
            else{
                callback(null)
            }
        })
    }

    async getAllUsers(){
        let usersSnapshot = await get(ref(database, 'users'))
        if (usersSnapshot.exists()){
            let users = []
            let data = usersSnapshot.val()
            let keys = Object.keys(data)

            for(let i in keys){
                let user = new UserItem(data[keys[i]])
                users.push(user)
            }
            return users;
        }
        else{
            return null
        }
    }

    checkIfUserExist(uid: string){
        get(ref(database, 'users/'+uid)).then((snapshot) => {
            if (!snapshot.exists()){
                this.createUserInDatabase(uid, {
                    firstname: 'default',
                    lastname: 'default',
                    mail: '',
                    username: generateUniqueID(),
                    role: '',
                    id: uid
                })
            }
        })
    }

    signIn(email: string, password: string){

        signInWithEmailAndPassword(auth, email, password)
            .then( value => {
                Firebase.user = value.user
                this.checkIfUserExist(value.user.uid)
                localStorage.setItem('userUid', value.user.uid)
                console.log('Login successful!')
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(`${errorCode} - ${errorMessage}`)
            })

    }

}