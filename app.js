const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const joi = require('@hapi/joi');
const ejs = require('ejs');
const fs = require('fs');
const sqlite3 = require(sqlite3).verbose();


