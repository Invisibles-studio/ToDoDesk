import { getAuth, signInWithEmailAndPassword, User, createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
import {initializeApp} from "firebase/app";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
// @ts-ignore
import { User as UserItem } from "../models/User.tsx";
// @ts-ignore
import {Task} from "../models/Task.tsx";
import * as path from "path";


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
const auth = getAuth(app)
const database = getDatabase(app)

export class Firebase{

    static user: User = null

    createUser(data: UserItem, password: string){
        createUserWithEmailAndPassword(auth, data.mail, password).then(async value => {
            let exists = await this.checkIfUserExist(value.user.uid)
            if (!exists){
                data.id = value.user.uid
                this.createUserInDatabase(value.user.uid, data)
            }
        })
    }

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

    clearLocalStorage(){
        localStorage.clear()
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

    async checkIfUserExist(uid: string, create: boolean = false){
        let result = await get(ref(database, 'users/'+uid))

        if (create){
            if (!result.exists()){
                this.createUserInDatabase(uid, {
                    firstname: 'default',
                    lastname: 'default',
                    mail: '',
                    username: generateUniqueID(),
                    role: '',
                    id: uid
                })
            }
        }
        else{
            return result.exists()
        }

    }

    signIn(email: string, password: string, callback: () => void, errorCallback: () => void){

        signInWithEmailAndPassword(auth, email, password)
            .then( value => {
                Firebase.user = value.user
                this.checkIfUserExist(value.user.uid)
                localStorage.setItem('userUid', value.user.uid)
                console.log('Login successful!')
                callback()
            })
            .catch(error => {
                errorCallback()
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(`${errorCode} - ${errorMessage}`)
            })

    }

    getUserProjects(callback: ([]) => void){
        let myProjects = []

        get(ref(database, 'projects')).then(snapshot => {
            if (snapshot.exists()){
                let value = snapshot.val()
                let ids = Object.keys(value)

                for (let i = 0; i<ids.length; i++){
                    let key = ids[i]

                    let project = value[key]

                    let usersInProject = project.usersInProject

                    for (let j = 0; j<usersInProject.length; j++){
                        let uid = usersInProject[j]

                        if (this.getMyUserUid() === uid){
                            myProjects.push(project)
                        }
                    }
                }

                callback(myProjects)
            }
            else{
                callback([])
            }
        })
    }

    createProject(projectName: string){
        let id = generateUniqueID()
        set(ref(database, 'projects/'+id), {
            name: projectName,
            id: id,
            usersInProject: [auth.currentUser.uid],
            data: []
        })
    }

    createTaskInProject(data: Task){

        let countItemsInList = 0


        this.getUserProjects((projects) => {
            for (let i = 0; i<projects.length; i++){
                let project = projects[i]

                if (project.id === data.deskId){

                    if (project.data !== undefined) countItemsInList = project.data.length


                    set(ref(database, 'projects/'+data.deskId+'/data/'+countItemsInList), {
                        ...data
                    })

                    break
                }
            }
        })
    }

    getTaskInProject(projectId: string, callback: (object) => void){
        get(ref(database, 'projects/'+projectId+'/data')).then(snapshot => {
            if (snapshot.exists()){
                let data = {
                    commonList: [],
                    mediumList: [],
                    importantList: [],
                    veryImportantList: [],
                    doneList: []
                }

                let value = snapshot.val()

                for (let i = 0; i<value.length; i++){
                    let obj = value[i]

                    if (obj.columnName === 'Обычные')
                        data.commonList.push(obj)

                    if (obj.columnName === 'Средние')
                        data.mediumList.push(obj)

                    if (obj.columnName === 'Важные')
                        data.importantList.push(obj)

                    if (obj.columnName === 'Очень важные')
                        data.veryImportantList.push(obj)

                    if (obj.columnName === 'Готовые')
                        data.doneList.push(obj)
                }

                callback(data)
            }
        })
    }

    moveTask(data: Task){

        let taskIndex = -1

        this.getUserProjects((projects) => {
            for (let i = 0; i<projects.length; i++){
                let project = projects[i]

                if (project.id === data.deskId){

                    if (project.data !== undefined){
                        for (let j = 0; j < project.data.length; j++) {
                            let task = project.data[j]

                            if (task.id === data.id){
                                taskIndex = j
                                break
                            }
                        }

                        if (taskIndex === -1){
                            return
                        }

                        set(ref(database, 'projects/'+data.deskId+'/data/'+taskIndex), data)

                    }

                    break
                }

            }
        })

    }
}