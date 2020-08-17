const input = document.getElementById('input');
const search = document.getElementById('search');
const result = document.getElementById('result');
const fancyResult = document.getElementById('fancyResult');

/// api URL ///
const apiURL = 'https://api.lyrics.ovh';
/// adding event listener in form

search.addEventListener('click', e=> {
    e.preventDefault();
    searchValue = input.value.trim();
    // console.log(searchValue);
    if(!searchValue){
        alert("There is nothing to search");
    }
    else{ 
        searchSong(searchValue);
    }
})

//search song 
function searchSong(searchValue){
    fetch(`${apiURL}/suggest/${searchValue}`)
    .then(res => res.json())
    .then(data => showData(data));
}
//display final result in DO
function showData(data){
    result.innerHTML = `
    <ul class="song-list">
      ${data.data.slice(0, 10)
        .map(song=> `<p class="author lead"><strong>${song.title}</strong> Album by <span>${song.artist.name}</span> <button id="getFullLyrics" class="btn btn-success"  data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button></p>`
        )
        .join('')}
    </ul>
  `;
  fancyResult.innerHTML = `
  <div class="single-result row align-items-center my-3 p-3">
    ${data.data.slice(10, 15)
      .map(song=> `
      <div class="col-md-2">
          <img id="picture" src="${song.album.cover_small}" alt="" srcset="" style="width:100%;">
      </div>
      <div class="col-md-7">
      <h3 class="lyrics-name">${song.title}</h3>
      <p class="author lead">Album by <span>${song.artist.name}</span></p>
  </div>
  <div class="col-md-3 text-md-right text-center">
      <button id="getFullLyricsFancy" class="btn btn-success"  data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
  </div>`
      )
      .join('')}
  </div>`;
}
//event listener in get lyrics button
result.addEventListener('click', (e)=>{
    const clickedElement = e.target;

    //checking clicked element is button or not
    if (clickedElement.tagName === 'BUTTON'){
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');
        
        getLyrics(artist, songTitle);
    }
})

//event listener in get lyrics button for Suggested Fancy Area Songs
fancyResult.addEventListener('click', (e)=>{
    const clickedElement = e.target;

    //checking clicked element is button or not
    if (clickedElement.tagName === 'BUTTON'){
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');
        
        getLyrics(artist, songTitle);
    }
})
// Get lyrics for song
function getLyrics(artist, songTitle) {
  
    fetch(`${apiURL}/v1/${artist}/${songTitle}`)
    .then(res => res.json())
    .then(data => {
        const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
        const lyricsResult = document.getElementById('lyricsResult');
        lyricsResult.innerHTML = `<button class="btn go-back">&lsaquo;</button><h2 class="text-success mb-4"><strong>${artist}</strong> - ${songTitle}</h2><pre class="lyric text-white">${lyrics}</pre>`;
    })
  }
