const Chef = require('../model/Chef')


module.exports = {
    index(req, res) {

        Chef.all((chefs) => {
            return res.render("admin/chefs/chefs", { chefs })
        })
    },
    show(req, res) {

        Chef.find(req.params.id, (chef) => {
            return res.render("admin/chefs/chefDetail", { chef })
        })
    },
    create(req, res) {

        return res.render("admin/chefs/create")
    },
    post(req, res) {

        const keys = Object.keys(req.body)

        for(key of keys){
            if (req.body[key] == ""){
                return res.send('Please, fill all fields')
            }
        }

        Chef.create(req.body, () => {

            return res.redirect("/admin/chefs")
        })
    },
    edit(req, res) {
        
        Chef.find(req.params.id, (chef) => {
            if(!chef) res.send("Chef not found")

            return res.render("admin/chefs/edit", { chef })
        })
    },
    put(req, res) {

        const keys = Object.keys(req.body)

        for(key of keys){
            if (req.body[key] == ""){
                return res.send('Please, fill all fields')
            }
        }

        Chef.update(req.body, () => {
            return res.redirect(`/admin/chefs/${req.body.id}`)
        })

    },
    delete(req, res) {

        Chef.delete(req.body.id, () => {
            return res.redirect("/admin/chefs")
        }) 

    }
}