
module.exports = (error, req, res, next) => {

  //console.log(error, '*******************')

  if (error.includes('duplicate key'))
    res.status(409).send('ERROR: duplicate key!')
  
  next(error)
}