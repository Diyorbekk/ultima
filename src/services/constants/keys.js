let jwt = require('jsonwebtoken');

const JWT_IDS_KEY = 'c6bc687a7590fedf9a041f7edef21f5702c26acf756f238584d2485827820da165749'
const JWT_USERNAME_KEY = '51A337DC28F5E4D7285D4FFF969D90CA590BEB0971B37C7E9F1263887C8020F2';
const JWT_USER_IN_KEY = 'fee4b150f474a88f55d2e89b22206209150f474a88f5ab58c61389d2fce3defc6bc687a75';
const JWT_ROLE_KEY = '68D50CD6E664D7816CCE186D0BC3D3469082D54CE56586BB3FB757796C821A07';
const JWT_TOKEN_KEY = 'F1666A646ADEFBC8C0BD9D82E46D3F874CF4115A98066262731CEC74B25DFD1D';
const JWT_RATE_KEY = 'D82E46D3F874CF816CCE186D0BC3D3469b0ce721f58c48cd01767222fcd8ca57e5582185bf5d6cd08411';
const JWT_VOTE_KEY = 'eafd1962159db0f94c44295d9cCb70cc2ae91fbe6898d918209150f474a88f79eaf7edef57721f58c48cd017';
const JWT_ACTIVITY_STATUS_KEY = 'ce721f58c48cd0176722255c9037854b0ce721f5702c2e957db0feafd1962159db0f630009468e9c0182da0bba7';
const JWT_USER_ID_KEY = '2dad16f4d7c4f22206209c23219b2a693a227c866fee4b150f474a88f55d2e89bac51df9a04574f0'
const JWT_TENDER_AUTH_LOGIN_URL_KEY = 'df4b08fa6e25ae0bff6fdf78e1a60b50cc27daa5c97800bedd08da64377f3ec9';
const JWT_TENDER_AUTH_LOGOUT_URL_KEY = 'a252211575ab43678ae01e22ee15518f315c38a1d969ee230981e2b4bd69d3ea';
const JWT_TENDER_LIST_URL_KEY = 'c69ee342745fb1070caff37cd8ca57e5582185bf5d98eef8485d07d6546e0df1';
const JWT_TENDER_CREATE_URL_KEY = 'af896d912389d2fce3defc6bc687a7590f74916ef86e3d8ba1c26b176ddf835c';
const JWT_OBJECTS_TYPE_URL_KEY = '59d802caa4573c532b926a8be41e670b2fb984fb63508b4afbda78a1129f6d22';
const JWT_SERVICE_TYPE_URL_KEY = 'c965ff0f4e55c9037854b0ce721f58c48cd01767222f6cd50a6fe95713a61edd';
const JWT_DISTRICTS_URL_KEY = '6c2d6d6b0417d0694e2a04f22206209150f474a88f5ab58c6c2f1c0cd51e3eee';
const JWT_REGIONS_URL_KEY = 'caff37cd8ca57e5582185bf5d98f22206209150f4eac827820da165e0d44518f315c38a1d969ee9a0';
const JWT_CATEGORIES_URL_KEY = '40f1ce7f6e9f0911eafd1962159db0f94c44295d9ce12dad16f4d7c4f07cfa2a';
const JWT_COMMISSION_URL_POST_KEY = 'f14c419e30999cdf7839cf303a79e0ef01b4390b2a135771a48d5592a6b8fbbd';
const JWT_CONSTRUCTIONS_WORKS_URL_POST_KEY = 'df7778e0702c2630009468e9c0182a6179ea2223445a6f8dbec1829e19a5bb4e';
const JWT_UPLOAD_VOLUMES_URL_POST_KEY1 = '0694e2a04f22206209150f474a88f55d2e89bac51df9a045771a48d1f7edefc841131b4ed7c';
const JWT_UPLOAD_VOLUMES_URL_POST_KEY2 = 'de60b7b5c75f756f238584d24855d2e89bac51df9a041f7edefc841131b4ed7c';
const JWT_UPLOAD_VOLUMES_URL_POST_KEY3 = '8ae01e22ee15518f315c38a1d969ee9a041f7edefc8411fdbb277a731b4ed7c';
const JWT_COMMISSION_URL_GET_KEY = 'ea0b13bb8ef7c93265d10f433b15aa9ec2c3f004fd1706f256c3d68a8b738da4';
const JWT_CONSTRUCTIONS_WORKS_URL_GET_KEY = '47448554334eac827820da165e0d4457b9e945f1fdbb277a7aaa508fd09d5665';
const JWT_ENCRYPTION_KEY = 'a856efbc59b20847a20b70cc2ae91fbe6898d91461b97fced9d2edf4d2deb7ab';
const JWT_TENDER_UPDATE_KEY_1 = '6aabf336c553d83e678c4a7d2053b6ad24cbe56925d778c32386e84d10e6bf01';
const JWT_TENDER_UPDATE_KEY_2 = '1171e7155bd82531cc23219b2a693a227c866fee4bcadafd8ce4d7e443e5bf54';
// const JWT_TENDER_UPDATE_KEY_3 = '6bb11365c416a2edff926120756b59e1d91f88d180707971ba0e36d3881845cd';
const JWT_ESTIMATES = '286ea18b0e7a4966bd9a7e4759b9d984d196e403ae7ee040613fda0bba7bb720';
const JWT_CONST_WORKS_DETAILS = 'b49dd5d545066d730c3c251567157a938088d6a6e5863b377c63d11b604afd72';
const JWT_OFFEROR_UPLOAD_ONE = '55c9037854b0ce721f5702c26300cd017721f58c48cd01767222f6cd767222f6cf6cd50a6fe95'
const JWT_OFFEROR_UPLOAD_TWO = '99cdf7839cf303a79e0e5edef58c4ef21ff7edef21f53445a66e25ae0cd0158c48cd01767222f6cd50a6fe95'
const JWT_OFFEROR_UPLOAD_THREE = '1e22ee15518f315c38a1d969ee9a041f7edef58c48cd017721f58c48cd01767222f6cd50a6fe95'
const JWT_OFFEROR_MAIN_UPLOAD_ONE = '8554334eac827820da165e0d445ef58c48cd017721fbe6898d91461b97fced9d25'
const JWT_OFFEROR_MAIN_UPLOAD_TWO = '702c2630009468e9c0182a6179eaf7edef58c48cd017730009468e9c0182a6179ea222345'
const JWT_OFFEROR_MAIN_UPLOAD_THREE = '4f22206209150f474a88f5ab58c6c48cd017721f58d24cbe56925d778c32386e84d'
const JWT_OFFEROR_MAIN_UPLOAD_FOUR = 'f474a88f79eaf7edef5fce0e5def58cf6e25ae0b5b5fc701f5e4258c1215ea2223445a66e25ae0'
const JWT_OFFEROR_GR_CONST_POST = 'c2ae91fbe6898d91461b97fce0e58c48cd017721f58ca1d969ee9a041f7edefc882a61767222f'
const JWT_OFFEROR_PROJECT_ONE = 'b15aa9ec2c3f004630009468e9c062159db0f94c424855d2e89bac514182a61767222f6cffd1706'
const JWT_OFFEROR_MONTHS_DATA_ONE = 'c48cd01767222f6cd50a6fe957db0feafd1962159db0f94c44295d9c1f58c48cd0176722'
const JWT_OFFEROR_SEND_DATA = '0009468e9c062159db0f57deac827820da165e0d4457b9e945f1fdbb8206209150f474722c866fee4bcadafd8ce'
const JWT_OFFEROR_GET_DATA = '518f315c38a1d969ee9a041f7278209150f474a88f79eaf7edef58c48cd017730005ab58c6c2f1c0c2c3f004fd1706f256c3d6'
const JWT_CUSTOMER_GET_EXCELS = '8584d24855d2e89bac51df9a041f7edef21f5702c2630009468e9c0737cd8ca57e558218591461b97fced9d2edf4d'
const JWT_COMFIRM_TENDER = '8e0e58c48cd017721f58ca1d969ee9a041a041f7e9c0182a6179e159db0f94c44295d9c1af7edef58c4e0e58c48cd017721f58c48cd0'
const JWT_COMMISSION_BIDDER = '009468e9c0182a6179ea2223445a66e25ae0bff6fdf78e1a60b50cc27dad017721f58ca1d969ee9a041f7edefca5c97800bedd0'
const JWT_COMMISSION_GET_OFFEROR_DOCS = '69ee9a041f7edef51df9a041f7edef21f53445a66e25ae0bff6fdf78e1a60b50cc27dad017721f58ca1d969ee9702c2630009458c48cd0177'
const JWT_COMMISSION_CHECK = '66d730c3c251567157a938088d6a6ab58c6c48cd017721f58d24cbe550f474a88f79eaf7edef58c48cd017736925d778c3e58'
const JWT_COMMISSION_BIDDER_DETAIL = '5066d730c3c251567157a938088d6ad2e89bac5fce0e58c48cd017721f58ca1d969ee9a1df9a041f7edef21f5702c26e5863'
const JWT_UPLOAD_CONTRACT_CUSTOMER = 'eac827820da165e0d4457b150f474a88f5ab58c6c48cd017721f57721f51f5702c2630009468e9c0737cd8ca57'
const JWT_UPLOAD_PSD_CUSTOMER = '0feafd1962159db0f94c442915ef21f5702c2630009468e9c0737cd8ca557b150f474a89150f21ff79eaf7edef58c48cd017736925d'
const JWT_OFFEROR_DATA = '8a1d969ee9a041f7edef58c4ef21ff7edefd2457b150f478d017721f58d24cbe5567222f6cdbff6f2185911f57721fcd017721f58c48cd01767222f6cd'
const JWT_COM_RESULT_DATA = '3445a66e25ae0bff8ca57e5582185911f57721f017721f5def58c5a66e25ae0bff6fdf78721f58c48cd01767222f6cdbff6f218d1962159db0f94c44295d9'
const JWT_COMPLETE_TENDERS_K = '209150f474a88f79edef58c4ef21ff7be550f474a88f79d017721f58cf583445a66e25ae0cd0145a66e25ae0c1f58c48cd0'
const JWT_MY_TENDERS_CAB_K = 'a66e25ae0bff6fdf78e1a60b58cc6c48cd017721f58d24cbe555a66e25ae0bff6fdf758d24cbe55'
const JWT_CURRENT_TIME_K = '474a88f5ab58c6c48cd01df9a041f7e94c44295d9c1af7ede3445a66e25ae25ae0bff66e25ae0bff6fdf'
const JWT_GRAPHC_CONSTRUCTION_KEY = 'ce0e58c48cd017721f58c1567157a938088d6ad2e89bac538088d6ad2e89bac5fce0e58c421f5702c2630009468e9c07'
const JWT_CHECK_PAGE_ONE_KEY = '6c48cd017721f58d2e9a041f779ea2223445a66e25ae0bff6fdf78e1a60b5278209150f474a88f'
const JWT_CHECK_PAGE_TWO_KEY = 'f21f5702c2630009468eda165e0d4457b150f474a89150f474a88f79eaf7ecd017721f58d24cdc0'
const JWT_REGV2_KEY = '9150f474a88f79eaf7edef58eda165e0d4457b150f474a892915ef21f5702c2674a88f79d017721f5'
const JWT_DISV2_KEY = 'f58d24cbe555a66e25ae0bff6fd5e0d423445a66e25ae0bff60f474a88f7721f5def58c5a61f58d6'
const JWT_DIS_GET_KEY = 'ea2223445a165e0d4c48cd017721f58d2457b150f4788f79edef58c4ef4a66e25ae0bff6e94c44295d9cf'
const JWT_COM_VOICE_POS_KEY = '58c1567157a938088f5702c2630009468e97b9e945f1fdbb8206209150f58c5ab58c6c48cd017721f57721f5'
const JWT_TOKEN_REFRESH_KEY = '938088d6ad2e89bac5fce0cd017721f58c1567157e658cc6c48cd0174ef21ff7be550f474a88f721f58d6ec6c48cd01772'
const JWT_ADD_OBJECT_TYPE_KEY = 'c44295d9c1af7ed969ee9a041a041f7e9c0182afe95209150f474a88f79eaf7edef58c48cd0177300058f75a66e25ae25a'
const JWT_MAP_STAT_KEY = '41f779ea22234411f57721f017721f5def58c5a0915e25ae0bff6fdf76c48cd017721f577200e0bff6fdf78721f58'
const JWT_STAT_ST_KEY = '82a6179eaf7edef159db0f94c442915efa025ae0bff6fdf78e1a6915e25550f474a88f79eaf7edecd017721f041f7edef21f53445'
const JWT_VERSION_KEY = '2223445a6f21f53445a66ec6c48cd017721f6e25ae0bff3445a66e25ae0bff6fd6f5e0d4457b9e945f1fdbb829150f58c5ab5062'
const JWT_BALANCE_KEY = 'd2457b150f478d2457b150f478cd017721f6e25ae0b57b57b150f474a89150f150f474a89150f5e0d44457b150f474a89150f474'
const JWT_MEMBERS_KEY = 'd017721f58d2457b1578cd017721f6e2557a938088d6ad2e89bac5fce0eac5fce0e58c4f58ca1150f474a891f474a88f79e'
const JWT_MESSAGES_KEY = 'd017721f6e25ae0bff3445a66e25ae78cd017721f7157e658cc6c48cd014a89150f150f47421f5702c2674a88f79d0'
const JWT_SEND_MESSAGE_KEY = 'dcd017721f58c1567157a93d017721f6e25892915ef21f5702c74a89150f150f474a891501a041f7e9c0182afe952'
const JWT_NEWS_KEY = '7721f6e25ae0bff3445a66e25ae0b58c5a0915e25ae0bff6fdf76c4f6e25892915ef21f5702c21f01ac5fce0e58c4def58c5a0915e'
const JWT_NEWS_UPDATE_KEY = '7edef58c4ef21ff7e5ae0bff60f474a8defd2457b150f47c0182afe95209150f474a88f79ea8d017721f58d24cb'
const JWT_DEL_TENDER_KEY = 'eda165e0d447721f6e258e97b9e945f1fdbb8206209150f58c5abae041a041f7e9c0182afe90bff344557b150f474a'
const JWT_TENDER_CONFIRMATION_KEY = 'f7157e658cc6c48cd014a89150f1f1fcd017721f6e25ae0bff3441a04ac5fce0e58cac5fce0e58c4450f474aac5fce0e58c4'
const JWT_TENDER_MODER_KEY = '017721f58c1567157e658cc617721f1f5def58c5a0915e25ae02630009468e97b9e950f150f474a891a89150f150f474a891'
const JWT_CHAT_OFFEROR_KEY = 'c48cd017721f6e25ae021f1f5def586e25892915ef21f5702c74a89150f17b9e5702c2674a88f79d0'
const JWT_CHAT_CUSTOMER_KEY = '041a041f7e9c0182afe95209f5def58c5a017721f7157e658cc6c48cd014a897b9e9017721f58c1567157e658cc6c'
const JWT_BALL_OFF_KEY = 'f474a8defd2457b150f45def58c5a017721f7157fce0cd01ce0eac5fce0e58c4f58ca1150f4e658cc6c48cd014a897b94f6e25892915ef21f5702c21'
const JWT_CANCEL_MOD_KEY = 'd017721f7157e658cc6c48cd014a89150f17721f6e25ae0b57b57b150f47f014a89150f150f47421f57c6c48cd014a8975e25ae0bff6fdf76c48'
const JWT_CUNSULT_SEND_KEY = '658cc617721f1f4a89150f5def58c5a0915e25a57e658cc6c48cd0174ef21ff7be550f476c48cd014a8975e25557a938088d6ad2e89bac5fc'
const JWT_CUNSULT_LIST_KEY = 'e658cc6c48cd014a89def478cd017721f6e25ae0b48cd010182afe95209150f474a8814a8975e0bff6fdf78e1a6915e25550f474a88'
const JWT_CUST_SC_KEY = '1f1f5def9defe95209f5def58c5a017721f7157e658cc6c48cd014a897658cc6c48cd014f58ca1150f4e658ccbff60f474a8defd'
const JWT_REQ_SC_KEY = '25ae0b57b57b150f4478cd017721f6e25c5a017721f7157fce0cff6fdf78ef014a89150f150f47421f5'
const JWT_CUST_NAME_SC_KEY = 'ec6c67157a93d5def586e25892915ef21f5701772167157a93d017721f6e2589248cd017721f6e25ae0bff3445a'
const JWT_CUS_REQ_KEY = 'f014a89150f150f47421f0cd01ce0eac5fce0e58c4f58c1f7157fce0c6c48cd01749f5def58c5a017721'
const JWT_FAILED_REQ_KEY = 'def58c5a017721f7157fce0cd01ce21f7157e658cc6c48cd014ade772f58c858cc6c48cd0174ef21ff7b'
const JWT_NOTIFICATIONS_REQ_KEY = 'e0b48cd010182afe95209150f4c6c421f6e25ae0b48cd010182afe958cd014ade7ef58c5a017721f7157e6'
const JWT_ECP_KEY = '157e658ccf58c5a017721f71576c48cd014a89150f17721f6e25ae0b57b57b15658cc6c48cd014a897b9e90177'
const JWT_LICENSE_CUSTOMER_KEY = '1f7157e658cc6c48cd0f7157157f2167157a93d0177257b57b155ae0b48cd010182afe95209'
const JWT_TENDER_CREATE_IN_REQ_KEY = '25892915ef21f5701209150f4c6c421f6e25ae0b48cd010187157a14a897658cc6c48c'
const JWT_TENDER_CHECK_COMMISSION_KEY = '4c6c421f6e25ae0b48cf4c6ccc6c48cd014ade421f014ade772f58c858cc10187ce21f7157e658cc'
const JWT_TENDER_CANCEL_OFFEROR_KEY = '1fcd017721f6e25aebf4c6c421f6e25ae0b48cd0121f014a897658cc6c414ade82afe95209150f474a8814a'
const JWT_TENDER_CANCEL_CUSTOMER_KEY = '150f17721f6c421f6e25ae0b48cd0121f01f6e25ae0b48cd010182457e658cc6c48cd014a89150f1772'
const JWT_TENDER_READY_FOR_COM_KEY = 'ce21f7157e658cc6cae0b48cd0c5fce0e58c4f58c1f71577e658cc6c42167157a93d017721f6e'
const JWT_TENDER_VOICE_ACCEPT_KEY = '0f4c6c421f6e8cd0c5fce0e5def58c5a017721f7157fce0cd01cecc1f6e25ae0b48cd01018'
const JWT_CUS_SECOND_DOC_DEL_KEY = '0b57b57b15658cc6c48cd0e5f4c6c421f6e25ae0b421f6e25ae0b48cd0121f014a8e25ae0b48cd0101'
const JWT_CUS_THIRD_DOC_DEL_KEY = '7721f6e25ae0b57b57b5fce0eac5fce0e58c4f58c1f7157fc6c48cd014a897658cc6c48cd8'
const JWT_CONSULT_LIST_FOR_CUS_KEY = '15ef21f5701772167e0ea1f5701772167157a93d0177150f17721f6e25ae0b57b57b'
const JWT_POST_ACCOUNTING_CREATE_URL_KEY = 'f7157157f2167157a93d01701772167157a935ae0b57b57b15658ccd01750f4c6c421f6e25ae0'
const JWT_GET_ACCOUNTING_LIST_URL_KEY = '017721f6e25ae0b48c57017721671f4c6c421f6e25ae0b48c4a89150f17721f6e25ae0b57b57b'
const JWT_INSTRUCTIONS_URL_KEY = '17721f7157fce0cd0121671f4c6c421f6c5fce0e5def58c5e25ae0b421f6e25ae0b48cd0121f014a'
const JWT_UPDATE_TWO_EXCEL_URL_KEY = '1e0e5def58c5a017721f71571b48cd0121f01f6e25ae0b48cef58c5c5fce0e5def58c5a0177'
const JWT_UPDATE_THREE_EXCEL_URL_KEY = '1ce0cff6fdf78ef014afce0e5de421f6e25ae0b48cd0121f01f6e25ae0ef4c6c421f6e25ae'
const JWT_1_5_CHECK_URL_KEY = '5fce0eac5f4afce0e5c421f6e25ae0b48cd0121f0e0e0b48c57017721671f4c5def58c5a01'
const JWT_ECP_REG_URL_KEY = 'fcd017721f6e25ae0bfe25ae0b48cd012157fce0cff6fdf78ef014f0e0e0b48cdef58c5a017721f7157fce0c'
const JWT_ADD_GR_CONST_KEY = 'c4f58c1f7157fce0bfce0e5def58c5a01f6fdf78e71b48cd0121f01f6e25aef014f001772167157a935ae0'
const JWT_FIN_MOD_TENDER_KEY = '0c5fce0e5def58c5a017721ff58c5a01f6fdf74c6c421f6e25ae0b48cd010187101f6ee25ae0b48cd0121f01f6e25ae0b4'
const JWT_FIN_MOD_TENDER_CHECK_KEY = '57a93d017017721671578c5a01f6fdf78e7b57b5fce0eac521f01f6e25aef7a93d0177150f17721f6'
const JWT_CABINET_REQUESTS_KEY = 'b5fce0eac5fce0e58c4f58fdf78e7b57b5fc701209150f4c6c0f4c6c421f6e25ae06e25ae0b421f6e25ae0'
const JWT_UPDATE_PHONE_CABINET_KEY = 'd01701772167157a935ae0b57bfdf78e7b57b5fc7012095def58c5a017721f7157fce0b421f6e72167157'
const JWT_UPDATE_EMAIL_CABINET_KEY = 'f4c6c421f6c5fce0e5def58cfdf78e7b57b5fc7012091507017721671f4c6c421f6e25e25ae0b421f6d017'
const JWT_REMOVE_GR_CONST_KEY = '72167157a93d0177150f17721f6e78e7b57d0121f01f6e25ae0b48f4c6e0e58c4f58c1f7157fc6c48cd'
const JWT_SEND_TO_COMISSION_CHECK_KEY = '0e58c09150f4c6c421f60e5def5421f6c5fce0e5def58c5e25ae8c5e2525ae0b48cd010184f58c1f'
const JWT_SEND_CHECK_MODER_RESULT_KEY = '67157a93d017017721671e0b48cd0101848cd0121f0e0e0b48c570f5b5fc701209150708c1f58c5a0177'
const JWT_CHECK_OFFEROR_APPLY_PER_KEY = '5a01f6fdf78e71b48cd0d0106c421f6e25ae0b5b5fc701fce0e58c4f58c1f1f0e0e0b48c570177157'
const JWT_CHECK_UPDATE_CUS_TWO_KEY = '1f6fdf78e7b57b5fce0e1f6e2557bfdf78e7b57b5fc7012095defe0e586fdf74c6c421f6eae0b48f2'
const JWT_UPDATE_TWO_CUS_TWO_KEY = 'd0121f0e0e0b48c57078e7b57b5fc7012091b5fc7012025ae1def58c5a021f01f6e25ae00b48cd0121f0e0e0b48c5'
const JWT_COMMISSION_VOTES_ON_TENDER_KEY = 'fce0e58c4f58c1f71b57b5fc7fdf78e71b48cd0121f01f6e25aefdef58c5a021f01f648cd0121f0e0e0b48'
const JWT_RETENDER_OFFEROR_KEY = 'cd012157fce0b57b5fc7fdf7860e5def5421f6c5fc58fc701fce0e0106c4258c5a021f01f6e0e5def58c5e25ae8c'
const JWT_CHECK_EXISTS_OFFEROR_KEY = 'c58cfdf78e7b57b5fc7012091f4c6c421f6e25ae0d017017721671570106c4258c150f17721f6e78e7b57d'
const JWT_CHECK_EXISTS_CUSTOMER_KEY = '57d0121f01f61f4c6c421f6e1f6c5fce0e5def58c5e4258c12157fce0cff6fdf78ef014f0e0e0'
const JWT_LIST_OF_RATINGS_KEY = 'c421f6c5fce0e5de21f6e1f6c5fce0fc7012091507017721258cd0101848cdae0b48cd0121f0e0e0b48c57017'
const JWT_UPDATE_PERSONAL_NUMBER_KEY = '57b5fc701209150701772fc701fce0e0106c427017721258cd010184f01f6e25ae8c50f4c6c421f60e'
const JWT_NEW_COMMISSION_FILE_ONE_KEY = 'f01f6e25ae0b48f4c6e050701772fc701fe71b48cd0121f01f6e25aef021258cd010184f01f6edf78e71b48cd0121f01f6e'
const JWT_NEW_COMMISSION_FILE_TWO_KEY = '78e71b48cd0d01701772fc701fce0ef6e2557bfdf7825ae1def58fc7fdf78e71b48cd0121f01f65a021'
const JWT_NEW_COMMISSION_FILE_THREE_KEY = 'ce0e58c4f58c50701772fc701fce0e01848cd0121f0e0e0b484fe0e5def58c5e25ae8c5e252'
const JWT_NEW_COMMISSION_REASON_20_KEY = '157a935ae0b1772fc701fce0e0106c4150f4c6c0f4c6c421f6e25010184f57b5fc7012095de'
const JWT_COMMISSION_VOICES_TWO_REASONS_KEY = '21f0e0e0b48c570177216e0e0e7b57b5fc70120915070177f4c6f6fdf78ef014afce0e5de42'
const JWT_GET_OFFEROR_REASONS_KEY = '5a01f6fdf74c6c421f6e25ae0b4857b5fc70848cd0121f0e0e0b48c570f5070177f4c6f6fdf7def5421f6c'
const JWT_GET_ARCHIVE_DATA_KEY = 'f60e5def5421f6ce25ae0b21f6e25ae0d01701772167150e0e0b401fce0e58c4f58c1f1057d0121f01f6e25ae0'
const JWT_CHANGE_COMMISSION_OF_CUSTOMER_KEY = 'b5fc7012025ae1def58aece0e0106c427017c58fc701fce095defe0e586fdff58c1b57b5fc70120'
const JWT_CHANGE_COMMISSION_OF_CUSTOMER_LIST_KEY = '7b57b5fc701209150f4c6c0f7b5fc70120940e0106e0b5b5fc701fce0e58cce095defe0e588c4f58fdf78e7b5'

