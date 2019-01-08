var fs = require('fs');
var method = process.argv[2];
var name = process.argv[3];

if (method === "module") {
    fs.mkdirSync("src/modules/" + name + "/");
    var createModulePug = fs.createWriteStream("src/modules/" + name + "/" + name + ".pug");
    createModulePug.write("//- Description for the " + name + " module here\n");
    createModulePug.write("\n");
    createModulePug.write("mixin " + name + "()\n");
    createModulePug.write("    ." + name + "\n");
    createModulePug.end();
    var createModuleSass = fs.createWriteStream("src/modules/" + name + "/" + name + ".scss");
    createModuleSass.write("//- " + name + " module styles\n");
    createModuleSass.write("\n");
    createModuleSass.write("." + name + " {\n");
    createModuleSass.write("\n");
    createModuleSass.write("}");
    createModuleSass.end();
    var appendModulePug = fs.createWriteStream("src/modules/mixins.pug", {'flags': 'a'});
    appendModulePug.write("include " + "./" + name + "/" + name + ".pug\n");
    appendModulePug.end();
    console.log("New module '" + name + "' created!")
}

if (method === "page") {
    var createPagePug = fs.createWriteStream("src/pages/" + name + ".pug");
    createPagePug.write("extends ./../layouts/layout.pug\n");
    createPagePug.write("\n");
    createPagePug.write("include ./../modules/mixins.pug\n");
    createPagePug.write("\n");
    createPagePug.write("block append head\n");
    createPagePug.write("    // Append any <head></head> content here\n");
    createPagePug.write("block content\n");
    createPagePug.write("    // Main page content goes here\n");
    createPagePug.write("    ." + name + "\n");
    createPagePug.write("        +header\n");
    createPagePug.write("        +footer\n");
    createPagePug.write("block append scripts\n");
    createPagePug.write("    // Any extra JavaScript goes here\n");
    createPagePug.end();
    var createPageSass = fs.createWriteStream("src/scss/pages/_" + name + ".scss");
    createPageSass.write("// " + name + " page styles\n");
    createPageSass.write("\n");
    createPageSass.write("." + name + " {\n");
    createPageSass.write("\n");
    createPageSass.write("}");
    createPageSass.end();
    var appendModulePug = fs.createWriteStream("src/scss/style.scss", {'flags': 'a'});
    appendModulePug.write("@import './pages/_"+ name + ".scss';\n");
    appendModulePug.end();
    console.log("New page '" + name + "' created!")
}