const dataSource = [
    {
        id: 1,
        artist: 'Journey',
        song: 'Don\'t Stop Believing',
        time: '3:50',
        album: 'Greatest Hints',
        rating: '5',
        genre: 'Rock',
        image: './images/dontstopbelieving.jpg'
    },
    {
        id: 2,
        artist: 'Abba',
        song: 'Dancing Queen',
        time: '4:30',
        album: 'Shout At The Devil',
        rating: '4.5',
        genre: 'Rock',
        image: './images/cover1.jpg'
    },
    {
        id: 3,
        artist: 'Zara Larsson',
        song: 'Poster Girl',
        time: '3:00',
        album: 'Greatest Hints',
        rating: '2',
        genre: 'Rock',
        image: './images/postergirl.jpg'
    },
    {
        id: 4,
        artist: 'Claud',
        song: 'Super Monster',
        time: '3.24',
        album: 'Greatest Hints',
        rating: '5',
        genre: 'Rock',
        image: './images/supermonster.jpg'
    },
    {
        id: 5,
        artist: 'Yungblud',
        song: 'Weird!',
        time: '3:50',
        album: 'Greatest Hints',
        rating: '5',
        genre: 'Pop',
        image: './images/weird.jpg'
    },
    {
        id: 6,
        artist: 'Miley Cyrus',
        song: 'Plastic Hearts',
        time: '4.04',
        album: 'Greatest Hints',
        rating: '5',
        genre: 'Pop',
        image: './images/plasticheart.jpg'
    },
    {
        id: 7,
        artist: 'Kylie Minogue',
        song: 'DISCO',
        time: '5.28',
        album: 'Shout At The Devil',
        rating: '4.5',
        genre: 'Pop',
        image: './images/disco.jpg'
    },
    {
        id: 8,
        artist: 'Sam Smith',
        song: 'Love Goes',
        time: '3:29',
        album: 'Greatest Hints',
        rating: '2',
        genre: 'Pop',
        image: './images/lovegoes.jpg'
    },
    {
        id: 9,
        artist: 'Major Lazer',
        song: 'Music Is the Weapon',
        time: '3:24',
        album: 'Greatest Hints',
        rating: '1',
        genre: 'Heavy Metal',
        image: './images/musicistheweapon.jpg'
    },
    {
        id: 10,
        artist: 'Annie',
        song: ' Dark Hearts',
        time: '6:47',
        album: 'Greatest Hints',
        rating: '3',
        genre: 'Heavy Metal',
        image: './images/darkhearts.jpg'
    },
    {
        id: 11,
        artist: 'Josef Salvat',
        song: 'Modern Anxiety',
        time: '3:50',
        album: 'Greatest Hints',
        rating: '4',
        genre: 'Heavy Metal',
        image: './images/modernanxiety.jpg'
    },
    {
        id: 12,
        artist: 'Mariah Carey',
        song: 'The Rarities',
        time: '4:30',
        album: 'Shout At The Devil',
        rating: '4.5',
        genre: 'Heavy Metal',
        image: './images/therarities.jpg'
    },
    {
        id: 13,
        artist: 'Katy Perry',
        song: 'Smile',
        time: '3:30',
        album: 'Greatest Hints',
        rating: '2',
        genre: 'Heavy Metal',
        image: './images/smile.jpg'
    },
    {
        id: 14,
        artist: 'Kiesza',
        song: 'Crave',
        time: '5:49',
        album: 'Greatest Hints',
        rating: '5',
        genre: 'Heavy Metal',
        image: './images/crave.jpg'
    },
    {
        id: 15,
        artist: 'Jessy Lanza',
        song: 'All the Time',
        time: '3:07',
        album: 'Greatest Hints',
        rating: '4',
        genre: 'Heavy Metal',
        image: './images/allthetime.jpg'
    },
    {
        id: 16,
        artist: 'Ellie Goulding',
        song: 'Brightest Blue',
        time: '3:38',
        album: 'Greatest Hints',
        rating: '3',
        genre: 'Heavy Metal',
        image: './images/brightestblue.jpg'
    },
    {
        id: 17,
        artist: 'Tenille Townes',
        song: 'Lemonade Stand',
        time: '4:31',
        album: 'Shout At The Devil',
        rating: '5',
        genre: 'jazz',
        image: './images/lemonadestand.jpg'
    },
    {
        id: 18,
        artist: 'John Legend',
        song: 'Bigger Love',
        time: '4:00',
        album: 'Greatest Hints',
        rating: '2',
        genre: 'jazz',
        image: './images/biggerlove.jpg'
    },
    {
        id: 19,
        artist: 'Jack Garratt',
        song: 'Love, Death & Dancing',
        time: '3:24',
        album: 'Greatest Hints',
        rating: '3',
        genre: 'jazz',
        image: './images/lovedeathanddancing.jpg'
    },
    {
        id: 20,
        artist: ' Lady Gaga',
        song: 'Chromatica',
        time: '5:21',
        album: 'Greatest Hints',
        rating: '1',
        genre: 'jazz',
        image: './images/chromatic.jpg'
    }
];

module.exports.getMusicData = () => {
    //console.log(`Music data list has length: ${dataSource.length}`);
    return dataSource;
};

module.exports.filterMusic = (artist, song, album, genre) => {
    let filteredData = dataSource;
    //Artist filter
    if(artist !== ''){
        filteredData = filteredData.filter((data) => {
            return data.artist.toLowerCase().includes(artist.toLowerCase());
        });
    } else{
        artist = undefined;
    }
    //album filter
    if(album !== ''){
        filteredData = filteredData.filter((data) => {
            return data.album.toLowerCase().includes(album.toLowerCase());
        });
    } else{
        album = undefined;
    }
    //song filter
    if(song !== ''){
        filteredData = filteredData.filter((data) => {
            return data.song.toLowerCase().includes(song.toLowerCase());
        });
    } else{
        song = undefined;
    }
    //genre filter
    if(genre !== ''){
        filteredData = filteredData.filter((data) => {
            return data.genre.toLowerCase().includes(genre.toLowerCase());
        });
    } else{
        genre = undefined;
    }

    //console.log(`filtered ${filteredData.length} songs..with artist: ${artist}, title: ${song}, album: ${album}, genre: ${genre}`);
    return filteredData;
};

module.exports.addFavorite = (id) => {
    for(let i=0; i<dataSource.length; i++){
        if(dataSource[i].id === id){
            //console.log(`Add favorite song - id: ${id}, artist: ${dataSource[i].artist}, title: ${dataSource[i].song}`);
            return dataSource[i];
        }
    }
};

module.exports.downloadSong = (id) => {
    for(let i=0; i<dataSource.length; i++){
        if(dataSource[i].id === id){
            //console.log(`Download song - id:${id}, artist: ${dataSource[i].artist}, title: ${dataSource[i].title}`);
            return dataSource[i];
        }   
    }
};

