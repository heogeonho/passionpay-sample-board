const output = {
   login: (req, res) => {
      res.render('index');
   },

   main: (req, res) => {
      res.render('main');
   },

   create: (req, res) => {
      res.render('create');
   },

   update: (req, res) => {
      res.render('update');
   },
};

module.exports = {
   output,
};
