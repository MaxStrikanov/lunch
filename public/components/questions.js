export const qviz = () => {


    const questions = [{
        
        question: "Пообедаем?",
            options: ["Да", "Нет"]
        },
        {
         question: "Какую кухню вы предпочитаете?",
            options: ["Грузинская", "Итальянская", "Японская", "Французская", "Пирожковопривокзальная"]
        },
        {
            question: "Какую еду вы предпочитаете для пикника?",
            options: ["Сэндвичи", "Фрукты", "Гриль", "Салаты", "Выпечка", "Сырная тарелка"]
        },
        {
            question: "Какой ваш любимый вид пасты?",
            options: ["Спагетти", "Лазанья", "Феттучини", "Пене", "Равиоли", "Тортеллини"]
        },
        {
            question: "Какой ваш любимый способ приготовления мяса?",
            options: ["Жарка на гриле", "Запекание в духовке", "Варка", "Тушение", "Копчение", "Жарка на сковороде"]
        },
        // добавьте остальные вопросы по аналогии
    ];

    let currentQuestion = 0;
    let answers = [];

    function nextQuestion(answer) {
        answers.push(answer);
        currentQuestion++;
        if (currentQuestion < questions.length) {
            displayQuestion();
        } else {
            sendResults();
        }
    }

    function displayQuestion() {
        const questionElem = document.getElementById('question');
        const optionsElem = document.getElementById('options');
        const current = questions[currentQuestion];

        questionElem.innerText = current.question;
        optionsElem.innerHTML = '';
        
        current.options.forEach(option => {
            const button = document.createElement('button');
            button.innerText = option;
            button.onclick = () => nextQuestion(option);
            const li = document.createElement('li');
            li.appendChild(button);
            optionsElem.appendChild(li);
        });
    }

    function sendResults() {
        const botToken = '6037128965:AAFLmI1biwh--7nNrJXOAIfdpApFkJM6Qig';
        const chatId = '587053071';
        const message = `Результаты квиза:\n${answers.join('\n')}`;
        const url =
            `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                document.getElementById('quiz').innerHTML = '<p>Спасибо за участие! Ваши ответы были отправлены.</p>';
            })
            .catch(error => {
                console.error('Ошибка:', error);
                document.getElementById('quiz').innerHTML = '<p>Произошла ошибка при отправке ответов.</p>';
            });
    }

    displayQuestion();

}