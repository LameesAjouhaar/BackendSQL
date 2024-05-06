import express from 'express'

import {
    getEmployees,
    getEmployee,
    createEmployee,
    updateEmployee
} from './db.js'

const app = express()


app.use(express.json())



app.get("/employees", async (req, res) => {
    const employees = await getEmployees()
    res.send(employees)
})

app.get("/employees/:id", async (req, res) => {

    const id = req.params.id
    const employee = await getEmployee(id)
    res.send(employee)
})

app.post("/employees", async (req, res) => {

    const { FullName, EPColour, FirstName, LastName, Salutation, EmployeeNumber, Gender, Salary } = req.body
    const employee = await createEmployee(FullName, EPColour, FirstName, LastName, Salutation, EmployeeNumber, Gender, Salary)
    res.status(201).send(employee)
})

app.put("/employees/:id", async (req, res) => {
    const id = req.params.id;
    const { FullName, EPColour, FirstName, LastName, Salutation, EmployeeNumber, Gender, Salary } = req.body;

    try {
        // Check if the employee exists
        const existingEmployee = await getEmployee(id);
        if (!existingEmployee) {
            return res.status(404).send("Employee not found");
        }

        // Update the employee details
        const updatedEmployee = await updateEmployee(id, FullName, EPColour, FirstName, LastName, Salutation, EmployeeNumber, Gender, Salary);

        res.send(updatedEmployee);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(3030, () => {
    console.log('server was running on port 8080');
    console.log('server is running on port 3030');
})