import mysql from "mysql";

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "form"
});

connection.connect((error)=>{
    if(error){
        console.error('Error connecting to MySQL database:', error);
    }else{
        console.log('Connected to MySQL database!');
    }
});

export default connection;