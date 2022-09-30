// require file server
import { readFile } from 'fs';

// declare data arrays
var students = [];
var programs = [];


// export functions
export function initialize() {
    let promise = new Promise(function (resolve, reject) {
        // read students.json
        readFile('./data/students.json', 'utf8', (err, data) => {
            if (err) {
                reject("Error! students.json could not be loaded!");
            } else {
                // parse data into students array
                employees = JSON.parse(data);
                console.log("Success! employees.json loaded!");

                // read programs.json
                readFile('./data/programs.json', 'utf8', (err, data) => {
                    if (err) {
                        reject("Error! programs.json could not be loaded!");
                    } else {
                        // parse data into departments array
                        departments = JSON.parse(data);
                        console.log("Success! departments.json loaded!");
                        resolve('Server initialization successful!');
                    }
                });
            }
        });



    });

    return promise;
}
export function getAllStudents() {
    let promise = new Promise(function (resolve, reject) {
        if (students.length > 0) {
            resolve(students);
        } else {
            reject('No results returned!');
        }
    });

    return promise;
}
export function getInternationaltudents() {
    let InternationalStudents = [];
    let promise = new Promise(function (resolve, reject) {
        // parse employees array
        for (let i = 0; i < students.length; i++) {
            if (students[i].isInternationalStudent == true)
                InternationalStudents.push(employees[i]);

            if (InternationalStudents.length > 0) {
                resolve(InternationalStudents);
            } else {
                reject("No results returned!");
            }
        }
    });

    return promise;
}
export function getPrograms() {
    let promise = new Promise(function (resolve, reject) {
        if (programs.length > 0) {
            resolve(programs);
        } else {
            reject("No results returned");
        }
    });

    return promise;
}