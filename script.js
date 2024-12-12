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

