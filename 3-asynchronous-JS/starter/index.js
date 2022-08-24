const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) return reject('I could not find that file :(')
            resolve(data); // the promise will return the thing in the ()
        });
    });
};

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('Could not write file :(')
            resolve('Successfully written file :)');
        });
    });
};


const getDogPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);
        
        const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        console.log(res.body.message);
        
        await writeFilePro('dog-img.txt', res.body.message);
        console.log('Random dog image saved to file!');
    } catch (err) {
        console.log(err);
    }
   return ('1.5 Getting ready!!');
};
console.log('Step 1: Getting dog pics');
getDogPic().then(x => { // x = value the promise will return
    console.log(x);
    console.log('Step 2: Done getting dog pics');
});


/* Using promises and .then() ////////////////////////////////////////////////////////////////////////////////////////
readFilePro(`${__dirname}/dog.txt`).then(data => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
}).then(res => {
    console.log(res.body.message);
    return writeFilePro('dog-img.txt', res.body.message);
}).then(() => {
    console.log('Random dog image saved to file!');
}).catch(err => console.log(err));
*/