export interface UserInputData {
    
    userName?: string;
    emailId?: string;
    password?: string;
    confirmPassword?: string;
    cafeName?: string;
    location?: {name:string,lat:string,lng:string};
    description?: string;
    deviceToken?: string; 
    user_id?: string;
}