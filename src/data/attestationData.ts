// src/data/attestationData.ts

export type Lang = 'javascript' | 'html' | 'css' | 'markup' | 'bash' | 'json' | 'typescript' | 'plaintext'; // Расширил для примера

export interface Answer {
  text: string;
  isCode?: boolean;
  language?: Lang;
}

// Вот это ключевое изменение для заголовка вопроса
export interface QuestionTitle {
  text: string;      // Основной текст вопроса
  code?: string;     // Опциональный блок кода, относящийся к вопросу
  language?: Lang; // Язык для блока кода в вопросе
  codeBelowText?: boolean; // Флаг, чтобы код отображался под текстом, а не после него в той же строке
}

export interface Question {
  id: number;
  // title: string; // Заменяем строку на объект QuestionTitle
  titleParts: QuestionTitle; // Или просто title: QuestionTitle, если вопрос ВСЕГДА состоит из этих частей
  answer: Answer;
}

export interface Chapter {
  id: string;
  slug: string;
  title: string;
  questions: Question[];
}

export const chapters: Chapter[] = [
  {
    id: '2-1',
    slug: 'glava-2-1-privet-mir',
    title: 'Глава 2.1 – Привет, мир!',
    questions: [
      {
        id: 1,
        titleParts: {
          text: 'Как подключить JavaScript к HTML-странице?',
        },
        answer: {
          text: '<script src="script.js"></script>',
          isCode: true,
          language: 'markup',
        },
      },
      {
        id: 2,
        titleParts: {
          text: 'Можно ли вставлять JavaScript код прямо в HTML?',
        },
        answer: {
          text: `Да, можно использовать тег <script> без атрибута src:
\`\`\`html
<script>
  alert('Привет, мир!');
</script>
\`\`\`
Но для больших скриптов рекомендуется выносить код в отдельные .js файлы.`,
          isCode: false, // Основной текст - не код, но содержит блок кода
        },
      },
      {
        id: 3,
        titleParts: {
          text: 'Что означает атрибут `async` у тега `<script>`?',
        },
        answer: {
          text: 'Атрибут `async` указывает браузеру, что скрипт может быть загружен асинхронно, не блокируя парсинг HTML-документа. Скрипт выполнится сразу после загрузки, независимо от других скриптов или события DOMContentLoaded.',
          isCode: false,
        },
      },
      {
        id: 4,
        titleParts: {
          text: 'Какие еще атрибуты есть у тега `<script>`?',
        },
        answer: {
          text: `src - Указывает путь к внешнему JS-файлу.
async - Загружает скрипт асинхронно (не блокируя HTML-парсинг). Скрипт выполнится сразу после загрузки.
defer - Загружает скрипт в фоне, но выполняет его только после полного разбора HTML.
type - Определяет тип скрипта. По умолчанию — text/javascript.
crossorigin - Управляет CORS-запросами при загрузке скриптов с другого домена.
integrity - Проверяет целостность скрипта через хеш (SHA-256/384/512). Защищает от подмены кода.
nomodule - Выполняет скрипт только в браузерах, не поддерживающих ES-модули. Полезно для legacy-браузеров.
referrerpolicy - Определяет, какие данные Referer отправлять при загрузке скрипта. Значения: no-referrer, origin, strict-origin и др.
Важные примечания:
    - async vs defer:
        - async — порядок выполнения не гарантирован.
        - defer — скрипты выполняются в порядке объявления.
    - Атрибуты async, defer и nomodule не требуют значений (достаточно указать имя атрибута).
    - При использовании src внутренний код (между <script>...</script>) игнорируется.
    - Для современных проектов рекомендуется type="module" (с поддержкой import/export).`,
          isCode: false,
        },
      },
      {
        id: 5,
        titleParts: {
          text: 'Как вывести сообщение в консоль браузера?',
        },
        answer: {
          text: 'console.log("Сообщение");',
          isCode: true,
          language: 'javascript'
        },
      },
      {
        id: 5,
        titleParts: {
          text: 'Что делает следующий код?',
          code: 'alert("Привет, мир!");',
          language: 'javascript',
        },
        answer: {
          text: 'Выводит модальное окно с сообщением "Привет, мир!".',
          isCode: false,
        },
      },
    ],
  },
  {
    id: '2-2',
    slug: 'glava-2-2-struktura-koda',
    title: 'Глава 2.2 – Структура кода',
    questions: [
      {
        id: 6,
        titleParts: {
          text: 'Что такое инструкция в JavaScript?',
        },
        answer: {
          text: 'Инструкция — это отдельная команда, которую интерпретатор выполняет. Например, присваивание значения переменной или вызов функции.',
          isCode: false,
        },
      },
      {
        id: 7,
        titleParts: {
          text: 'Какую роль играют точки с запятой в JavaScript?',
        },
        answer: {
          text: `Точка с запятой (;) используется для разделения инструкций. В некоторых случаях JavaScript может автоматически вставлять их (Automatic Semicolon Insertion - ASI), но лучше ставить явно для избежания ошибок и улучшения читаемости кода.
Пример:
\`\`\`javascript
let message = "Привет";
alert(message);
console.log('Это две инструкции.');
\`\`\``,
          isCode: false, // Основной текст - не код, но содержит блок кода
        },
      },
      {
        id: 8,
        titleParts: {
          text: 'Что такое комментарии и как их использовать?',
        },
        answer: {
          text: `Комментарии используются для пояснения кода. Они игнорируются интерпретатором.
Однострочный комментарий:
\`\`\`javascript
// Это однострочный комментарий
let x = 10; // Это тоже комментарий
\`\`\`
Многострочный комментарий:
\`\`\`javascript
/*
Это
многострочный
комментарий
*/
let y = 20;
\`\`\``,
          isCode: false,
        },
      },
      {
        id: 9,
        titleParts: {
          text: 'Какую роль играют точки с запятой в JavaScript?',
        },
        answer: {
          text: 'Точка с запятой (;) используется для разделения инструкций. В некоторых случаях JavaScript может автоматически вставлять их, но лучше ставить явно для избежания ошибок.',
          isCode: false,
        },
      },
      {
        id: 10,
        titleParts: {
          text: 'Что произойдёт при выполнении следующего кода?',
          code: `let a = 5
let b = 10
console.log(a + b)`,
          language: 'javascript',
        },
        answer: {
          text: 'Код выполнится успешно, так как JavaScript автоматически вставит точки с запятой. Однако рекомендуется ставить их явно.',
          isCode: false,
        },
      },
    ],
  },
  {
    id: '2.3',
    slug: 'glava-2-3-strogiy-rejim',
    title: 'Глава 2.3 – Строгий режим – "use strict"',
    questions: [
        {
            id: 11,
            titleParts: {
                text: 'Что делает директива "use strict"?'
            },
            answer: {
                text: 'Включает строгий режим, который помогает выявить ошибки, запрещает некоторые небезопасные действия и улучшает производительность.'
            }
        },
        {
            id: 12,
            titleParts: {
                text: 'Как включить строгий режим в скрипте?'
            },
            answer: {
                text: '"use strict";',
                isCode: true,
                language: 'javascript'
            }
        },
        {
            id: 13,
            titleParts: {
                text: 'Что произойдёт при выполнении следующего кода?',
                code: `"use strict";
x = 10;`,
                language: 'javascript',
            },
            answer: {
                text: 'Будет ошибка, так как переменная x не была объявлена с помощью let, const или var.'
            }
        },
    ]
  },
  {
    id: '2-4',
    slug: 'glava-2-4-variables',
    title: 'Глава 2.4 – Переменные',
    questions: [
        {
            id: 14,
            titleParts: {
                text: 'Чем отличаются var, let и const?',
            },
            answer: {
                text: `var — устаревший способ объявления переменных, имеет функциональную область видимости.

let — современный способ, имеет блочную область видимости.

const — как let, но значение переменной нельзя изменить после инициализации.`
            }
        },
        {
            id: 15,
            titleParts: {
                text: 'Можно ли объявить переменную без ключевого слова?'
            },
            answer: {
                text: 'В нестрогом режиме можно, но это создаст глобальную переменную. В строгом режиме это вызовет ошибку.'
            }
        },
        {
            id: 16,
            titleParts: {
                text: 'Что произойдёт при выполнении следующего кода?',
                code: `let x = 5;
let x = 10;`,
                language: 'javascript'
            },
            answer: {
                text: 'Будет ошибка, так как переменная x уже была объявлена с помощью let.'
            }
        },
    ]
  },
  {
    id: '2-5',
    slug: 'glava-2-5-types-data',
    title: 'Глава 2.5 – Типы данных',
    questions: [
        {
            id: 17,
            titleParts: {
                text: 'Какие основные типы данных существуют в JavaScript?'
            },
            answer: {
                text: 'Примитивные: number, string, boolean, null, undefined, symbol, bigint. Объекты: object.'
            }
        },
        {
            id: 18,
            titleParts: {
                text: ' Что вернёт typeof null и почему?'
            },
            answer: {
                text: '"object". Это историческая ошибка в JavaScript, null не является объектом.'
            }
        },
        {
            id: 19,
            titleParts: {
                text: 'Чем отличается undefined от null?'
            },
            answer: {
                text: `undefined означает, что переменной не присвоено значение.
null — это "пустое" или "неизвестное" значение, присваивается явно.`
            }
        },
        {
            id: 20,
            titleParts: {
                text: 'Что выведет следующий код?',
                code: `let name = "Виталя";
alert( \`hello ${name}\` );`
            },
            answer: {
                text: 'Выведет: hello Виталя'
            }
        },
    ]
  },
  {
    id: '2-6',
    slug: 'glava-2-6-alert',
    title: 'Глава 2.6 – Взаимодействие: alert, prompt, confirm',
    questions: [
        {
            id: 21,
            titleParts: {
                text: 'Чем отличаются alert, prompt и confirm?'
            },
            answer: {
                text: `alert — показывает сообщение.
prompt — показывает окно с полем ввода.
confirm — показывает окно с кнопками "OK" и "Отмена".`
            }
        },
        {
            id: 22,
            titleParts: {
                text: 'Какой тип данных возвращает prompt?'
            },
            answer: {
                text: `Возвращает строку с введённым значением или null, если нажата "Отмена".`
            }
        },
        {
            id: 23,
            titleParts: {
                text: 'Как обработать отмену в prompt?'
            },
            answer: {
                text: 'Проверить, равен ли результат null.'
            }
        },
        {
            id: 24,
            titleParts: {
                text: 'Что выведет следующий код, если пользователь введёт "5"?',
                code: `let age = prompt("Сколько вам лет?", 100);
alert(\`Вам \${age} лет!\`);`,
                language: 'javascript'
            },
            answer: {
                text: 'Выведет: Вам 5 лет!'
            }
        },
    ]
  },
  {
    id: '2-7',
    slug: 'glava-2-7-preobrazovanie-types',
    title: 'Глава 2.7 – Преобразование типов',
    questions: [
        {
            id: 25,
            titleParts: {
                text: 'Как преобразовать строку в число?'
            },
            answer: {
                text: 'Использовать Number(value) или унарный плюс: +value.'
            }
        },
        {
            id: 26,
            titleParts: {
                text: 'Что произойдёт при сложении строки и числа?'
            },
            answer: {
                text:'Число преобразуется в строку, и произойдёт конкатенация.'
            }
        },
        {
            id: 27,
            titleParts: {
                text: 'Как привести значение к логическому типу?'
            },
            answer: {
                text: 'Использовать Boolean(value) или двойное отрицание: !!',
                language: 'javascript'
            }
        },
        {
            id: 28,
            titleParts: {
                text: 'Что выведет следующий код?',
                code: `alert( Boolean("") );`,
                language: 'javascript'
            },
            answer: {
                text: 'false, так как пустая строка считается ложным значением.'
            }
        },
    ]
  },
  {
    id: '2-8',
    slug: 'glava-2-8-base-math',
    title: 'Глава 2.8 – Базовые операторы, математика',
    questions: [
        {
            id: 29,
            titleParts: {
                text: 'Чем отличаются операторы ++a и a++?'
            },
            answer: {
                text: `++a — префиксная форма, увеличивает a и возвращает новое значение.
a++ — постфиксная форма, возвращает текущее значение a, затем увеличивает его.`
            }
        },
        {
            id: 30,
            titleParts: {
                text: 'Как работает оператор остатка %?'
            },
            answer: {
                text: 'Возвращает остаток от деления первого операнда на второй.'
            }
        },
        {
            id: 31,
            titleParts: {
                text: 'Что делает оператор **?'
            },
            answer: {
                text: 'Возводит число в степень.'
            }
        },
        {
            id: 32,
            titleParts: {
                text: 'Что выведет следующий код?',
                code: `let a = 2;
let b = 3;
alert( a ** b );`,
language: 'javascript'
            },
            answer: {
                text: '8, так как 2 в степени 3 равно 8.'
            }
        },
    ]
  },
  {
    id: '2-9',
    slug: 'glava-2-8-equels',
    title: 'Глава 2.9 – Операторы сравнения',
    questions: [
        {
            id: 33,
            titleParts: {
                text: 'Чем отличается == от ===?'
            },
            answer: {
                text: `== — сравнивает значения после приведения типов.
=== — строгое сравнение, без приведения типов.`
            }
        },
        {
            id: 34,
            titleParts: {
                text: 'Как сравниваются строки в JavaScript?'
            },
            answer: {
                text: 'По порядку символов в Unicode.'
            }
        },
        {
            id: 35,
            titleParts: {
                text: 'Что вернёт выражение?',
                code: 'null == undefined',
                language: 'javascript'
            },
            answer: {
                text: 'true, так как они равны при нестрогом сравнении.',
                language: 'javascript'
            }
        },
        {
            id: 36,
            titleParts: {
                text: 'Что выведет следующий код?',
                code: `alert( "2" > 1 );`,
                language: 'javascript'
            },
            answer: {
                text: 'true, так как строка "2" преобразуется в число 2.'
            }
        },
    ]
  },
  {
    id: '2-10',
    slug: 'glava-2-10-if',
    title: "Глава 2.10 – Условное ветвление: if, '?'",
    questions: [
        {
            id: 37,
            titleParts: {
                text: "Как работает тернарный оператор '?' ?"
            },
            answer: {
                text: 'условие ? значение1 : значение2; Если условие истинно, возвращается значение1, иначе значение2.'
            }
        },
        {
            id: 38,
            titleParts: {
                text: 'Можно ли использовать несколько else if в конструкции if?'
            },
            answer: {
                text: 'Да, можно использовать несколько блоков else if для проверки различных условий.'
            }
        },
    ]
  }
];