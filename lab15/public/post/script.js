$(document).ready(function() {

    function loadPosts() {
        console.log('Loading posts...');
        $.ajax({
            url: '/post/posts.json',
            method: 'GET',
            dataType: 'json',
            success: function(posts) {
                console.log('Posts loaded successfully:', posts);
                displayPosts(posts);
            },
            error: function(error) {
                console.error('An error occurred while loading posts:', error);
            }
        });
    }

    // Функція для відображення постів
    function displayPosts(posts) {
        console.log('Displaying posts:', posts);
        let postsContainer = $('#postsContainer');

        // Очищення контейнера перед вставкою нових постів
        postsContainer.empty();

        // Вставка постів у контейнер
        posts.forEach(function(post) {
            console.log('Adding post:', post);
            let postElement = $('<div class="post">' +
                '<h3>' + post.title + '</h3>' +
                '<p>' + post.body + '</p>' +
                '<button class="likeButton" data-post-id="' + post.id + '">Подобається</button>' +
                '<span class="likeCount">0</span>' +
                '</div>');

            postsContainer.append(postElement);

            // Додаємо обробник події для кнопки "Подобається"
            postElement.find('.likeButton').on('click', function() {
                handleLike(post.id);
            });
        });
    }

    // Функція для обробки події "Подобається"
    function handleLike(postId) {
        console.log('Handling like for post ID:', postId);
        // Здійснюємо Ajax-запит для оновлення статусу "подобається"
        // Уявіть, що ви відправляєте запит на сервер для оновлення даних

        // Оновлюємо візуальний стан кнопки (змінюємо колір або іконку)
        let likeButton = $('[data-post-id="' + postId + '"]');
        likeButton.addClass('liked');

        // Отримуємо поточне значення лічильника лайків та оновлюємо його
        let likeCount = likeButton.siblings('.likeCount');
        let currentCount = parseInt(likeCount.text(), 10);
        likeCount.text(currentCount + 1);
    }

    // Викликаємо функцію завантаження постів при старті сторінки
    loadPosts();
});
