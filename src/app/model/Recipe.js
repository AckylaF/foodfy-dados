const { date } = require('../../lib/useful')
const db = require("../../config/db")

module.exports = {
    all(callback){

        db.query(`
            SELECT * 
            FROM recipes`, (err, results) => {
                if(err) throw `Database error! ${err}`

                callback(results.rows)
                
            }) 
    },
    create(data, callback){

        const query = `
            INSERT INTO recipes (
                img_source,
                food_name,
                chef,
                ingredients,
                preparation,
                information,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `
        const values = [
            data.img_source,
            data.food_name,
            data.chef,
            data.ingredients,
            data.preparation,
            data.information,
            date(Date.now()).iso
        ]

        db.query(query, values, (err, results) => {
            if(err) throw `Database error! ${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback){

        db.query(`
            SELECT * 
            FROM recipes 
            WHERE id = $1`, [id], (err, results) => {
                if(err) throw `Database Error! ${err}`

                callback(results.rows[0])
        })
    },
    update(data, callback){

        const query = `
            UPDATE recipes SET
                img_source=($1),
                food_name=($2),
                chef=($3),
                ingredients=($4),
                preparation=($5),
                information=($6)
            WHERE id = $7
        `

        const values = [
            data.img_source,
            data.food_name,
            data.chef,
            data.ingredients,
            data.preparation,
            data.information,
            data.id
        ]

        db.query(query, values, (err, results) => {
            if(err) throw `Database Error! ${err}`

            callback()
        })
    },
    delete(id, callback){

        db.query(`DELETE FROM recipes WHERE id = $1`, [id], (err, results) => {
            if(err) throw `Database Error! ${err}`

            callback()
        })
    }
}