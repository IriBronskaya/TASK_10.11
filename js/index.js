// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  fruitsList.innerHTML = "";
  for (let i = 0; i < fruits.length; i++) {
   var Fruit = document.createElement("li");
   Fruit.className = "fruit__item";

    switch (fruits[i].color) {
      case 'фиолетовый':
        Fruit.className = Fruit.className + ' fruit_violet';
        break
      case 'зеленый':
        Fruit.className = Fruit.className + ' fruit_green';
        break
      case 'розово-красный':
        Fruit.className = Fruit.className + ' fruit_carmazin';
        break
      case 'желтый':
        Fruit.className = Fruit.className + ' fruit_yellow';
        break
      case 'светло-коричневый':
        Fruit.className = Fruit.className + ' fruit_lightbrown';
        break    
    }

    fruitsList.insertBefore(Fruit, null);

    let FruitInfo = document.createElement("div");
   FruitInfo.className = "fruit__info";
    Fruit.insertBefore(FruitInfo, null);

    let frInd = document.createElement("div");
    frInd.innerHTML = 'index: ' + String(i);

    let frKind = document.createElement("div");
    frKind.innerHTML = 'kind: ' + fruits[i].kind;

    let frColor = document.createElement("div");
    frColor.innerHTML = 'color: ' + fruits[i].color;

    let frWeight = document.createElement("div");
    frWeight.innerHTML = 'weight (кг): ' + fruits[i].weight;

    FruitInfo.insertBefore(frInd, null);
    FruitInfo.insertBefore(frKind, null);
    FruitInfo.insertBefore(frColor, null);
    FruitInfo.insertBefore(frWeight, null);
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
function deepEqual(obj1, obj2) {
  return JSON.stringify(obj1) == JSON.stringify(obj2);
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  let index = getRandomInt(0, fruits.length);
  let iniFruits = Object.assign([], fruits);

  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
   while (fruits.length > 0) {
    index = getRandomInt(0, fruits.length - 1);
    result.push(fruits[index]);
    fruits.splice(index, 1);
  }
  fruits = result;
  if (deepEqual(fruits, iniFruits)) {
    alert('Что-то не так!');
  }
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

let minWeight = 0; // мин
let maxWeight = Infinity; // макс

// фильтрация массива
const filterFruits = () => {
  fruits = fruits.filter((element) => {
    if(minWeight <= element.weight && element.weight <= maxWeight)
      return element;    
  });
};

filterButton.addEventListener('click', () => {
  minWeight=parseInt(document.querySelector('.minweight__input').value);
  maxWeight=parseInt(document.querySelector('.maxweight__input').value);
  filterFruits();
  display(fruits);
});


/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
	// TODO: допишите функцию сравнения двух элементов по цвету
	if (a.color === b.color) {
		return 0;
	}
	return a.color < b.color ? -1 : 1;
};

function swap(fruits, firstIndex, secondIndex) {
	const temp = fruits[firstIndex];
	fruits[firstIndex] = fruits[secondIndex];
	fruits[secondIndex] = temp;
};

function partition(fruits, left, right) {
	var pivot = fruits[Math.floor((right + left) / 2)],
		i = left,
		j = right;
	while (i <= j) {
		while (fruits[i] < pivot) {
			i++;
		}
		while (fruits[j] > pivot) {
			j--;
		}
		if (i <= j) {
			swap(fruits, i, j);
			i++;
			j--;
		}
	}
	return i;
};

function quickSort(fruits, left, right) {
	// TODO: допишите функцию быстрой сортировки
	var index;
	if (parseInt(fruits.length) > 1) {
		left = typeof left != "number" ? 0 : left;
		right = typeof right != "number" ? fruits.length - 1 : right;
		index = partition(fruits, left, right);
		if (left < index - 1) {
			quickSort(fruits, left, index - 1);
		}
		if (index < right) {
			quickSort(fruits, index, right);
		}
	}
	return fruits;

};
const sortAPI = {
	bubbleSort(arr, comparation) {
		// TODO: допишите функцию сортировки пузырьком
		const n = fruits.length;
		for (let i = 0; i < n - 1; i++) {
			for (let j = 0; j < n - 1 - i; j++) {
				if (comparation(fruits[j], fruits[j + 1]) === 1) {
					let temp = fruits[j + 1];
					fruits[j + 1] = fruits[j];
					fruits[j] = temp;
				}
			}
		}
	},
	startSort(sort, arr, comparation) {    //выполняет сортировку и производит замер времени
		const start = new Date().getTime();
		sort(arr, comparation);
		const end = new Date().getTime();
		sortTime = `${end - start} ms`;
	},
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
	// TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
	if (sortKind === 'bubbleSort') {
		sortKind = 'quickSort';
	} else {
		sortKind = 'bubbleSort';
	}
	sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {
	// TODO: вывести в sortTimeLabel значение 'sorting...'
	if (sortKind === 'bubbleSort') {
		sortTimeLabel.textContent = 'sorting...';
		const sort = sortAPI[sortKind];
		sortAPI.startSort(sort, fruits, comparationColor);
		display();
		// TODO: вывести в sortTimeLabel значение sortTime
		sortTimeLabel.textContent = sortTime;
	} else {
		sortTimeLabel.textContent = 'sorting...';
		quickSort(fruits, 0, fruits.length - 1);
		sortTimeLabel.textContent = sortTime;
		console.log(sortKind);
		display();
	}
});


/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  if ((kindInput.value === '') || (weightInput.value === '') || (colorInput.value === '')) {
	alert('Не заполнено')
  } else {
     	fruits.push({
			"kind": kindInput.value,
			"color": colorInput.value,
			"weight": weightInput.value
		})
		display();
	}
});