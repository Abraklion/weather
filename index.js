
/*------------------------ подключаем модуль ---------------------------------------*/

let express = require('express');
let bodyParser = require('body-parser');

/*---------------------- импортируем самописный модуль -----------------------------*/

let weatherRequest = require('./requests/weather.request');

/*------------------------ запускаем модуль express --------------------------------*/

let app = express();

/*-------------------------------- настройки --------------------------------------*/

// устанавливаем загаловок view engine в значения ejs
app.set('view engine', 'ejs');

// устанавливаем путь к статическим файлам
app.use(express.static('public'));

// настройка для того что бы парсить данные в req.body
app.use(bodyParser.urlencoded({extended : true}))

/*-------------------------------- Запросы GET --------------------------------------*/

// запросы HTTP GET по указанному пути с указанными функциями обратного вызова.
app.get('/', (req, res) => {

  // отдавем визуальный вид клиенту (HTML).
  res.render('index',{weather: null, error: null});

  // завершает процесс ответа.
  // res.end('Hello');
})

/*-------------------------------- Запросы POST --------------------------------------*/

// запросы HTTP POST по указанному пути с указанными функциями обратного вызова. (для отправки данных формы)
app.post('/', async (req, res) =>{

  // деструктурируем обьект req.body
  let { city } = req.body;

  // вызываем функцию и передаем ей город
  const {weather, error} = await weatherRequest(city);

  // отдавем визуальный вид клиенту (HTML).
  res.render('index', {weather, error});
})

/*----------------------- Запускаем сервер на порту 3000 ----------------------------*/

app.listen(3000, () => {
  console.log("Сервер старт!");
})
