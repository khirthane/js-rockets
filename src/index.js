import { prepareData, renderData } from './solution';

const url = 'https://api.spacexdata.com/v3/launches/past';

fetch(url)
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
    })
    .then((data) => {
        renderData(prepareData(data));
    })
    .catch((err) => {
        document.getElementById('out').innerText = `Error: ${err.message}`;
    });
