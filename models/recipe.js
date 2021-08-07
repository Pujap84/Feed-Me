const db = require("../db/db");

const Recipe = {
  create(user_id, name, spoonacular_id, notes, rating, image) {
    params = [user_id, name, spoonacular_id, notes, rating, image];
    const sql = `
        INSERT INTO recipes(user_id, name, spoonacular_id, notes, rating, image)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *
    `;

    return db.query(sql, params).then((dbResult) => {
      return dbResult.rows[0];
    });
  },
  getAllByUserId(userId) {
    const sql = `
        SELECT * FROM recipes WHERE user_id = $1
    `;
    return db
      .query(sql, [userId])
      .then((dbRes) => {
        return dbRes.rows;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  update(recipeId, userId, name, spoonacular_id, notes, rating, image) {
    params = [recipeId, userId, name, spoonacular_id, notes, rating, image];
    const sql = `
      UPDATE recipes 
      SET user_id = $2, name = $3, spoonacular_id = $4, notes = $5, rating = $6, image = $7
      WHERE id = $1
      RETURNING *;
    `;
    return db
      .query(sql, params)
      .then((dbRes) => {
        return dbRes.rows[0];
      })
      .catch((err) => {
        console.log(err);
      });
  },
  delete(recipeId) {
    const sql = `
      DELETE FROM recipes where id = $1;
    `;
    return db
      .query(sql, [recipeId])
      .then((dbRes) => {
        return dbRes.rows[0];
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

module.exports = Recipe;
