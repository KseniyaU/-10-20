// Створи фільмотеку з популярними фільмами, для цього використай
// https://developer.themoviedb.org/reference/trending-movies

// Щоб отримати постер фільму потрібно підставити url
// з відповіді від бекенду та url з документації
// https://developer.themoviedb.org/docs/image-basics

// Відмалюй картки з фільмами
// Приклад картки  => https://prnt.sc/Hi_iLLg7Nd1F

// Реалізуй пагінацію
// 1 Кнопка "Load More"
// 2 Infinity scroll (https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

// *********************** Кнопка "Load More" ************************** \\
// const container = document.querySelector(".js-movie-list")
// const loadMore = document.querySelector(".js-load-more")//кнопка
// let page = 1;

// //реалізація функціоналу кнопки loadMore
// loadMore.addEventListener("click", onLoadMore)


// serviceMovie()
//     .then(data => {
//         container.insertAdjacentHTML("beforeend", createMarkup(data.results))//виклик функції відмальовування запиту з сервісу
//         // console.log(data); // перевірка що отримуємо від серверу
        
//         //якщо поточна сторінка менша загальної кількості сторінок, то будемо відображати кнопку loadMore(даний сервак дає обмеження до 500 сторінки)
//         if (data.page < 500) {
//             loadMore.classList.replace("load-more-hidden", "load-more")//відображаемо кнопку подальшого завантаження через заміну класів через реплейс при першому завантаженні
//         }
//     })
//     .catch(error => console.log(error))//викидання помилки у разі неправильного запиту на сервіс

// //функція з запитом на сервер та поверненням даних

// function serviceMovie(page = 1) {
//     const BASE_URL = "https://api.themoviedb.org/3";
//     const END_POINT = "/trending/movie/week";
//     const API_KEY = "345007f9ab440e5b86cef51be6397df1";//ключ отримуємо при регістрації в api

//     const queryParams = new URLSearchParams({
//         api_key: API_KEY,
//         page: page
//     })
//     //return fetch(`${BASE_URL}${END_POINT}?api_key=${API_KEY}&${page}`)  замість такого запису використовуємо кверіпараметри
//     return fetch(`${BASE_URL}${END_POINT}?${queryParams}`)//запит на сервіс
//         .then(resp => {
//             if (!resp.ok) {
//                 throw new Error (resp.statusText)// викидання помилки у разі не правильної роботи серверу
//             }
//             return resp.json()
//         } )
// }

// //функція для відмалювання того що отримуємо від серверу

// function createMarkup(arr) {
//     return arr.map(({ poster_path, release_date, original_title, vote_average }) => `
//     <li class ="movie-card">
//         <img src = "https://image.tmdb.org/t/p/w500${poster_path}" alt = "${original_title}">
//         <div class = "movie-info">
//             <h2>${original_title}</h2>
//             <p>Дата виходу:${release_date}</p>
//             <p>Рейтинг:${vote_average}</p>
//         </div>
//     </li>
//     `).join("")
// }
// //функція для реалізації кнопки loadMore для її роботи
// function onLoadMore() {
//     page += 1;
//     serviceMovie(page)
//         .then(data => {
//             container.insertAdjacentHTML("beforeend", createMarkup(data.results))
//             //прибираємо помилку в разі якщо page більше ніж кількість доступних сторінок на сервері, перевірка відбувається при кожному натисканні на кнопку loadMore
//             if (data.page >= data.total_pages) {
//                 loadMore.classList.replace("load-more", "load-more-hidden")
//             }
//         })
// }
//кінець програми


// реалізація функції сервіс муві з axios реалізація 1й варіант(ще один варіант)

// function serviceMovie(page = 1) {
//         const BASE_URL = "https://api.themoviedb.org/3";
//         const END_POINT = "/trending/movie/week";
//         const API_KEY = "345007f9ab440e5b86cef51be6397df1";//ключ отримуємо при регістрації в api
    

//         const queryParams = new URLSearchParams({
//         api_key: API_KEY,
//         page: page
//         })
//     return axios.get(`${BASE_URL}${END_POINT}?${queryParams}`)
//         .then(resp => {
//             console.log(resp);
//             return resp.data;
//         })
//         .catch(error => {
//             throw new Error(error)
//         })
// }




