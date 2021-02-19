const error = _ => { throw new SyntaxError('The input has to be 0 or 1.') }

module.exports = (a, b) => {

  switch (a) {

    case 0:

      switch (b) {

        case 0:
         return 1;

        case 1:
         return 1;

        default:
         error()

      }

    case 1:

      switch (b) {

        case 0:
         return 1;

        case 1:
         return 0;
         default:
          error()
      }

  }

}
