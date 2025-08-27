// import { sliderImages, faqData, initialReviews, notificationNames, notificationCities, participantsImages } from './data.js';
import { sliderImages, faqData, initialReviews, notificationNames, notificationCities, participantsImages } from 'https://cdn.jsdelivr.net/gh/whygithub7/flow-pika-kit1gr@latest/data.js';

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initStickyHeader();
    initMobileMenu();
    initSmoothScroll();
    populateHeroSlider();
    populateParticipantsSlider();
    initSwiper();
    initCountdownTimer();
    populateFaq();
    initFaqAccordion();
    initStockCounter();
    initReviews();
    initOrderForm();
});

function initStickyHeader() {
    const header = document.getElementById('header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const closeBtn = document.getElementById('mobile-menu-close');
    const menu = document.getElementById('mobile-menu');
    const panel = document.getElementById('mobile-menu-panel');
    const links = Array.from(document.querySelectorAll('.mobile-nav-link'));

    const openMenu = () => {
        menu.classList.remove('hidden');
        document.body.classList.add('no-scroll');
        setTimeout(() => {
            panel.classList.remove('-translate-x-full');
            panel.classList.add('translate-x-0');
        }, 10);
    };

    const closeMenu = () => {
        panel.classList.remove('translate-x-0');
        panel.classList.add('-translate-x-full');
        setTimeout(() => {
            menu.classList.add('hidden');
            document.body.classList.remove('no-scroll');
        }, 300);
    };
    
    toggleBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    menu.addEventListener('click', (e) => {
        if (e.target === menu) {
            closeMenu();
        }
    });
    links.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.length > 1) {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function populateHeroSlider() {
    const wrapper = document.getElementById('hero-slider-wrapper');
    if(!wrapper) return;
    
    // Создаем все слайды сразу с изображениями
    wrapper.innerHTML = sliderImages.map(src => `
        <div class="swiper-slide">
            <img src="${src}" class="w-full h-full object-cover" alt="Navarino Icons Product Set" loading="lazy">
        </div>
    `).join('');
}

function populateParticipantsSlider() {
    const wrapper = document.getElementById('participants-slider-wrapper');
    if (!wrapper) return;
    
    // Создаем все слайды сразу с изображениями
    wrapper.innerHTML = participantsImages.map(src => `
        <div class="swiper-slide">
            <img src="${src}" alt="Participant photo" class="w-full h-full object-cover rounded-lg" loading="lazy">
        </div>
    `).join('');
}

function initSwiper() {
    new Swiper('.hero-swiper', {
        effect: 'fade',
        fadeEffect: { crossFade: true },
        autoplay: { delay: 4000, disableOnInteraction: false },
        loop: true,
        allowTouchMove: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    new Swiper('.participants-swiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.participants-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.participants-next',
            prevEl: '.participants-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
        }
    });
}

function initCountdownTimer() {
    const durationInMinutes = 10;
    const countdownContainer = document.getElementById('promo-timer');
    if (!countdownContainer) return;
    
    const countdownElement = document.getElementById('countdown-timer');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    let endTime = localStorage.getItem('countdownEndTime');

    if (!endTime || new Date().getTime() > endTime) {
        endTime = new Date().getTime() + durationInMinutes * 60 * 1000;
        localStorage.setItem('countdownEndTime', endTime);
    }

    const timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance < 0) {
            clearInterval(timerInterval);
            if (countdownElement) {
                 countdownElement.innerHTML = `<div class="text-2xl lg:text-3xl font-bold text-red-600 font-heading">Η προσφορά έληξε!</div>`;
            }
            localStorage.removeItem('countdownEndTime');
            return;
        }

        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (minutesEl && secondsEl) {
            minutesEl.textContent = String(minutes).padStart(2, '0');
            secondsEl.textContent = String(seconds).padStart(2, '0');
        }

    }, 1000);
}

