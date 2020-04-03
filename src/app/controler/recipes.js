const Recipe = require('../model/Recipe')


module.exports = {
    index(req, res) {
        Recipe.all((recipes)=>{

            return res.render("admin/recipes/recipes", { recipes })
        })

    },
    show(req, res) {

        Recipe.find(req.params.id, (recipe) => {
            if(!recipe) res.send("Recipe not found")

            return res.render("admin/recipes/show", {recipe})
        })

    },
    create(req, res) {

        return res.render("admin/recipes/create")

    },
    post(req, res) {

        const keys = Object.keys(req.body)

        for(key of keys){
            if (req.body[key] == ""){
                return res.send('Please, fill all fields')
            }
        }
        
        Recipe.create(req.body, () => {
            return res.redirect("/admin/recipes/recipes")
        })

    },
    edit(req, res) {

        Recipe.find(req.params.id, (recipe) => {
            if(!recipe) res.send("Recipe not found")

            return res.render("admin/recipes/edit", { recipe })
        })
    
    },
    put(req, res) {

        const keys = Object.keys(req.body)

        for(key of keys){
            if (req.body[key] == ""){
                return res.send('Please, fill all fields')
            }
        }

        Recipe.update(req.body, () => {
            return res.redirect(`/admin/recipes/${req.body.id}`)
        })

        
    },
    delete(req, res) {

      Recipe.delete(req.body.id, () => {
          return res.redirect("/admin/recipes")
      }) 
    }
}

