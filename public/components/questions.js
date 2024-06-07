export const qviz = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const slides = document.querySelectorAll('.slide');
        const yesButton = document.getElementById('yes-button');
        const noButton = document.getElementById('no-button');
        const cuisineButtons = document.querySelectorAll('.cuisine-button');
        const restaurantButtons = document.querySelectorAll('.restaurant-button');
        const sendResultsButton = document.getElementById('send-results');

        let userData = {
            lunchDecision: '',
            id: '',
            restaurant: '',
            date: ''
        };

        const showSlide = (id) => {
            slides.forEach(slide => slide.classList.remove('active'));
            document.getElementById(id).classList.add('active');
        };

        const nextSlide = (answer) => {
            userData.lunchDecision = answer;
            if (answer === 'yes') {
                showSlide('slide2');
            } else {
                alert('Спасибо! До свидания.');
            }
        };

        const nextCuisine = (cuisine) => {
            userData.cuisine = cuisine;
            showSlide(`slide-${cuisine}`);
        };

        const nextRestaurant = (restaurant) => {
            userData.restaurant = restaurant;
            generateDateOptions();
            showSlide('slide-date');
        };

        const generateDateOptions = () => {
            const dateOptions = document.getElementById('date-options');
            dateOptions.innerHTML = '';
            for (let i = 0; i < 7; i++) {
                const date = new Date();
                date.setDate(date.getDate() + i);
                const dateString = formatDate(date);
                const button = document.createElement('button');
                button.innerText = dateString;
                button.onclick = () => {
                    userData.date = dateString;
                    showResults();
                };
                dateOptions.appendChild(button);
            }
        };

        const formatDate = (date) => {
            const day = date.getDate().toString().padStart(2, '0');
            const monthNames = [
                "января", "февраля", "марта", "апреля", "мая", "июня",
                "июля", "августа", "сентября", "октября", "ноября", "декабря"
            ];
            const month = monthNames[date.getMonth()];
            const year = date.getFullYear();
            return `${day} ${month} ${year}`;
        };

        const trim = (str) => {
            let index = str.indexOf(',');
            if (index !== -1) {
                return str.substring(index + 1).trim();
            }
            return str;
        }

        const showResults = () => {
            const resultsDiv = document.getElementById('results');
            let cutAdress = userData.restaurant.split(',')[0];
            let cutName = trim(userData.restaurant);
            resultsDiv.innerHTML = `
            <p>Заведение: ${cutAdress}</p>
            <p>Адрес: ${cutName}</p>
            <p>Дата: ${userData.date}</p>
        `;
            showSlide('slide-results');
        };

        const submitData = () => {
            const token = 'YOUR_TELEGRAM_BOT_TOKEN';
            const chatId = 'YOUR_TELEGRAM_CHAT_ID';
            const message = `
            Решение: ${userData.lunchDecision}
            Кухня: ${userData.cuisine}
            Заведение: ${userData.restaurant}
            Дата: ${userData.date}
        `;

            fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message
                })
            }).then(response => {
                if (response.ok) {
                    alert('Результаты успешно отправлены!');
                } else {
                    alert('Ошибка при отправке результатов.');
                }
            }).catch(error => {
                console.error('Error:', error);
                alert('Ошибка при отправке результатов.');
            });
        };

        yesButton.onclick = () => nextSlide('yes');
        noButton.onclick = () => nextSlide('no');

        cuisineButtons.forEach(button => {
            button.onclick = () => nextCuisine(button.getAttribute('data-cuisine'));
        });

        restaurantButtons.forEach(button => {
            button.onclick = () => nextRestaurant(button.getAttribute('data-restaurant'));
        });



        showSlide('slide1');
    });
} 