function populateFaq() {
    const container = document.getElementById('faq-container');
    if(!container) return;
    container.innerHTML = faqData.map((item, index) => `
        <div class="faq-item">
            <div class="faq-question">
                <h3 class="font-bold text-lg text-gray-800">${item.question}</h3>
                <div class="faq-icon relative w-6 h-6">
                    <i data-lucide="plus" class="icon-plus text-gray-700 absolute inset-0 transition-opacity duration-300"></i>
                    <i data-lucide="minus" class="icon-minus text-green-700 absolute inset-0 transition-opacity duration-300 opacity-0"></i>
                </div>
            </div>
            <div class="faq-answer">
                <p>${item.answer}</p>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

function initStockCounter() {
    let stock = 80;
    const stockElement = document.getElementById('stock-count');
    const progressBar = document.getElementById('progress-bar');
    const totalStock = 80;

    function updateStock() {
        if (stock > 10) { 
            const decrement = Math.random() < 0.5 ? 1 : 2;
            stock = Math.max(10, stock - decrement);

            stockElement.textContent = stock;
            stockElement.style.transform = 'scale(1.2)';
            setTimeout(() => { stockElement.style.transform = 'scale(1)'; }, 200);

            if ('vibrate' in navigator) {
                navigator.vibrate(100);
            }

            const progressPercentage = (stock / totalStock) * 100;
            progressBar.style.width = `${progressPercentage}%`;

            showPurchaseNotification();
        }
        scheduleStockUpdate();
    }

    function scheduleStockUpdate() {
        const randomInterval = Math.random() * (40000) + 10000;
        setTimeout(updateStock, randomInterval);
    }
    scheduleStockUpdate();
}

function showPurchaseNotification() {
    const name = notificationNames[Math.floor(Math.random() * notificationNames.length)];
    const city = notificationCities[Math.floor(Math.random() * notificationCities.length)];

    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = 'purchase-notification';
    notification.innerHTML = `
        <p class="text-sm">Ο/Η <b>${name}</b> από <b>${city}</b> μόλις έκανε παραγγελία!</p>
        <button class="notification-close-btn">&times;</button>
    `;
    container.prepend(notification);

    setTimeout(() => notification.classList.add('show'), 100);

    const dismiss = () => {
        notification.classList.add('dismissing');
        notification.addEventListener('transitionend', () => notification.remove());
    };
    
    const autoDismissTimeout = setTimeout(dismiss, 6000);
    notification.querySelector('.notification-close-btn').addEventListener('click', () => {
        clearTimeout(autoDismissTimeout);
        dismiss();
    });

    let startX = 0;
    notification.addEventListener('touchstart', e => {
        startX = e.changedTouches[0].screenX;
    }, { passive: true });

    notification.addEventListener('touchend', e => {
        const endX = e.changedTouches[0].screenX;
        if (endX > startX + 50) { 
            clearTimeout(autoDismissTimeout);
            dismiss();
        }
    });
}

function initReviews() {
    const reviewForm = document.getElementById('review-form');
    const imageInput = document.getElementById('reviewer-image-input');
    const fileNameDisplay = document.getElementById('file-upload-filename');

    renderReviews();

    if (imageInput) {
        imageInput.addEventListener('change', () => {
            if (imageInput.files.length > 0) {
                fileNameDisplay.textContent = imageInput.files[0].name;
            } else {
                fileNameDisplay.textContent = 'PNG, JPG, GIF έως 10MB';
            }
        });
    }

    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('reviewer-name').value;
        const rating = parseInt(document.getElementById('reviewer-rating').value);
        const text = document.getElementById('reviewer-text').value;
        const file = imageInput.files[0];

        const saveReview = (imageData) => {
            const newReview = {
                name: name,
                rating: rating,
                text: text,
                image: imageData || null
            };
            let reviews = JSON.parse(localStorage.getItem('userReviews')) || [];
            reviews.unshift(newReview);
            localStorage.setItem('userReviews', JSON.stringify(reviews));
            renderReviews();
            reviewForm.reset();
            document.getElementById('reviewer-rating').value = '';
            if (fileNameDisplay) {
                fileNameDisplay.textContent = 'PNG, JPG, GIF έως 10MB';
            }
        };

        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                saveReview(event.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            saveReview(null);
        }
    });
}

function renderReviews() {
    const reviewsContainer = document.getElementById('reviews-container');
    const storedReviews = JSON.parse(localStorage.getItem('userReviews')) || [];
    const allReviews = [...storedReviews, ...initialReviews.filter(ir => !storedReviews.some(sr => sr.name === ir.name && sr.text === ir.text))];
    
    reviewsContainer.innerHTML = allReviews.map(review => {
        const hasImage = review.image && review.image.trim() !== '';
        const colSpanClass = hasImage ? 'md:col-span-2 lg:col-span-3' : '';
        
        const imageHtml = hasImage ? `<img src="${review.image}" alt="Review image from ${review.name}" class="mt-4 rounded-lg w-full h-auto object-cover max-h-80" loading="lazy">` : '';

        return `
            <div class="review-card ${colSpanClass}">
                <div class="flex items-center mb-2">
                     <h4 class="font-bold text-lg text-gray-800">${review.name}</h4>
                     <div class="review-rating text-lg ml-auto">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                </div>
                <p class="text-gray-600 text-sm flex-grow">\"${review.text}\"</p>
                ${imageHtml}
            </div>
        `;
    }).join('');
}


function initOrderForm() {
    const form = document.getElementById('main-order-form');
    form.addEventListener('submit', e => {
      
        const button = form.querySelector('button');
        button.textContent = 'Ευχαριστούμε για την παραγγελία!';
        button.disabled = true;
        
        // Форма отправляется автоматически, так как у неё есть action
        // После отправки показываем сообщение об успехе
        setTimeout(() => {
             button.textContent = 'ΠΑΡΑΓΓΕΛΙΑ ΜΕ €1.95';
             button.disabled = false;
             form.reset();
        }, 3000);
    });
}
