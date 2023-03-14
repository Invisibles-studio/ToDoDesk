import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, User, updatePassword, EmailAuthProvider, reauthenticateWithPopup} from "firebase/auth";
import {get, getDatabase, onValue, ref, set, remove} from "firebase/database";
import {initializeApp} from "firebase/app";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
// @ts-ignore
import {User as UserItem} from "../models/User.tsx";
// @ts-ignore
import {Task} from "../models/Task.tsx";
import firebase from "firebase/compat";


const firebaseConfig = {
    apiKey: "AIzaSyCOs-o_jKQB9nuim79YvsTUdmRUVdetzeA",
    authDomain: "tododesk2.firebaseapp.com",
    databaseURL: "https://tododesk2-default-rtdb.firebaseio.com",
    projectId: "tododesk2",
    storageBucket: "tododesk2.appspot.com",
    messagingSenderId: "1011881441412",
    appId: "1:1011881441412:web:8c22ee110a47bef3b52ad1"
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const database = getDatabase(app)

export class Firebase{

    static user: User = null

    createUser(data: UserItem, password: string){
        createUserWithEmailAndPassword(auth, data.mail, password).then(async value => {
            let exists = await this.checkIfUserExist(value.user)
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

    async checkIfUserExist(user: User, create: boolean = false){
        let uid = user.uid
        let result = await get(ref(database, 'users/'+uid))

        if (create){
            if (!result.exists()){
                this.createUserInDatabase(user.uid, {
                    firstname: 'default',
                    lastname: 'default',
                    mail: user.email,
                    username: generateUniqueID(),
                    role: 'Сотрудник',
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
                this.checkIfUserExist(value.user, true)
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

    updateTask(data: Task){

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

    getAllProjects(callback: (object) => void){
        let projects = []

        get(ref(database, 'projects/')).then(snapshot => {
            if (snapshot.exists()){
                let value = snapshot.val()

                let ids = Object.keys(value)

                for (let i = 0; i<ids.length; i++) {
                    let key = ids[i]

                    let project = value[key]
                    projects.push(project)
                }

                callback(projects)
            }
        })
    }

    updateProject(project){
        set(ref(database, 'projects/'+project.id), project)
    }

    async getUserById(id: string){
        let userSnapshot = await get(ref(database, 'users/'+id))

        if (userSnapshot.exists()){
            let value = userSnapshot.val()
            return new UserItem(value)
        }
        else{
            return null
        }
    }

    callbackUpdateTasks(deskId: string, callback: (object) => void){
        onValue(ref(database, 'projects/'+deskId+'/data'), snapshot => {
            let data = {
                commonList: [],
                mediumList: [],
                importantList: [],
                veryImportantList: [],
                doneList: [],
                oneList: [],
                repeatedList: []
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

                data.oneList.push(obj)

                if (obj.repeat !== 0 && obj.finalDone){
                    data.repeatedList.push(obj)
                }

            }

            callback(data)
        })
    }

    addToReport(task: Task){
        let time = new Date()
        let stringDate = time.getFullYear()+"-"+ ((time.getMonth()+1).toString().length === 1 ? '0'+(time.getMonth()+1) : time.getMonth()+1)
        set(ref(database, '/reports/'+task.deskId+'/'+stringDate+'/'+time.getDate()+'/'+task.id), task)
    }

    async getReport(date: string, deskId: string){
        let result = await get(ref(database, '/reports/'+deskId+'/'+date))

        if (result.exists()){
            return result.val()
        }
        else{
            return null
        }
    }

    changePassword(newPassword: string, callbackError: () => void, callbackSuccessful: () => void){
        let user = auth.currentUser
        updatePassword(user, newPassword).then(() => {
            // Update successful.
        }).catch((error) => {
            callbackError()
        });
    }

    getUserTasks(uid: string, callback: (object) => void){
        let myProjects = []
        let myTasks = []

        get(ref(database, 'projects')).then(snapshot => {
            if (snapshot.exists()){
                let value = snapshot.val()
                let ids = Object.keys(value)

                for (let i = 0; i<ids.length; i++){
                    let key = ids[i]

                    let project = value[key]

                    let usersInProject = project.usersInProject

                    for (let j = 0; j<usersInProject.length; j++){
                        let uidProject = usersInProject[j]

                        if (uid === uidProject){
                            myProjects.push(project)
                        }
                    }
                }

                for (let i = 0; i < myProjects.length; i++) {
                    let project = myProjects[i]

                    if (project.data !== undefined && project.data !== null){

                        for (let j = 0; j < project.data.length; j++) {

                            let task = new Task(project.data[j])

                            if (task.executor === uid && !task.finalDone){
                                myTasks.push(task)
                            }


                        }

                    }
                }

                callback(myTasks)

            }
            else{
                callback([])
            }
        })
    }

    removeProject(uid: string){
        remove(ref(database, 'projects/'+uid))
    }
}