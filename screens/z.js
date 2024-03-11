//import axios from 'axios'

const url2 = 'https://animechan.xyz/api/quotes'
const url3 = 'https://reactnative.dev/movies.json'

console.log('start');

fetch(url2)
    .then(response => {
        return response.json()
    })
    .then(data => {

        console.log(data)
    })
    .catch(error => {

        console.error(error)
    })
async function x(){
    const response = await fetch(url3)
    const data = await response.json()
    console.log(data);
}
x()