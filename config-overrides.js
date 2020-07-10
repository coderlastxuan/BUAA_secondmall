const {

    override,

    fixBabelImports,

    addLessLoader,

} = require("customize-cra");

module.exports = override(
    fixBabelImports("import", {

        libraryName: "antd-mobile", style: 'css' // change importing css to less

    }),

    addLessLoader({

        javascriptEnabled: true,//支持css文件中写入js

        modifyVars: {"@primary-color": "#1DA57A"}

    })
);
