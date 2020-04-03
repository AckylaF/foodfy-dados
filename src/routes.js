const express = require('express')
const routes = express.Router()
const recipes = require('./app/controler/recipes')
const chefs = require('./app/controler/chefs')

routes.get("/", function(req, res){
    return res.render("user/home")
})

routes.get("/about", function(req, res){
    return res.render("user/about")
})
routes.get("/admin/recipes", recipes.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita

routes.post("/admin/recipes", recipes.post) // Cadastrar nova receitas
routes.put("/admin/recipes", recipes.put); // Editar uma receita
routes.delete("/admin/recipes", recipes.delete); //Deletar uma receita


routes.get("/admin/chefs", chefs.index); // Mostrar a lista de chefs
routes.get("/admin/chefs/create", chefs.create); // Mostrar formulário de novo chef
routes.get("/admin/chefs/:id", chefs.show); // Exibir detalhes de um chef
routes.get("/admin/chefs/:id/edit", chefs.edit); // Mostrar formulário de edição de receita

routes.post("/admin/chefs", chefs.post) // Cadastrar novo chef
routes.put("/admin/chefs", chefs.put); // Editar uma receita
routes.delete("/admin/chefs", chefs.delete); //Deletar uma receita

module.exports = routes