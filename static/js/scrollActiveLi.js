document.addEventListener('DOMContentLoaded', function() {
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function highlightNavItem(sectionId) {
        const navItems = document.querySelectorAll('.navigation li');
        navItems.forEach(item => item.classList.remove('active'));
        const currentLink = document.querySelector(`.navigation a[href="#${sectionId}"]`);
        if (currentLink) {
            currentLink.closest('li').classList.add('active');
        }
    }

    function getCurrentSection() {
        const sections = document.querySelectorAll('section');
        let currentSection = null;
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.id;
                break;
            }
        }
        return currentSection;
    }

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            bar.style.width = bar.style.width;
        });
    }

    // Проверяем, находится ли пользователь на странице ContactMe
    if (window.location.pathname.includes('#ContactMe')) {
        window.addEventListener('scroll', animateProgressBars);
    }

    window.addEventListener('scroll', function() {
        const currentSection = getCurrentSection();
        if (currentSection) {
            highlightNavItem(currentSection);
            
        }
    });

    const navLinks = document.querySelectorAll('.navigation a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').slice(1);
            scrollToSection(sectionId);
            highlightNavItem(sectionId);
            animateProgressBars();
        });
    });

    const initialSection = getCurrentSection();
    if (initialSection) {
        highlightNavItem(initialSection);
        animateProgressBars();
    }
});
