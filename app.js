/**
 * ЕВРОТУР
 *
 * У вас намечается отпуск и вы хотите посетить ряд знаменитых городов Европы.
 * Для этого вы заранее купили все билеты (TICKETS).
 * Теперь необходимо разложить их по порядку следования маршруту от Москвы и далее
 */

/**
 * ЗАДАЧА
 *
 * 1. Написать программу, которая возвращает билеты в порядке следования по маршруту.
 * 2. Нарисовать маршрут на карте при помощи ломаной
 */


// TODO: Первая часть
// QUESTION: для чего в пунктах назначения заполнены координаты пунктов отправления?
const TICKETS = [
    {from: 'Москва', to: 'Хельсинки', ticketId: 'DdasnDCqj7', destination: [55.755537, 37.615244]},
    {from: 'Стокгольм', to: 'Копенгаген', ticketId: 'yQEshnCEWw', destination: [59.320525, 18.036706]},
    {from: 'Берлин', to: 'Париж', ticketId: 'Rb3DArShX9', destination: [52.532355, 13.400476]},
    {from: 'Хельсинки', to: 'Стокгольм', ticketId: 'fRqXDQK9LY', destination: [60.171684, 24.990303]},
    {from: 'Париж', to: 'Мадрид', ticketId: 'dn3sFA2Ls3', destination: [48.891820, 2.337958]},
    {from: 'Прага', to: 'Москва', ticketId: 'bgptJCqdCZ', destination: [50.062719, 14.404070]},
    {from: 'Копенгаген', to: 'Амстердам', ticketId: 'zwdRhXAEVt', destination: [55.705771, 12.499597]},
    {from: 'Амстердам', to: 'Берлин', ticketId: '85xZSg4kRR', destination: [52.317435, 4.897058]},
    {from: 'Рим', to: 'Прага', ticketId: '5p4dYzCc5D', destination: [41.865320, 12.467352]},
    {from: 'Мадрид', to: 'Рим', ticketId: '5JwscWBpk5', destination: [40.437118, -3.704523]}
];
// Тут ваш код
// Чтобы упорядочить билеты по стартовому городу только уникальные маршруьы
let unicTickets = new Set(TICKETS);
function orderTickets (tickets, startTown) {
    try {
        return [...tickets].reduce((acc) => {
            let ticketItem = []
            if (acc[0]) {
                let prev = acc[acc.length - 1]
                let to = prev.to
                tickets.delete(prev) //удаляем элемент чтобы сократить прохождения
                ticketItem = [...tickets].filter((ticket) => {
                    return ticket.from === to
                })
            } else {
                ticketItem = [...tickets].filter((ticket) => {
                    return ticket.from === startTown
                })
            }
            if (ticketItem.length > 0) {
                acc.push(ticketItem[0])
            }
            return acc
        }, [])
    } catch (e) {
        console.log('при сортировке билетов что то пошло не так в функции orderTickets ' + e)
    }
}
// Упорядочим билеты из массива TICKETS со стартовым городом Москва
let TicketsInOrder = orderTickets(unicTickets, 'Москва')
// TODO: Вторая часть
/**
 * Для выполнения второго пункта вам может пригодиться Polyline
 * https://tech.yandex.ru/maps/doc/jsapi/2.1/quick-start/tasks/quick-start-docpage/
 */
ymaps.ready(init);
function init() {
    try {
        const MAPCENTER = TicketsInOrder[0].destination
        let coords = TicketsInOrder.map((ticket) => {
            return ticket.destination
        })
        coords = coords.concat([coords[0]])
        let myMap = new ymaps.Map("map", {
            center: MAPCENTER,
            zoom: 5
        }, {
            searchControlProvider: 'yandex#search'
        })
        let myPolyline = new ymaps.Polyline(coords, {
            balloonContent: 'Маршрут Евротура'
        }, {
            strokeColor: '#FF008888'
        })
        myMap.geoObjects.add(myPolyline)
    } catch(e) {
        let defaultMap = new ymaps.Map("map", {
            center: [55.755537, 37.615244],
            zoom: 5
        }, {
            searchControlProvider: 'yandex#search'
        })
        console.log('при посторении маршрута Евротур ошибка: ' + e)
    }
}