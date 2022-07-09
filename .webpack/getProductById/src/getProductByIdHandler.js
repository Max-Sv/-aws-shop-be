/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/getProductByIdHandler.ts":
/*!**************************************!*\
  !*** ./src/getProductByIdHandler.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.getProductById = void 0;\r\nconst db_client_1 = __webpack_require__(/*! ./services/db-client */ \"./src/services/db-client.ts\");\r\nconst getProductById = async (event) => {\r\n    console.log(`getProductById: ${JSON.stringify(event)}`);\r\n    const param = event.pathParameters;\r\n    if (param && param.productId) {\r\n        try {\r\n            const product = await (0, db_client_1.findProductById)(param.productId);\r\n            return {\r\n                statusCode: 200,\r\n                body: JSON.stringify(product),\r\n                headers: {\r\n                    \"Access-Control-Allow-Origin\": \"*\",\r\n                },\r\n            };\r\n        }\r\n        catch (error) {\r\n            return {\r\n                statusCode: error.statusCode || 500,\r\n                body: JSON.stringify(error.message),\r\n            };\r\n        }\r\n    }\r\n    return {\r\n        statusCode: 404,\r\n        body: JSON.stringify({ error: \"invalid path parameters\" })\r\n    };\r\n};\r\nexports.getProductById = getProductById;\r\n\n\n//# sourceURL=webpack://console-service/./src/getProductByIdHandler.ts?");

/***/ }),

/***/ "./src/services/db-client.ts":
/*!***********************************!*\
  !*** ./src/services/db-client.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.addProduct = exports.findProductById = exports.findAllProducts = void 0;\r\nconst pg_1 = __webpack_require__(/*! pg */ \"pg\");\r\nconst errors_1 = __webpack_require__(/*! ../utils/errors */ \"./src/utils/errors.ts\");\r\nconst { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;\r\nconst dbOptions = {\r\n    host: PG_HOST,\r\n    port: PG_PORT,\r\n    database: PG_DATABASE,\r\n    user: PG_USERNAME,\r\n    password: PG_PASSWORD,\r\n    ssl: {\r\n        rejectUnauthorized: false,\r\n    },\r\n    connectionTimeoutMillis: 5000,\r\n};\r\nconst findAllProducts = async () => {\r\n    const client = new pg_1.Client(dbOptions);\r\n    try {\r\n        await client.connect();\r\n        const { rows: products } = await client.query(`select products.id, products.title, products.description, products.price, stocks.count  from products left join stocks on products.id = stocks.product_id`);\r\n        return products;\r\n    }\r\n    catch (e) {\r\n        throw new errors_1.ServerError(e.message);\r\n    }\r\n    finally {\r\n        await client.end();\r\n    }\r\n};\r\nexports.findAllProducts = findAllProducts;\r\nconst productValidator = (product) => {\r\n    if (!product.length)\r\n        throw new errors_1.NotFoundError(`Product not found`);\r\n};\r\nconst findProductById = async (id) => {\r\n    const client = new pg_1.Client(dbOptions);\r\n    try {\r\n        await client.connect();\r\n        const { rows: product } = await client.query(`SELECT * FROM products WHERE id='${id}'`);\r\n        productValidator(product);\r\n        return product;\r\n    }\r\n    catch (error) {\r\n        throw new errors_1.ServerError(error.message);\r\n    }\r\n    finally {\r\n        await client.end();\r\n    }\r\n};\r\nexports.findProductById = findProductById;\r\nconst createProductValidator = (title, description, price) => {\r\n    if (!title || !description || !price)\r\n        throw new errors_1.ValidationError(`Product data is invalid`);\r\n};\r\nconst addProduct = async (params) => {\r\n    const client = new pg_1.Client(dbOptions);\r\n    try {\r\n        const { title, description, price } = params;\r\n        createProductValidator(title, description, price);\r\n        await client.connect();\r\n        const createdProduct = await client.query(`\r\n            insert into products (title, description, price) \r\n            values ('${title}', '${description}', ${price})\r\n            returning *\r\n            `);\r\n        return { ...createdProduct };\r\n    }\r\n    catch (error) {\r\n        throw new errors_1.ServerError(error.message);\r\n    }\r\n    finally {\r\n        await client.end();\r\n    }\r\n};\r\nexports.addProduct = addProduct;\r\n\n\n//# sourceURL=webpack://console-service/./src/services/db-client.ts?");

/***/ }),

/***/ "./src/utils/errors.ts":
/*!*****************************!*\
  !*** ./src/utils/errors.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.NotFoundError = exports.ValidationError = exports.ServerError = void 0;\r\nclass ServerError extends Error {\r\n    statusCode;\r\n    message;\r\n    name;\r\n    constructor(message) {\r\n        super(message);\r\n        this.name = 'ServerError';\r\n        this.statusCode = 500;\r\n    }\r\n}\r\nexports.ServerError = ServerError;\r\nclass ValidationError extends Error {\r\n    statusCode;\r\n    message;\r\n    name;\r\n    constructor(message) {\r\n        super(message);\r\n        this.name = 'ValidationError';\r\n        this.statusCode = 400;\r\n    }\r\n}\r\nexports.ValidationError = ValidationError;\r\nclass NotFoundError extends Error {\r\n    statusCode;\r\n    message;\r\n    name;\r\n    constructor(message) {\r\n        super(message);\r\n        this.name = 'NotFoundError';\r\n        this.statusCode = 404;\r\n    }\r\n}\r\nexports.NotFoundError = NotFoundError;\r\n\n\n//# sourceURL=webpack://console-service/./src/utils/errors.ts?");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("pg");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/getProductByIdHandler.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;