module.exports = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
};