const PROTOCOL = 'https://';
const DOMAIN = 's3.mc.uz';  // Tender Test
//const DOMAIN = 'tender.mc.uz' // Tender Official
const API = '/apis/api/v1/';
const SUB_OBJ = 'tenders';
const ALGORITHM = 'HS512';

const TENDER_AUTH_LOGIN_URL_CODED = jwt.sign(PROTOCOL + DOMAIN + API + 'login', JWT_TENDER_AUTH_LOGIN_URL_KEY);
const TENDER_AUTH_LOGOUT_URL_CODED = jwt.sign(PROTOCOL + DOMAIN + API + 'logout', JWT_TENDER_AUTH_LOGOUT_URL_KEY);
const TENDER_LIST_URL_CODED = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ, JWT_TENDER_LIST_URL_KEY);
const TENDER_CREATE_URL_CODED = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ + '/create', JWT_TENDER_CREATE_URL_KEY);
const OBJECTS_TYPE_URL_CODED = jwt.sign(PROTOCOL + DOMAIN + API + 'object-types', JWT_OBJECTS_TYPE_URL_KEY);
const SERVICE_TYPE_URL_CODED = jwt.sign(PROTOCOL + DOMAIN + API + 'service-types', JWT_SERVICE_TYPE_URL_KEY);
const DISTRICTS_URL_CODED = jwt.sign(PROTOCOL + DOMAIN + API + 'districts', JWT_DISTRICTS_URL_KEY);
const REGIONS_URL_CODED = jwt.sign(PROTOCOL + DOMAIN + API + 'regions', JWT_REGIONS_URL_KEY);
const CATEGORIES_URL_CODED = jwt.sign(PROTOCOL + DOMAIN + API + 'score-categories', JWT_CATEGORIES_URL_KEY);
const COMMISSION_URL_CODED_POST = jwt.sign(PROTOCOL + DOMAIN + API + 'set-commissions', JWT_COMMISSION_URL_POST_KEY);
const CONSTRUCTIONS_WORKS_URL_CODED_POST = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ + '/construction-works', JWT_CONSTRUCTIONS_WORKS_URL_POST_KEY);
const UPLOAD_VOLUMES_URL_CODED_POST1 = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ + '/import-first-excel', JWT_UPLOAD_VOLUMES_URL_POST_KEY1);
const UPLOAD_VOLUMES_URL_CODED_POST2 = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ + '/import-second-excel', JWT_UPLOAD_VOLUMES_URL_POST_KEY2);
const UPLOAD_VOLUMES_URL_CODED_POST3 = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ + '/import-third-excel', JWT_UPLOAD_VOLUMES_URL_POST_KEY3);
const COMMISSION_URL_CODED_GET = jwt.sign(PROTOCOL + DOMAIN + API + 'commissions', JWT_COMMISSION_URL_GET_KEY);
const CONSTRUCTIONS_WORKS_URL_CODED_GET = jwt.sign(PROTOCOL + DOMAIN + API + 'construction-works', JWT_CONSTRUCTIONS_WORKS_URL_GET_KEY);
const JWT_TENDER_UPDATE_PUT_1 = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ + '/update', JWT_TENDER_UPDATE_KEY_1);
const JWT_TENDER_UPDATE_PUT_2 = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ + '/update-work-volumes', JWT_TENDER_UPDATE_KEY_2);
const JWT_TENDER_ESTIMATES_GET = jwt.sign(PROTOCOL + DOMAIN + API + 'get-customer-excels', JWT_ESTIMATES);
const JWT_TENDER_CONST_WORKS_GET = jwt.sign(PROTOCOL + DOMAIN + API + 'get-graphic-constructions', JWT_CONST_WORKS_DETAILS);
const JWT_TENDER_CONST_WORKS_POST = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ + '/set-offeror-graphic-constructions', JWT_OFFEROR_GR_CONST_POST);
const JWT_OFFEROR_UPLOAD_ONE_POST = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ + '/offeror-one-excel', JWT_OFFEROR_UPLOAD_ONE);
const JWT_OFFEROR_UPLOAD_TWO_POST = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ + '/offeror-two-excel', JWT_OFFEROR_UPLOAD_TWO);
const JWT_OFFEROR_UPLOAD_THREE_POST = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ + '/offeror-three-excel', JWT_OFFEROR_UPLOAD_THREE);
const JWT_OFFEROR_MAIN_GUARANTEE_POST = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ + '/upload-guarantee', JWT_OFFEROR_MAIN_UPLOAD_ONE);
const JWT_OFFEROR_MAIN_CERT_POST = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ + '/upload-certificate', JWT_OFFEROR_MAIN_UPLOAD_TWO);
const JWT_OFFEROR_MAIN_OTHER_DOCS_POST = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ + '/upload-license', JWT_OFFEROR_MAIN_UPLOAD_THREE);
const JWT_OFFEROR_MAIN_FOUR_DOCS_POST = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ + '/upload-act', JWT_OFFEROR_MAIN_UPLOAD_FOUR);
const JWT_OFFEROR_PROJECT_ONE_POST = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ + '/set-price-offer', JWT_OFFEROR_PROJECT_ONE);
const JWT_OFFEROR_MONTH_POST = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ + '/set-financing-schedule', JWT_OFFEROR_MONTHS_DATA_ONE);
const JWT_OFFEROR_SENDDATA_POST = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ + '/apply-for-tender', JWT_OFFEROR_SEND_DATA);
const JWT_OFFEROR_SENDDATA_GET = jwt.sign(PROTOCOL + DOMAIN + API + 'get-offeror-excels', JWT_OFFEROR_GET_DATA);
const JWT_CUSTOMER_EXCELS_GET = jwt.sign(PROTOCOL + DOMAIN + API + 'get-excel-templates', JWT_CUSTOMER_GET_EXCELS);
const JWT_CONFIRM_URL = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ + '/confirm-tender', JWT_COMFIRM_TENDER);
const JWT_COMMISSION_GET_OFFEROR_DOCS_POST = jwt.sign(PROTOCOL + DOMAIN + API + 'get-offeror-docs', JWT_COMMISSION_GET_OFFEROR_DOCS);
const JWT_COMMISSION_BIDDER_POST = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ + '/get-list-of-bidders', JWT_COMMISSION_BIDDER);
const JWT_COMMISSION_CHECK_POST = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ + '/commission-check', JWT_COMMISSION_CHECK);
const JWT_COMMISSION_BIDDER_DETALS_POST = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ + '/get-bidder-info', JWT_COMMISSION_BIDDER_DETAIL);
const JWT_CUSTOMER_CONTRACT_UPLOAD = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ + '/upload-contract', JWT_UPLOAD_CONTRACT_CUSTOMER);
const JWT_CUSTOMER_PSD_UPLOAD = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ + '/upload-psd', JWT_UPLOAD_PSD_CUSTOMER);
const JWT_OFFEROR_CAB_DATA_GET = jwt.sign(PROTOCOL + DOMAIN + API + 'get-rating', JWT_OFFEROR_DATA);
const JWT_COM_RESULT_GET = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ + '/get-comission-results', JWT_COM_RESULT_DATA);
const JWT_CABINET_TENDERS_GET = jwt.sign(PROTOCOL + DOMAIN + API + 'my-tenders', JWT_MY_TENDERS_CAB_K);
const JWT_COMPLETE_TENDERS_GET = jwt.sign(PROTOCOL + DOMAIN + API + 'completed-tenders', JWT_COMPLETE_TENDERS_K);
const JWT_CURRENT_TIME_GET = jwt.sign(PROTOCOL + DOMAIN + API + 'current-time', JWT_CURRENT_TIME_K);
const JWT_GRAPHC_CONSTRUCTION_UPDATE_URL = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ + '/update-construction-works', JWT_GRAPHC_CONSTRUCTION_KEY);
const JWT_CHECK_UPLOAD_PAGE_ONE_OFFEROR = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ + '/check-created-part-one', JWT_CHECK_PAGE_ONE_KEY);
const JWT_CHECK_UPLOAD_PAGE_TWO_OFFEROR = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ + '/check-created-part-two', JWT_CHECK_PAGE_TWO_KEY);
const JWT_REGION_V2_URL = jwt.sign('https://talim.mc.uz/api/reg', JWT_REGV2_KEY);
const JWT_DISTRICTS_V2_URL = jwt.sign('https://talim.mc.uz/api/regs', JWT_DISV2_KEY);
const JWT_DISTRICTS_GET_URL = jwt.sign('https://talim.mc.uz/api/dis', JWT_DIS_GET_KEY);
const JWT_COM_VOICE_POS_URL = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ + '/comission-voice-status', JWT_COM_VOICE_POS_KEY);
const JWT_TOKEN_REFRESH_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'refresh-token', JWT_TOKEN_REFRESH_KEY);
const JWT_ADD_OBJECT_TYPE_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'add-object-type', JWT_ADD_OBJECT_TYPE_KEY);
const JWT_MAP_STAT_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'map-statistic', JWT_MAP_STAT_KEY);
const JWT_ST_STAT_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'statistic', JWT_STAT_ST_KEY);
const JWT_API_VERSION_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'version', JWT_VERSION_KEY);
const JWT_BALANCE_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'check-balance', JWT_BALANCE_KEY);
const JWT_GET_MEMBERS_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'get-commission-members', JWT_MEMBERS_KEY);
const JWT_GET_MESSAGES_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'get-messages', JWT_MESSAGES_KEY);
const JWT_SEND_MESSAGE_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'send-message', JWT_SEND_MESSAGE_KEY);
const JWT_GET_NEWS_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'post', JWT_NEWS_KEY);
const JWT_UPDATE_NEWS_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'update-post', JWT_NEWS_UPDATE_KEY);
const JWT_DELETE_TENDER_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'tender/delete', JWT_DEL_TENDER_KEY);
const JWT_TENDER_CONFIRMATION_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'confirmation', JWT_TENDER_CONFIRMATION_KEY);
const JWT_TENDER_MODERATION_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'ready-tenders', JWT_TENDER_MODER_KEY);
const JWT_CHAT_OFF_MEM_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'customer-chat-member', JWT_CHAT_OFFEROR_KEY);
const JWT_CHAT_CUS_MEM_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'offeror-chat-members', JWT_CHAT_CUSTOMER_KEY);
const JWT_OFF_BALANCE_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'balance', JWT_BALL_OFF_KEY);
const JWT_CANCEL_MOD_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'cancel-tender', JWT_CANCEL_MOD_KEY);
const JWT_CONSUL_SEND_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'submit-for-consulting', JWT_CUNSULT_SEND_KEY);
const JWT_CONSUL_LIST_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'requests-list', JWT_CUNSULT_LIST_KEY);
const JWT_FAILED_REQ_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'failed-tenders', JWT_FAILED_REQ_KEY);
const JWT_CUS_REQ_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'customer-requests-list', JWT_CUS_REQ_KEY);
const JWT_CUS_NOT_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'notifications', JWT_NOTIFICATIONS_REQ_KEY);
const JWT_ECP_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'eimzo', JWT_ECP_KEY);
const JWT_CUSTOMER_LICENSE_URL = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ + '/upload-expertise', JWT_LICENSE_CUSTOMER_KEY);
const JWT_CREATE_TENDER_COM_REQ_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'request-commissions', JWT_TENDER_CREATE_IN_REQ_KEY);
const JWT_CHECK_TENDER_COM = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ + '/commission-check-tender', JWT_TENDER_CHECK_COMMISSION_KEY);
const JWT_CANCEL_OFFEROR_TENDER = jwt.sign(PROTOCOL + DOMAIN + API + 'cancel-offer', JWT_TENDER_CANCEL_OFFEROR_KEY);
const JWT_CANCEL_CUSTOMER_TENDER = jwt.sign(PROTOCOL + DOMAIN + API + 'customer-cancel-tender', JWT_TENDER_CANCEL_CUSTOMER_KEY);
const JWT_TENDER_ACCEPT_CONSULT = jwt.sign(PROTOCOL + DOMAIN + API + 'confirmation-consulting-center', JWT_TENDER_VOICE_ACCEPT_KEY);
const JWT_TENDER_READY_OF_COM = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ + '/commission-final-accept', JWT_TENDER_READY_FOR_COM_KEY);
const JWT_DELETE_SECOND_DOC_CUS = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ + '/delete-second-excel', JWT_CUS_SECOND_DOC_DEL_KEY);
const JWT_DELETE_THIRD_DOC_CUS = jwt.sign(PROTOCOL + DOMAIN + API + SUB_OBJ + '/delete-third-excel', JWT_CUS_THIRD_DOC_DEL_KEY);
const JWT_CONSULT_LIST_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'get-consulting-list', JWT_CONSULT_LIST_FOR_CUS_KEY);
const JWT_ACCOUNTANT_CREATE_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'accountant/create', JWT_POST_ACCOUNTING_CREATE_URL_KEY);
const JWT_ACCOUNTANT_LIST_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'accountant/list', JWT_GET_ACCOUNTING_LIST_URL_KEY);
const JWT_INSTRUCTION_LIST_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'instructions', JWT_INSTRUCTIONS_URL_KEY);
const JWT_UPDATE_TWO_EXCEL_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'get-second-excels', JWT_UPDATE_TWO_EXCEL_URL_KEY);
const JWT_UPDATE_THREE_EXCEL_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'get-third-excels', JWT_UPDATE_THREE_EXCEL_URL_KEY);
const JWT_CHECK_1_5_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'check-previous-year-limit', JWT_1_5_CHECK_URL_KEY);
const JWT_ECP_REG_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'fill-user-data', JWT_ECP_REG_URL_KEY);
const JWT_GR_CONST_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'add-graphic-construction', JWT_ADD_GR_CONST_KEY);
const JWT_FIN_MOD_TENDER_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'finance-moderator-tenders', JWT_FIN_MOD_TENDER_KEY);
const JWT_FIN_MOD_TENDER_CHECK_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'finance-moderator-check', JWT_FIN_MOD_TENDER_CHECK_KEY);
const JWT_CABINET_REQUESTS_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'user-requisites', JWT_CABINET_REQUESTS_KEY);
const JWT_CABINET_UPDATE_PHONE_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'update-phone', JWT_UPDATE_PHONE_CABINET_KEY);
const JWT_CABINET_UPDATE_EMAIL_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'update-email', JWT_UPDATE_EMAIL_CABINET_KEY);
const JWT_GR_CONST_REMOVE_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'remove-construction-work', JWT_REMOVE_GR_CONST_KEY);
const JWT_COMISSION_CHECK_CUSTOMER_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'send-to-commission', JWT_SEND_TO_COMISSION_CHECK_KEY);
const JWT_MODER_CHECK_CUSTOMER_DATA_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'check-finance-moderator-result', JWT_SEND_CHECK_MODER_RESULT_KEY);
const JWT_OFFEROR_APPLY_CHECK_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'check-offeror-permissions', JWT_CHECK_OFFEROR_APPLY_PER_KEY);
const JWT_CUS_CHECK_UPDATE_TWO_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'check-update', JWT_CHECK_UPDATE_CUS_TWO_KEY);
const JWT_CUS_UPDATE_TWO_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'update-confirmed-tender', JWT_UPDATE_TWO_CUS_TWO_KEY);
const JWT_VOTES_OF_COMMISSION_TENDER_URL = jwt.sign(PROTOCOL + DOMAIN + API + '1-stage-commissions-voices', JWT_COMMISSION_VOTES_ON_TENDER_KEY);
const JWT_RETENDER_OFFEROR_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'confirm-retender', JWT_RETENDER_OFFEROR_KEY);
const JWT_CHECK_EXISTS_OFFEROR_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'check-offeror-files-to-exists', JWT_CHECK_EXISTS_OFFEROR_KEY);
const JWT_CHECK_EXISTS_CUSTOMER_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'check-customer-files-to-exists', JWT_CHECK_EXISTS_CUSTOMER_KEY);
const JWT_LIST_OF_RATINGS_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'rating-data', JWT_LIST_OF_RATINGS_KEY);
const JWT_UPDATE_PERSONAL_NUMBER_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'update-fin-moderator-tender', JWT_UPDATE_PERSONAL_NUMBER_KEY);
const JWT_NEW_COMMISSION_FILE_ONE_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'upload-indebtedness', JWT_NEW_COMMISSION_FILE_ONE_KEY);
const JWT_NEW_COMMISSION_FILE_TWO_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'upload-kartoteka', JWT_NEW_COMMISSION_FILE_TWO_KEY);
const JWT_NEW_COMMISSION_FILE_THREE_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'upload-kredit', JWT_NEW_COMMISSION_FILE_THREE_KEY);
const JWT_NEW_COMMISSION_REASON_20_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'minus20-files', JWT_NEW_COMMISSION_REASON_20_KEY);
const JWT_COMMISSION_VOICES_TWO_REASONS_URL = jwt.sign(PROTOCOL + DOMAIN + API + '2-stage-commissions-voices', JWT_COMMISSION_VOICES_TWO_REASONS_KEY);
const JWT_GET_OFFEROR_REASONS_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'get-offeror-reasons', JWT_GET_OFFEROR_REASONS_KEY);
const JWT_GET_ARCHIVE_DATA_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'archive-tenders', JWT_GET_ARCHIVE_DATA_KEY);
const JWT_CHANGE_COMMISSION_OF_CUSTOMER_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'change-commissions', JWT_CHANGE_COMMISSION_OF_CUSTOMER_KEY);
const JWT_CHANGE_COMMISSION_OF_CUSTOMER_LIST_URL = jwt.sign(PROTOCOL + DOMAIN + API + 'commissions-list', JWT_CHANGE_COMMISSION_OF_CUSTOMER_LIST_KEY);

