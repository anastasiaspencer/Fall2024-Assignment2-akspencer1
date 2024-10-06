
function displayTime() {
    const now = new Date(); 
    const hours = String(now.getHours()).padStart(2, '0'); 
    const minutes = String(now.getMinutes()).padStart(2, '0'); 
    const seconds = String(now.getSeconds()).padStart(2, '0'); 

    
    const timeString = `${hours}:${minutes}:${seconds}`;

    
    document.getElementById('time').innerHTML = timeString;
    document.getElementById('time').style.display = 'block'; 
    
}

document.getElementById('show-time').addEventListener('click', function () {
    displayTime(); 
    setInterval(displayTime, 1000);
    this.style.display = 'none'; 
});






function apiSearch() {
    var params = {
        'q': $('#query').val(),
        'count': 50,
        'offset': 0,
        'mkt': 'en-us'
    };

    

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': '79d58160fa0c4c53afac532152f85efd'
        }
    })
        .done(function (data) {
            var len = data.webPages.value.length;
            var results = '';
            for (let i = 0; i < len; i++) {
                results += `<p><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
            }

            $('#searchResults').html(results);
            $('#searchResults').dialog();
        })
        .fail(function () {
            alert('error');
        });
}


document.getElementById('searchButton').addEventListener('click', function () {
    const searchResultsDiv = document.getElementById('searchResults');

    searchResultsDiv.style.display = 'block'; 
});

function getLucky() {

    const searchTerm = document.getElementById('query').value;
    const apiUrl = `https://api.bing.microsoft.com/v7.0/search?q=${encodeURIComponent(searchTerm)}`; 

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': '79d58160fa0c4c53afac532152f85efd'
           
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
           
            if (data.webPages && data.webPages.value && data.webPages.value.length > 0) {
                const firstResultUrl = data.webPages.value[0].url; 
                window.location.href = firstResultUrl; 
            } else {
                alert("No results found.");
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}


var currentImageIndex = 0;

function changeBackgroundImage() {
    const images = [
        'https://images.unsplash.com/photo-1527684651001-731c474bbb5a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFzdGhldGljJTIwdHJhaW58ZW58MHx8MHx8fDA%3D',
        'https://images.unsplash.com/photo-1551801841-ecad875a5142?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D'
    ];
    console.log("Background image change triggered."); 
    if (currentImageIndex == 0) {
        currentImageIndex = 1;
    } else {
        currentImageIndex = 0;
    }
    
    document.body.style.backgroundImage = `url(${images[currentImageIndex]})`; 
}


document.getElementById('search-engine-name').addEventListener('click', changeBackgroundImage);


