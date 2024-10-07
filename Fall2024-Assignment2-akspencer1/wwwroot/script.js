
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
        'data:image/jpeg;base64,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'

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


