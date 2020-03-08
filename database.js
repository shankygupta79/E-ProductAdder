const Sequelize = require('sequelize')
//dbname','username','pass'
//'database79', 'database79', 'hello3878','db4free.net'
//'cp1jpd6gJR', 'cp1jpd6gJR', 'Ropg5v6S06',
const db = new Sequelize('database79', 'database79', 'hello3878', {
    host:'db4free.net',
    dialect: 'mysql',
    port:3306,
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})
const Cat = db.define('categories', {
  C_ID:{
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey:true,
      autoIncrement: true,
  },
  name:Sequelize.STRING,field:Sequelize.STRING,tag:Sequelize.STRING,

})
const QProd=db.define('qproduct',{
  P_ID:{
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey:true,
    autoIncrement: true,
  },
  name:Sequelize.STRING,category:Sequelize.STRING,company:Sequelize.STRING,mrp:Sequelize.INTEGER,
  price:Sequelize.INTEGER,
  img1:Sequelize.STRING,
 
})
const Prod=db.define('product',{
  P_ID:{
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey:true,
    autoIncrement: true,
  },
  pnum:Sequelize.INTEGER,
  des:Sequelize.TEXT,ades:Sequelize.TEXT,
  img2:Sequelize.STRING,img3:Sequelize.STRING,img4:Sequelize.STRING,
  cod:Sequelize.BOOLEAN,retrn:Sequelize.BOOLEAN,delivery:Sequelize.BOOLEAN,
  quantity:Sequelize.STRING(1000),

})
db.sync()
    .then(() => console.log("Database has been synced"))
    .catch((err) => console.error("Error creating database"))

exports = module.exports = {
    Cat,Prod,QProd
}
