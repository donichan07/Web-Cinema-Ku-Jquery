// Fungsi untuk mencari film berdasarkan kata kunci
function cariFilm(kataKunci) {
    const settings = {
        async: true,
        crossDomain: true,
        url: 'https://imdb146.p.rapidapi.com/v1/find/?query=' + encodeURIComponent(kataKunci),
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '83ba6e5840msh9196e4307b2e98ep127a85jsnf4b2369ae3fa',
            'X-RapidAPI-Host': 'imdb146.p.rapidapi.com'
        }
    };

    // Tampilkan animasi loading saat memulai pencarian
    showLoadingAnimation();

    $.ajax(settings).done(function (response) {
        // Sembunyikan animasi loading setelah mendapatkan hasil
        hideLoadingAnimation();

        // Memastikan respons tidak kosong dan memiliki hasil judul film
        if (response && response.titleResults && response.titleResults.results) {
            const hasilFilm = response.titleResults.results;
            let hasilHtml = '<h2>Hasil</h2>';
            // Memproses hasil judul film
            hasilFilm.forEach(function (film) {
                hasilHtml += '<div>';
                hasilHtml += '<h3>' + film.titleNameText + '</h3>';
                hasilHtml += '<img src="' + film.titlePosterImageModel.url + '" alt="' + film.titleNameText + ' Poster">';
                hasilHtml += '</div>';
            });
            
            // Menambahkan hasil ke dalam elemen dengan id 'resultContainer'
            $('#resultContainer').html(hasilHtml);
        }
    });
}

// Menampilkan animasi loading
function showLoadingAnimation() {
    $('#loadingIndicator').show();
}

// Menyembunyikan animasi loading
function hideLoadingAnimation() {
    $('#loadingIndicator').hide();
}

// Menangani pencarian saat tombol ditekan
$(document).ready(function () {
    $('#searchButton').click(function () {
        const kataKunci = $('#searchInput').val().trim();
        if (kataKunci !== '') {
            // Tampilkan animasi loading saat pencarian sedang berlangsung
            showLoadingAnimation();
            // Lakukan pencarian film
            cariFilm(kataKunci);
        } else {
            alert('Masukkan judul film untuk mencari');
        }
    });
});
