const currentUser : User = {
    name:'Ganaa',
    role: 'owner' as const,
    isLoggedIn:true,
}
export const roles = ['worker' , 'manager' , 'admin' , 'owner']
export interface User {
    name:string,
    role: 'worker' | 'manager'|'admin'|'owner'
    isLoggedIn:boolean,
}
export default currentUser