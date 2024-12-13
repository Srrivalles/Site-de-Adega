// Carrossel simples para a galeria de imagens
const galleryImages = document.querySelectorAll('.gallery img');
let currentIndex = 0;

function rotateGallery() {
    galleryImages[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % galleryImages.length;
    galleryImages[currentIndex].classList.add('active');
}

setInterval(rotateGallery, 3000);

// Mostrar descrição ao passar o mouse nos itens do menu
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const description = item.querySelector('p');
        description.style.display = 'block';
    });
    item.addEventListener('mouseleave', () => {
        const description = item.querySelector('p');
        description.style.display = 'none';
    });
});

// Navegação suave ao clicar nos links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Script para alternar a classe 'active' ao clicar em um item
document.querySelectorAll('.menu-item, .daily-item').forEach(item => {
    item.addEventListener('click', () => {
        // Alterna a classe 'active' ao clicar
        item.classList.toggle('active');
        
        // Se o item estiver ativado, a descrição aparece, e o item aumenta de tamanho
        // Se o item estiver desativado, a descrição desaparece e o tamanho volta ao normal
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Captura os elementos do formulário
    const submitButton = document.getElementById('submit-review');
    const ratingStars = document.querySelectorAll('#rating .star');
    const nameInput = document.getElementById('name');
    const commentInput = document.getElementById('comment');
    const reviewsContainer = document.getElementById('reviews-container');

    let ratingValue = 0; // Inicializa a avaliação com 0 estrelas

    // Marcar estrelas
    ratingStars.forEach(star => {
        star.addEventListener('click', function () {
            ratingValue = parseInt(star.getAttribute('data-value'));
            // Atualiza o visual das estrelas
            ratingStars.forEach(s => {
                s.classList.remove('selected');
            });
            for (let i = 0; i < ratingValue; i++) {
                ratingStars[i].classList.add('selected');
            }
        });
    });

    // Salvar e mostrar a avaliação
    submitButton.addEventListener('click', function (e) {
        e.preventDefault();

        const name = nameInput.value;
        const comment = commentInput.value;

        if (name && comment && ratingValue > 0) {
            const review = {
                name: name,
                comment: comment,
                rating: ratingValue
            };

            // Salva a avaliação no localStorage
            const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
            reviews.push(review);
            localStorage.setItem('reviews', JSON.stringify(reviews));

            // Limpar o formulário
            nameInput.value = '';
            commentInput.value = '';
            ratingStars.forEach(star => star.classList.remove('selected'));
            ratingValue = 0;

            // Atualizar as avaliações exibidas
            displayReviews();
        } else {
            alert('Por favor, preencha todos os campos e avalie com pelo menos 1 estrela.');
        }
    });

    // Exibir avaliações salvas
    function displayReviews() {
        const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviewsContainer.innerHTML = ''; // Limpa a lista de avaliações

        savedReviews.forEach(review => {
            const reviewItem = document.createElement('div');
            reviewItem.classList.add('review-item');
            reviewItem.innerHTML = `
                <h4>${review.name}</h4>
                <p>${review.comment}</p>
                <div class="rating">
                    ${'&#9733;'.repeat(review.rating)}${'&#9734;'.repeat(5 - review.rating)}
                </div>
            `;
            reviewsContainer.appendChild(reviewItem);
        });
    }

    // Carregar as avaliações salvas ao carregar a página
    displayReviews();
});
