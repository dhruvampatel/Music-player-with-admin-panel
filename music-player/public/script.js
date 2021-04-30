//Form elements
const artist = document.getElementById('artist');
const song = document.getElementById('song');
const album = document.getElementById('album');
const genre = document.getElementById('genre');
const search = document.getElementById('search');
const reset = document.getElementById('reset');

let socket = io.connect('http://localhost:3000');
            
const connection = setInterval(()=>{
    if(socket.connected){
    console.log('SOCKET - connected');
        clearInterval(connection);
    }
},500);

const disconnect = setInterval(()=>{
    if(!socket.connected){
        console.log('SOCKET - disconnected');
        clearInterval(disconnect);
    }
},500);

socket.on('download-received', (data) => {
    console.log(`SOCKET - download received from server with id: ${data}`);
});

//Song container
let songContainer = document.getElementById('songs');
songContainer.style.visibility = 'hidden';

//image container
const images = document.getElementById('images-background');

//modal container
const modal = document.getElementById('modal-content');
const closeBtn = document.getElementById('close');
modal.style.display = 'none';

const filterData = () => {
    if(checkFormValidation() === true){
        //change visibility to visible
        songContainer.style.visibility = 'visible';

        //remove all the existing rows
        let rows = songContainer.rows.length;
        let songs = document.getElementById('song-row');
        console.log(songContainer.childElementCount);
        if(rows>1){
            console.log(`Length: ${rows}`);
            for(let i=1;i<rows;i++){
                songContainer.deleteRow(1);
            }
        }

        fetch(`http://localhost:3000/search/filterMusic?artist=${artist.value}&song=${song.value}&album=${album.value}&genre=${genre.value}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                for(let i=0;i<data.length;i++){
                    const row = songContainer.insertRow();
                    const cell1 = row.insertCell(0);
                    const cell2 = row.insertCell(1);
                    const cell3 = row.insertCell(2);
                    const cell4 = row.insertCell(3);
                    const cell5 = row.insertCell(4);
                    const cell6 = row.insertCell(5);
                    const cell7 = row.insertCell(6);
                    const cell8 = row.insertCell(7);
            
                    cell1.innerHTML = data[i].artist;
                    cell2.innerHTML = data[i].song;
                    cell3.innerHTML = data[i].time;
                    cell4.innerHTML = data[i].album;
                    cell5.innerHTML = data[i].genre;
                    cell6.innerHTML = data[i].rating;
                    cell7.innerHTML = '<button><i class="fas fa-heart"></i></button>';
                    cell8.innerHTML = '<button><i class="fas fa-download"></i></button>';
        
                    //Favourite click
                    cell7.onclick = () => {
                        fetch(`http://localhost:3000/search/favorite?id=${data[i].id}`, {
                            method: 'GET'
                        })
                        .then(res => res.json())
                        .then(data => {
                            const img = document.createElement('img');
                            img.src = data.image;
                            images.appendChild(img);

                            img.onclick = () => {
                                img.remove();
                            }
                        })
                        .catch(err => console.log(err));
                    }
        
                    //Download click
                    cell8.onclick = () => {
                        socket.emit('download', data[i].id);
                        fetch(`http://localhost:3000/download?id=${data[i].id}`, {
                            method: 'GET'
                        })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                        })
                        .catch(err => console.log(err));

                        modal.style.display = 'block';
                        closeBtn.onclick = () => {
                            modal.style.display = 'none';
                        }
                    }
                }
            })
            .catch(err => console.log(err));
    
        
    } else{
        alert('You must enter atleast 1 search criteria!');
    }
}
//http://localhost:3000/filterMusic?artist=${artist.value}&song=${song.value}&album=${album.value}&genre=${genre.value}

search.onclick = () => {
    filterData();
}

reset.onclick = () => {
    artist.value = '';
    song.value = '';
    album.value = '';
    genre.value = '';
}

//When enter pressed on the following three elements, it will trigger filter function
artist.addEventListener('keyup', (event) => {
    if(event.keyCode === 13){
        filterData();
    }
});

album.addEventListener('keyup', (event) => {
    if(event.keyCode === 13){
        filterData();
    }
});

song.addEventListener('keyup', (event) => {
    if(event.keyCode === 13){
        filterData();
    }
});

const checkFormValidation = () => {
    if(artist.value !== '' || song.value !== '' || album.value !== '' || genre.value !== ''){
        return true;
    }
    return false;
}