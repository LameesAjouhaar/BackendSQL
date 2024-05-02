import mysql from 'mysql2'


const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '***',
    database: 'formdata'
}).promise()


export async function getEmployees() {
    const [rows] = await pool.query("SELECT * FROM employees")
    return rows

}

export async function getEmployee(id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM employees
    WHERE id = ?
    `, [id])
    return rows[0]
}

export async function createEmployee(FullName, EPColour, FirstName, LastName, Salutation, EmployeeNumber, Gender, Salary) {
    const [result] = await pool.query(`
    INSERT INTO employees (FullName, EPColour, FirstName, LastName, Salutation,EmployeeNumber, Gender, Salary)
    VALUES (?,?,?,?,?,?,?,?)
    `, [FullName, EPColour, FirstName, LastName, Salutation, EmployeeNumber, Gender, Salary])

    const id = result.insertId
    return getEmployee(id)
}


export async function updateEmployee(id, FullName, EPColour, FirstName, LastName, Salutation, EmployeeNumber, Gender, Salary) {
    await pool.query(`
        UPDATE employees 
        SET FullName=?, EPColour=?, FirstName=?, LastName=?, Salutation=?, EmployeeNumber=?, Gender=?, Salary=?
        WHERE id=?
    `, [FullName, EPColour, FirstName, LastName, Salutation, EmployeeNumber, Gender, Salary, id]);

    return getEmployee(id);
}

