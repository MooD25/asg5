const Sequelize = require("sequelize");

var sequelize = new Sequelize(
  "db6h0i2se2v7ro",
  "mknodkadhtkrzf",
  "b289fbfb2902fd1ffc213553e8a2dd25af9aad2c023054d476fe64f56b60e711",
  {
    host: "ec2-3-231-69-204.compute-1.amazonaws.com",
    dialect: "postgres",
    port: 5432,
    dialectOptions: {
      ssl: { rejectUnauthorized: false },
    },
    query: { raw: true },
  }
);

//  sequelize
// .authenticate()
//.then(function() {
//     console.log('Connection has been established successfully.');
// })
// .catch(function(err) {
//     console.log('Unable to connect to the database:', err);
//  });

var Employee = sequelize.define(
  "Employee",
  {
    employeeNum: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: Sequelize.STRING,
    description: Sequelize.TEXT,
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    SSN: Sequelize.STRING,
    addressStreet: Sequelize.STRING,
    addressCity: Sequelize.STRING,
    addressState: Sequelize.STRING,
    addressPostal: Sequelize.STRING,
    maritalStatus: Sequelize.STRING,
    isManager: Sequelize.BOOLEAN,
    employeeManagerNum: Sequelize.INTEGER,
    status: Sequelize.STRING,
    hireDate: Sequelize.STRING,
  },
  {
    createdAt: false, // disable createdAt
    updatedAt: false, // disable updatedAt
  }
);

var Department = sequelize.define(
  "Department",
  {
    departmentId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    departmentName: Sequelize.STRING,
  },
  {
    createdAt: false, // disable createdAt
    updatedAt: false, // disable updatedAt
  }
);

Department.hasMany(Employee, { foreignKey: "department" });

module.exports.initialize = function () {
  return new Promise(function (resolve, reject) {
    sequelize
      .sync()
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject("Unable to sync the database");
      });
  });
};

module.exports.getAllEmployees = function () {
  return new Promise(function (resolve, reject) {
    Employee.findAll()
      .then((data) => {
        resolve(data);
      })
      .catch(() => {
        reject("No results returned");
      });
  });
};

module.exports.addEmployee = function (employeeData) {
  return new Promise(function (resolve, reject) {
    employeeData.isManager = employeeData.isManager ? true : false;
    for (let e in employeeData) {
      employeeData[e] == "" ? employeeData[e] == null : employeeData[e];
    }
    Employee.create(employeeData)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject("Unable to create employee");
      });
  });
};

module.exports.getEmployeeByNum = function (num) {
  return new Promise(function (resolve, reject) {
    Employee.findAll({
      where: {
        employeeNum: num,
      },
    })
      .then((data) => {
        resolve(data[0]);
      })
      .catch(() => {
        reject("No results returned");
      });
  });
};

module.exports.getEmployeesByStatus = function (status) {
  return new Promise(function (resolve, reject) {
    Employee.findAll({
      where: {
        status: status,
      },
    })
      .then((data) => {
        resolve(data);
      })
      .catch(() => {
        reject("No results returned");
      });
  });
};

module.exports.getEmployeesByDepartment = function (department) {
  return new Promise(function (resolve, reject) {
    Employee.findAll({
      where: {
        department: department,
      },
    })
      .then((data) => {
        resolve(data);
      })
      .catch(() => {
        reject("No results returned");
      });
  });
};

module.exports.getEmployeesByManager = function (manager) {
  return new Promise(function (resolve, reject) {
    Employee.findAll({
      where: {
        employeeManagerNum: manager,
      },
    })
      .then((data) => {
        resolve(data);
      })
      .catch(() => {
        reject("No results returned");
      });
  });
};

module.exports.getManagers = function () {
  return new Promise(function (resolve, reject) {
    reject();
  });
};

module.exports.getDepartments = function () {
  return new Promise(function (resolve, reject) {
    Department.findAll()
      .then((data) => {
        resolve(data);
      })
      .catch(() => {
        reject("No results returned");
      });
  });
};

module.exports.updateEmployee = function (employeeData) {
  return new Promise(function (resolve, reject) {
    employeeData.isManager = employeeData.isManager ? true : false;
    for (let e in employeeData) {
      employeeData[e] == "" ? employeeData[e] == null : employeeData[e];
    }
    Employee.update(employeeData)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject("Unable to update employee");
      });
  });
};

module.exports.addDepartment = function (departmentData) {
  return new Promise(function (resolve, reject) {
    for (let e in departmentData) {
      departmentData[e] == "" ? departmentData[e] == null : departmentData[e];
    }
    Department.create(departmentData)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject("Unable to create department");
      });
  });
};

module.exports.updateDepartment = function (departmentData) {
  return new Promise(function (resolve, reject) {
    for (let e in departmentData) {
      departmentData[e] == "" ? departmentData[e] == null : departmentData[e];
    }
    Department.update(departmentData, {
      where: {
        departmentId: departmentData.departmentId,
      },
    })
      .then(() => resolve())
      .catch((err) => {
        reject("Unable to create department");
      });
  });
};

module.exports.getDepartmentById = function (id) {
  return new Promise(function (resolve, reject) {
    Department.findAll({
      where: {
        departmentId: id,
      },
    })
      .then((data) => {
        resolve(data[0]);
      })
      .catch(() => {
        reject("No result found");
      });
  });
};

module.exports.deleteDepartmentById = function (id) {
  return new Promise(function (resolve, reject) {
    Department.destroy({
      where: {
        departmentId: id,
      },
    })
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject("Error on delete");
      });
  });
};

module.exports.deleteEmployeeByNum = function (empNum) {
  return new Promise(function (resolve, reject) {
    Employee.destroy({
      where: {
        employeeNum: empNum,
      },
    })
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject("Error");
      });
  });
};
