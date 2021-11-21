const authServerError = "Указанные данные недействительны"
const authServerError2 = "Эти учетные данные не соответствуют сохраненным."
const authServerError3 = "Ошибка авторизации, проверьте не вошел ли кто нибудь другой в систему, используя ваш ключ!"
const authServerError4 = "Ошибка, вы попытались опубликовать заявку используя при этом чужой ключ! Используйте тот ключ с которого был произведен вход в систему!"
const authServerError5 = "Ошибка авторизации! Авторизиваться снова или выйти?"
const authServerError6 = "Ошибка не найден цифровой ключ!"

const authError = "Не верно указаны данные"
const authError2 = "Введеные учетные данные не соответствуют записям"
const tokenTimoutError = "Ваша ссесия окончилась, авторизуйтесь снова"
const accessError = "У вас нет доступа к этим данным"
const networkAccessError = "У вас проблемы с доступом к ресурсу"
const networkError = "Ошибка сети"
const toManyRequest = "Вы отправили слишком много запросов к серверу, необходимо подождать!"
const serverError1 = "Ошибка на стороне сервера, попробуйте немного подождать и повторить операцию снова, также если скорость вашего соединения с интернетом менее 1мб/с. данные с сервера будут возращаться с небольшой задержкой, подождите их загрузки"
const serverError2 = "Ведутся технические работы"
const serverError3 = "Ошибка сети, у вас слишком низкая скорость доступа к интернету!"
const serverError4 = "Номер лота не найден!"
const deleteReasonError = "Вы не написали причину и не прикрепили файл, данная процедура обязательная!"

const loginError1 = "Заказчик не найден в системе"
const loginError2 = "В тендерах могут участвовать только юридические лица"
const loginError3 = "По выбранным данным, комиссия не найдена!"
const loginError4 = "Ошибка модуля E-IMZO, возможно не выбран или не вставлен ключ"
const loginError5 = "Пользователь под этой учетной записью уже находится в системе!"
const loginError6 = "Ошибка авторизации! Авторизиваться снова или выйти?"
const loginError7 = "Ваша организация не найдена в рейтинговой системе"
const loginError8 = "Организатор не найден в системе"

const customerUploadFilesErrors1 = "Файл сводная таблица пустой, заполните его и переотправьте снова!"
const customerUploadFilesErrors2 = "Файл ведомость физических объемов работ и ресурсов на объект пустой, заполните его и переотправьте снова!"
const customerUploadFilesErrors3 = "Файл таблица цен на основные ценообразующие компоненты пустой, заполните его и переотправьте снова!"
const customerUploadFilesErrors4 = "Файл превысил ограничение в 1000 строк, удалите лишние строки и переотправьте его!"
const customerUploadFilesErrors5 = "Файл превысил ограничение в 3000 строк, удалите лишние строки и переотправьте его!"
const customerUploadFilesErrors6 = "Заголовок файла ведомости физических объемов работ и ресурсов на объект, остался пустым, заполните его и отправьте снова"
const customerUploadFilesErrors7 = "Заголовок файла таблицы цен на основные ценообразующие компоненты, остался пустым, заполните его и отправьте снова"
const customerUploadFilesErrors8 = "Вы не можете отправить файл экспертизы, так как сумма не превышает 5000 базовых расчетных единиц"
const customerRetenderEcpError = "Ошибка, вы не подтвердили паролем электронно цифровую подпись"
// const customerUploadFilesErrors9 = ""
// const customerUploadFilesErrors10 = ""
// const customerUploadFilesErrors11 = ""

const chatError1 = "У вас нет доступа к чату!"

const commissionError1 = "Ошибка авторизации, у вас нет доступа к этому функционалу"
// const commissionError2 = ""

const moderatorError1 = "Вы ввели адрес, который уже используется в системе, измените его и попробуйте снова!"
const moderatorError2 = "Нет доступа"

const cabinetErrors1 = "Информация по данному пользователю не была найдена!"

const offerorErrors1 = "На вашем балансе недостаточно средств, пополните счет"
const offerorErrors2 = "Ошибка отправки заявки! У вас недостаточно средств!"
const offerorErrors3 = "Ошибка отправки заявки! Вы уже отправили данную заявку!"
const offerorErrors4 = "Ошибка на стороне сервера, обратитесь в службу поддержки!"
const offerorErrors5 = "Ваш регион не соответствует требованиям по участию в тендере"
const offerorErrors6 = "Подрядные организации, чьи финансовые обязательства за текущий год превышают в 1,5 раза объем наибольших работ, выполненных строительными подрядчиками за один год из последнего трехлетнего отчетного периода не допускаются для участия в лоте."
const offerorErrors7 = "Ошибка, ваш рейтинг не соответствует для участия в тендере"
const offerorErrors8 = "Ошибка отправки заявки! Вы уже отправили данную заявку!"
const offerorErrors9 = "Ошибка загружаемый вами файл пустой, проверьте его на наличие пустоты, также возможно некорректное его заполнение!"
const offerorErrors10 = "Ошибка, сумма в таблице графика финансирования строительства, отличается от общей суммы, произведите перерасчет и заполните ее заново"
const offerorErrors11 = "Ошибка, в графике строительства вы выбрали даты, которые выходят за рамки заявки"
const offerorErrors12 = "Ошибка, в поле сумма вы ввели некорректное значение или буквы, там должны быть цифры"
const offerorErrors13 = "Ошибка, вы попытались отправить пустоту на сервер"
const offerorErrors14 = "Ошибка, запись не найдена!"
const offerorErrors15 = "Ошибка, выбранные даты превысили граничные даты по тендеру!"
const offerorErrors16 = "Ошибка, вы не отправили файл лицензии, который необходим для успешной подачи заявки! отправьте его"
const offerorErrors17 = "Ошибка, вы не отправили файл банковской гарантии или сертификат!"
const offerorErrors18 = "Ошибка, отправленные вами документы и файлы являются не полными, проверьте все ли отправлено верно и в полном объеме!"
const offerorErrors19 = "Ошибка, вы не отправили сертификат!"

const tenderCreateGrConstErrors1 = "Вы не можете обновить строительные работы"

export default {
    authServerError,
    authServerError2,
    authServerError3,
    authServerError4,
    authServerError5,
    authServerError6,
    deleteReasonError,
    serverError1,
    serverError2,
    serverError3,
    serverError4,
    authError,
    authError2,
    tokenTimoutError,
    accessError,
    networkAccessError,
    networkError,
    toManyRequest,
    loginError1,
    loginError2,
    loginError3,
    loginError4,
    loginError5,
    loginError6,
    loginError7,
    loginError8,
    chatError1,
    commissionError1,
    moderatorError1,
    moderatorError2,
    cabinetErrors1,
    offerorErrors1,
    offerorErrors2,
    offerorErrors3,
    offerorErrors4,
    offerorErrors5,
    offerorErrors6,
    offerorErrors7,
    offerorErrors8,
    offerorErrors9,
    offerorErrors10,
    offerorErrors11,
    offerorErrors12,
    offerorErrors13,
    offerorErrors14,
    offerorErrors15,
    offerorErrors16,
    offerorErrors17,
    offerorErrors18,
    offerorErrors19,
    tenderCreateGrConstErrors1,
    customerUploadFilesErrors1,
    customerUploadFilesErrors2,
    customerUploadFilesErrors3,
    customerUploadFilesErrors4,
    customerUploadFilesErrors5,
    customerUploadFilesErrors6,
    customerUploadFilesErrors7,
    customerUploadFilesErrors8,
    customerRetenderEcpError
}