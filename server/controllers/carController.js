module.exports = {
  getAllCars: async (req, res) => {
    const db = req.app.get('db')

    try {
      const cars = await db.get_all_cars()
      res.status(200).send(cars)
    } catch (err) {
      console.log(err)
      res.status(500).send('Could not retrieve cars')
    }
  },
  getCarById: async (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params

    const car = (await db.get_car_by_id([id]))[0]

    if(car){
      res.status(200).send(car)
    } else {
      res.status(404).send('car not found')
    }
  },
  addCar: async (req, res) => {
    const db = req.app.get('db')
    const {make, model, year, miles, color} = req.body
    const newCar = await db.create_car({make, model, year, miles, color})

    res.status(200).send(newCar[0])
  },
  deleteCar: async (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params

    try {
      await db.delete_car_by_id([id])
      res.status(200).send('Car deleted')
    } catch(err) {
      console.log(err)
      res.status(500).send('Could not delete car')
    }
  },
}
