"use strict";
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
let companies = [
    { id: 1, name: 'Juan Company' },
    { id: 2, name: 'Felipe Company' }
];
let employees = [
    { id: 1, name: 'Juan', companyId: 1 },
    { id: 2, name: 'Angel', companyId: 1 },
    { id: 3, name: 'Fabio', companyId: 2 }
];
// Get all companies
app.get('/companies', (req, res) => {
    res.json(companies);
});
// Add a new company
app.post('/companies', (req, res) => {
    const newCompany = Object.assign({ id: companies.length + 1 }, req.body);
    companies.push(newCompany);
    res.status(201).json(newCompany);
});
// Get all employees of a company
app.get('/companies/:companyId/employees', (req, res) => {
    const companyId = req.params.companyId;
    const companyEmployees = employees.filter(emp => emp.companyId == companyId);
    res.json(companyEmployees);
});
// Add a new employee to a company
app.post('/companies/:companyId/employees', (req, res) => {
    const companyId = parseInt(req.params.companyId);
    const newEmployee = Object.assign({ id: employees.length + 1, companyId }, req.body);
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