export default {
    JWT_USERNAME_KEY,
    JWT_ROLE_KEY,
    JWT_TOKEN_KEY,
    JWT_ENCRYPTION_KEY,
    JWT_RATE_KEY,
    JWT_USER_ID_KEY,
    JWT_VOTE_KEY,
    JWT_ACTIVITY_STATUS_KEY,
    JWT_COM_RESULT_DATA,
    JWT_MY_TENDERS_CAB_K,
    JWT_COMPLETE_TENDERS_K,
    JWT_CURRENT_TIME_K,
    JWT_CHECK_PAGE_ONE_KEY,
    JWT_CHECK_PAGE_TWO_KEY,
    ALGORITHM,
    JWT_IDS_KEY,
    JWT_REGV2_KEY,
    JWT_DISV2_KEY,
    JWT_DIS_GET_KEY,
    JWT_COM_VOICE_POS_KEY,
    JWT_TOKEN_REFRESH_KEY,
    JWT_ADD_OBJECT_TYPE_KEY,
    JWT_MAP_STAT_KEY,
    JWT_STAT_ST_KEY,
    JWT_VERSION_KEY,
    JWT_BALANCE_KEY,
    JWT_MEMBERS_KEY,
    JWT_MESSAGES_KEY,
    JWT_SEND_MESSAGE_KEY,
    JWT_NEWS_KEY,
    JWT_NEWS_UPDATE_KEY,
    JWT_DEL_TENDER_KEY,
    JWT_TENDER_CONFIRMATION_KEY,
    JWT_TENDER_MODER_KEY,
    JWT_CHAT_OFFEROR_KEY,
    JWT_CHAT_CUSTOMER_KEY,
    JWT_BALL_OFF_KEY,
    JWT_CANCEL_MOD_KEY,
    JWT_CUNSULT_SEND_KEY,
    JWT_CUNSULT_LIST_KEY,
    JWT_CUST_SC_KEY,
    JWT_REQ_SC_KEY,
    JWT_FAILED_REQ_KEY,
    JWT_CUS_REQ_KEY,
    JWT_CUST_NAME_SC_KEY,
    JWT_NOTIFICATIONS_REQ_KEY,
    JWT_ECP_KEY,
    JWT_LICENSE_CUSTOMER_KEY,
    JWT_TENDER_CREATE_IN_REQ_KEY,
    JWT_USER_IN_KEY,
    JWT_TENDER_CHECK_COMMISSION_KEY,
    JWT_TENDER_CANCEL_OFFEROR_KEY,
    JWT_TENDER_CANCEL_CUSTOMER_KEY,
    JWT_TENDER_READY_FOR_COM_KEY,
    JWT_TENDER_VOICE_ACCEPT_KEY,
    JWT_CUS_SECOND_DOC_DEL_KEY,
    JWT_CUS_THIRD_DOC_DEL_KEY,
    JWT_CONSULT_LIST_FOR_CUS_KEY,
    JWT_POST_ACCOUNTING_CREATE_URL_KEY,
    JWT_GET_ACCOUNTING_LIST_URL_KEY,
    JWT_INSTRUCTIONS_URL_KEY,
    JWT_UPDATE_TWO_EXCEL_URL_KEY,
    JWT_UPDATE_THREE_EXCEL_URL_KEY,
    JWT_1_5_CHECK_URL_KEY,
    JWT_ECP_REG_URL_KEY,
    JWT_ADD_GR_CONST_KEY,
    JWT_FIN_MOD_TENDER_KEY,
    JWT_FIN_MOD_TENDER_CHECK_KEY,
    JWT_CABINET_REQUESTS_KEY,
    JWT_UPDATE_PHONE_CABINET_KEY,
    JWT_UPDATE_EMAIL_CABINET_KEY,
    JWT_REMOVE_GR_CONST_KEY,
    JWT_SEND_TO_COMISSION_CHECK_KEY,
    JWT_SEND_CHECK_MODER_RESULT_KEY,
    JWT_CHECK_OFFEROR_APPLY_PER_KEY,
    JWT_CHECK_UPDATE_CUS_TWO_KEY,
    JWT_UPDATE_TWO_CUS_TWO_KEY,
    JWT_COMMISSION_VOTES_ON_TENDER_KEY,
    JWT_RETENDER_OFFEROR_KEY,
    JWT_CHECK_EXISTS_OFFEROR_KEY,
    JWT_CHECK_EXISTS_CUSTOMER_KEY,
    JWT_OFFEROR_MAIN_UPLOAD_FOUR,
    JWT_LIST_OF_RATINGS_KEY,
    JWT_UPDATE_PERSONAL_NUMBER_KEY,
    JWT_NEW_COMMISSION_FILE_ONE_KEY,
    JWT_NEW_COMMISSION_FILE_TWO_KEY,
    JWT_NEW_COMMISSION_FILE_THREE_KEY,
    JWT_NEW_COMMISSION_REASON_20_KEY,
    JWT_COMMISSION_VOICES_TWO_REASONS_KEY,
    JWT_GET_OFFEROR_REASONS_KEY,
    JWT_GET_ARCHIVE_DATA_KEY,
    JWT_CHANGE_COMMISSION_OF_CUSTOMER_KEY,
    JWT_CHANGE_COMMISSION_OF_CUSTOMER_LIST_KEY,

    JWT_TENDER_AUTH_LOGIN_URL_KEY,
    JWT_TENDER_AUTH_LOGOUT_URL_KEY,
    JWT_TENDER_LIST_URL_KEY,
    JWT_TENDER_CREATE_URL_KEY,
    JWT_OBJECTS_TYPE_URL_KEY,
    JWT_SERVICE_TYPE_URL_KEY,
    JWT_DISTRICTS_URL_KEY,
    JWT_CATEGORIES_URL_KEY,
    JWT_COMMISSION_URL_POST_KEY,
    JWT_CONSTRUCTIONS_WORKS_URL_POST_KEY,
    JWT_UPLOAD_VOLUMES_URL_POST_KEY1,
    JWT_UPLOAD_VOLUMES_URL_POST_KEY2,
    JWT_UPLOAD_VOLUMES_URL_POST_KEY3,
    JWT_COMMISSION_URL_GET_KEY,
    JWT_CONSTRUCTIONS_WORKS_URL_GET_KEY,
    JWT_TENDER_UPDATE_KEY_1,
    JWT_TENDER_UPDATE_KEY_2,
    JWT_ESTIMATES,
    JWT_CONST_WORKS_DETAILS,
    JWT_OFFEROR_UPLOAD_ONE,
    JWT_OFFEROR_UPLOAD_TWO,
    JWT_OFFEROR_UPLOAD_THREE,
    JWT_OFFEROR_MAIN_GUARANTEE_POST,
    JWT_OFFEROR_MAIN_CERT_POST,
    JWT_OFFEROR_MAIN_OTHER_DOCS_POST,
    JWT_TENDER_CONST_WORKS_POST,
    JWT_OFFEROR_PROJECT_ONE_POST,
    JWT_OFFEROR_MONTH_POST,
    JWT_OFFEROR_SENDDATA_POST,
    JWT_OFFEROR_SENDDATA_GET,
    JWT_CUSTOMER_EXCELS_GET,
    JWT_CONFIRM_URL,
    JWT_COMMISSION_GET_OFFEROR_DOCS_POST,
    JWT_COMMISSION_BIDDER_POST,
    JWT_COMMISSION_CHECK_POST,
    JWT_COMMISSION_BIDDER_DETAIL,
    JWT_CUSTOMER_CONTRACT_UPLOAD,
    JWT_UPLOAD_PSD_CUSTOMER,
    JWT_REGIONS_URL_KEY,
    JWT_OFFEROR_DATA,
    JWT_GRAPHC_CONSTRUCTION_KEY,
    JWT_CHECK_UPLOAD_PAGE_ONE_OFFEROR,
    JWT_CHECK_UPLOAD_PAGE_TWO_OFFEROR,
    JWT_REGION_V2_URL,
    JWT_DISTRICTS_V2_URL,
    JWT_DISTRICTS_GET_URL,
    JWT_COM_VOICE_POS_URL,
    JWT_TOKEN_REFRESH_URL,
    JWT_ADD_OBJECT_TYPE_URL,
    JWT_MAP_STAT_URL,
    JWT_ST_STAT_URL,
    JWT_API_VERSION_URL,
    JWT_BALANCE_URL,
    JWT_GET_MEMBERS_URL,
    JWT_GET_MESSAGES_URL,
    JWT_SEND_MESSAGE_URL,
    JWT_GET_NEWS_URL,
    JWT_UPDATE_NEWS_URL,
    JWT_DELETE_TENDER_URL,
    JWT_TENDER_CONFIRMATION_URL,
    JWT_TENDER_MODERATION_URL,
    JWT_CHAT_OFF_MEM_URL,
    JWT_CHAT_CUS_MEM_URL,
    JWT_OFF_BALANCE_URL,
    JWT_CANCEL_MOD_URL,
    JWT_CONSUL_SEND_URL,
    JWT_CONSUL_LIST_URL,
    JWT_FAILED_REQ_URL,
    JWT_CUS_REQ_URL,
    JWT_CUS_NOT_URL,
    JWT_ECP_URL,
    JWT_CUSTOMER_LICENSE_URL,
    JWT_CREATE_TENDER_COM_REQ_URL,
    JWT_CHECK_TENDER_COM,
    JWT_CANCEL_OFFEROR_TENDER,
    JWT_CANCEL_CUSTOMER_TENDER,
    JWT_TENDER_READY_OF_COM,
    JWT_TENDER_ACCEPT_CONSULT,
    JWT_DELETE_SECOND_DOC_CUS,
    JWT_DELETE_THIRD_DOC_CUS,
    JWT_CONSULT_LIST_URL,
    JWT_ACCOUNTANT_CREATE_URL,
    JWT_ACCOUNTANT_LIST_URL,
    JWT_INSTRUCTION_LIST_URL,
    JWT_UPDATE_TWO_EXCEL_URL,
    JWT_UPDATE_THREE_EXCEL_URL,
    JWT_CHECK_1_5_URL,
    JWT_ECP_REG_URL,
    JWT_GR_CONST_URL,
    JWT_FIN_MOD_TENDER_URL,
    JWT_FIN_MOD_TENDER_CHECK_URL,
    JWT_CABINET_REQUESTS_URL,
    JWT_CABINET_UPDATE_PHONE_URL,
    JWT_CABINET_UPDATE_EMAIL_URL,
    JWT_GR_CONST_REMOVE_URL,
    JWT_COMISSION_CHECK_CUSTOMER_URL,
    JWT_MODER_CHECK_CUSTOMER_DATA_URL,
    JWT_OFFEROR_APPLY_CHECK_URL,
    JWT_CUS_CHECK_UPDATE_TWO_URL,
    JWT_CUS_UPDATE_TWO_URL,
    JWT_VOTES_OF_COMMISSION_TENDER_URL,
    JWT_RETENDER_OFFEROR_URL,
    JWT_CHECK_EXISTS_OFFEROR_URL,
    JWT_CHECK_EXISTS_CUSTOMER_URL,
    JWT_OFFEROR_MAIN_FOUR_DOCS_POST,
    JWT_LIST_OF_RATINGS_URL,
    JWT_UPDATE_PERSONAL_NUMBER_URL,
    JWT_NEW_COMMISSION_FILE_ONE_URL,
    JWT_NEW_COMMISSION_FILE_TWO_URL,
    JWT_NEW_COMMISSION_FILE_THREE_URL,
    JWT_NEW_COMMISSION_REASON_20_URL,
    JWT_COMMISSION_VOICES_TWO_REASONS_URL,
    JWT_GET_OFFEROR_REASONS_URL,
    JWT_GET_ARCHIVE_DATA_URL,
    JWT_CHANGE_COMMISSION_OF_CUSTOMER_URL,
    JWT_CHANGE_COMMISSION_OF_CUSTOMER_LIST_URL,

    TENDER_AUTH_LOGIN_URL_CODED,
    TENDER_AUTH_LOGOUT_URL_CODED,
    TENDER_LIST_URL_CODED,
    TENDER_CREATE_URL_CODED,
    OBJECTS_TYPE_URL_CODED,
    SERVICE_TYPE_URL_CODED,
    DISTRICTS_URL_CODED,
    CATEGORIES_URL_CODED,
    COMMISSION_URL_CODED_POST,
    CONSTRUCTIONS_WORKS_URL_CODED_POST,
    UPLOAD_VOLUMES_URL_CODED_POST1,
    UPLOAD_VOLUMES_URL_CODED_POST2,
    UPLOAD_VOLUMES_URL_CODED_POST3,
    COMMISSION_URL_CODED_GET,
    CONSTRUCTIONS_WORKS_URL_CODED_GET,
    JWT_TENDER_UPDATE_PUT_1,
    JWT_TENDER_UPDATE_PUT_2,
    JWT_TENDER_ESTIMATES_GET,
    JWT_TENDER_CONST_WORKS_GET,
    JWT_OFFEROR_UPLOAD_ONE_POST,
    JWT_OFFEROR_UPLOAD_TWO_POST,
    JWT_OFFEROR_UPLOAD_THREE_POST,
    JWT_OFFEROR_MAIN_UPLOAD_ONE,
    JWT_OFFEROR_MAIN_UPLOAD_TWO,
    JWT_OFFEROR_MAIN_UPLOAD_THREE,
    JWT_OFFEROR_GR_CONST_POST,
    JWT_OFFEROR_PROJECT_ONE,
    JWT_OFFEROR_MONTHS_DATA_ONE,
    JWT_OFFEROR_SEND_DATA,
    JWT_OFFEROR_GET_DATA,
    JWT_CUSTOMER_GET_EXCELS,
    JWT_COMFIRM_TENDER,
    JWT_COMMISSION_GET_OFFEROR_DOCS,
    JWT_COMMISSION_BIDDER,
    JWT_COMMISSION_CHECK,
    JWT_COMMISSION_BIDDER_DETALS_POST,
    JWT_UPLOAD_CONTRACT_CUSTOMER,
    JWT_CUSTOMER_PSD_UPLOAD,
    REGIONS_URL_CODED,
    JWT_OFFEROR_CAB_DATA_GET,
    JWT_COM_RESULT_GET,
    JWT_CABINET_TENDERS_GET,
    JWT_COMPLETE_TENDERS_GET,
    JWT_CURRENT_TIME_GET,
    JWT_GRAPHC_CONSTRUCTION_UPDATE_URL
}