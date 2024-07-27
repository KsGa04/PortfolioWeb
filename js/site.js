function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        smoothScroll(`#${sectionId}`, {
            speed: 1200, // Скорость анимации в миллисекундах
            easing: 'easeInOutCubic', // Функция эффекта анимации
            offset: 0, // Смещение от верха страницы в пикселях
        });
    }
}