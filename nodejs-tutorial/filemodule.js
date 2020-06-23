const fs = require('fs');
const { kMaxLength } = require('buffer');

// create a file
// fs.writeFile('example.txt', 'this is an example', (err)=>{
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log('File successfully created.');
//         fs.readFile('example.txt', 'utf-8', (err, file)=>{
//             if (err){
//                 console.log(err);
//             }
//             else {
//                 console.log(file);
//             }
//         });
//     }
// });

// rename a file
// fs.rename('example.txt', 'newExample.txt', (err)=>{
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log('Successfully renamed file.');
//     }
// });

// add to a file
// fs.appendFile('newExample.txt', 'Some data being appended', (err)=>{
//     if(err){
//         console.log(err);
//     }
//     else {
//         console.log('Successfully appended data to file.');
//     }
// });

// delete a file
// fs.unlink('newExample.txt', (err)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log('Successfully deleted file.');
//     }
// });

// make directory
// fs.mkdir('tutorial', (err)=>{
//     if(err){
//         console.log(err);
//     }
//     else {
//         fs.writeFile('./tutorial/example.txt', 'This is a file created inside new directory.', (err)=>{
//             if(err){
//                 console.log(err);
//             }
//             else{
//                 console.log('Folder and file created.');
//             }
//         });
//     }
// });

// delete directory with file inside
// fs.unlink('./tutorial/example.txt', (err)=>{
//     if(err){
//         console.log('Failed');
//     }
//     else{
//         console.log('File deleted. Deleting folder...');
//         fs.rmdir('tutorial', (err)=>{
//             if(err){
//                 console.log(err);
//             }
//             else{
//                 console.log('Folder deleted.');
//             }
//         });
//     }
// });

// delete directory
// fs.rmdir('tutorial', (err)=>{
//     if(err){
//         console.log(err);
//     }
//     else {
//         console.log('Folder deleted.');
//     }
// });


// delete directory with multiple files
fs.readdir('tutorial', (err, files)=>{
    if(err){
        console.log(err);
    }
    else{
        for(let file of files){
            fs.unlink('./tutorial/' + file, (err)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log('Successfully deleted file');
                }
            });
        }
        fs.rmdir('tutorial', (err)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log('Directory deleted.');
            }
        });
    }
});