// реалізація функції сервіс муві з axios реалізація 2й варіант
//перемалювання createMarkup під асинхронну функцію
// async function render() {
//     try {
//         const data = await serviceMovie()
//         container.insertAdjacentHTML("beforeend", createMarkup(data.results))
//     } catch(error) {
//         console.log("Error!!!", error);
//     }
// }
// render()

// async function serviceMovie(page = 1) { //async виконання коду асинхронно
//     const BASE_URL = "https://api.themoviedb.org/3";
//     const END_POINT = "/trending/movie/week";
//     const API_KEY = "345007f9ab440e5b86cef51be6397df1";//ключ отримуємо при регістрації в api
    
//     const queryParams = new URLSearchParams({
//         api_key: API_KEY,
//         page: page
//     })
//     //обробка поилок через try - catch васинхронних функціях
//     try {
//         const res = await axios.get(`${BASE_URL}${END_POINT}?${queryParams}`)//await чекає спочатку на відповідь з серверу, а потім записує отримані дані в змінну res
//         return await res.data
//     } catch (error) {
//         throw new Error(error)
//     }

    
// }





// ********************************Infinity scroll ********************** \\

//якщо ми доїзжаемо до кінця сторінки то фільми повинні провантажуватися автоматично без натискання на кнопку


const container = document.querySelector(".js-movie-list")
const guard = document.querySelector(".js-guard")
let page = 1;

const option = {//не обовʼязковий елемент але він додає допоміжні можливості
    root: null,
    rootMargin: "300px", //відступ до .js-guard, тобто функція спрацьовує за 300px до .js-guard
    threshold: 0 // частина яку ми бачима в .js-guard перед спрацюванням функції може бути будь-яке значення до 1 (одне ціле)
}

//створюємо спостерігач який буде спостерігати коли потрапить в екран .js-guard(який стоїть в кінці) тоді і будемо відмальовувати нові фільми

const observer = new IntersectionObserver(handlePagination, option)

//відмальовуємо те що отримали від серверу
serviceMovie()
    .then(data => {
        container.insertAdjacentHTML("beforeend", createMarkup(data.results))

        if (data.page < data.total_pages) {
            observer.observe(guard)//кажемо поки остання сторінка менше ніж остання, то спостерігаємо за guard
            
        }
    })
    .catch(error => console.log(error))

//функція з запитом на сервер та поверненням даних

function serviceMovie(page = 1) {
    const BASE_URL = "https://api.themoviedb.org/3";
    const END_POINT = "/trending/movie/week";
    const API_KEY = "345007f9ab440e5b86cef51be6397df1";//ключ отримуємо при регістрації в api

    const queryParams = new URLSearchParams({
        api_key: API_KEY,
        page: page
    })
    //return fetch(`${BASE_URL}${END_POINT}?api_key=${API_KEY}&${page}`)  замість такого запису використовуємо кверіпараметри
    return fetch(`${BASE_URL}${END_POINT}?${queryParams}`)//запит на сервіс
        .then(resp => {
            if (!resp.ok) {
                throw new Error (resp.statusText)// викидання помилки у разі не правильної роботи серверу
            }
            return resp.json()
        } )
}

// //функція для відмалювання того що отримуємо від серверу

function createMarkup(arr) {
    return arr.map(({ poster_path, release_date, original_title, vote_average }) => `
    <li class ="movie-card">
        <img src = "https://image.tmdb.org/t/p/w500${poster_path}" alt = "${original_title}">
        <div class = "movie-info">
            <h2>${original_title}</h2>
            <p>Дата виходу:${release_date}</p>
            <p>Рейтинг:${vote_average}</p>
        </div>
    </li>
    `).join("")
}


function handlePagination(entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {//якщо у властивості isIntersecting зʼявляється true із масива entries то ми номер сторінки збільшуємо на 1 і таким чином додаємо фільми
            page += 1;
            serviceMovie(page)
                .then((data) => {
                    container.insertAdjacentHTML("beforeend", createMarkup(data.results))

                    if (data.page >= data.total_pages) {
                        observer.unobserve(entry.target)
                    }
                })
                .catch(error => console.log(error))
        }
    })
   
}
