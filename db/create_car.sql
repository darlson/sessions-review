INSERT INTO cars
(make, model, miles, year, color)
VALUES
(${make}, ${model}, ${miles}, ${year}, ${color})
returning *;